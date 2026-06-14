import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useProgress } from '../hooks/useProgress';
import { QuestionCard } from '../components/QuestionCard';
import { QUESTIONS } from '../data/questions';
import { getSubjectsForExam } from '../data/examSubjects';
import type { Question } from '../types';

interface MockExamConfig {
  examTitle: string;
  examSubtitle: string;
  durationSec: number;
  questionsPerSubject: number;
  /** 模試開始に必要な科目あたりの最低問題数（これ未満なら canStart=false） */
  minQuestionsPerSubject: number;
  subjectKeys: string[];
  subjectLabels: Record<string, string>;
  /** 科目ごとの60%足切り合否バッジを表示するか（乙4のみtrue） */
  showSubjectPassFail: boolean;
}

const MOCK_EXAM_CONFIGS: Record<string, MockExamConfig> = {
  cma: {
    examTitle: '模擬試験',
    examSubtitle: 'CMA 1次 総合模試',
    durationSec: 90 * 60, // 90分
    questionsPerSubject: 20, // 各科目20問 = 計60問
    minQuestionsPerSubject: 20,
    subjectKeys: getSubjectsForExam('cma').map(s => s.key),
    subjectLabels: Object.fromEntries(getSubjectsForExam('cma').map(s => [s.key, s.label])),
    showSubjectPassFail: false,
  },
  kikenbutsu4: {
    examTitle: '模擬試験',
    examSubtitle: '危険物乙4 ミニ模試',
    durationSec: 60 * 60, // 60分
    questionsPerSubject: 10, // 各科目最大10問・出題可能な範囲で抽出（計最大30問）
    minQuestionsPerSubject: 1,
    subjectKeys: getSubjectsForExam('kikenbutsu4').map(s => s.key),
    subjectLabels: Object.fromEntries(getSubjectsForExam('kikenbutsu4').map(s => [s.key, s.label])),
    showSubjectPassFail: true,
  },
  g_kentei: {
    examTitle: '模擬試験',
    examSubtitle: 'G検定 ミニ模試',
    // G検定は「1問36秒」が特性。各科目5問×5科目=計25問を想定し、
    // 36秒×25問=約15分の解答時間に解説確認等の余裕を持たせて30分とする。
    durationSec: 30 * 60, // 30分
    questionsPerSubject: 5, // 各科目最大5問・計最大25問
    minQuestionsPerSubject: 1,
    subjectKeys: getSubjectsForExam('g_kentei').map(s => s.key),
    subjectLabels: Object.fromEntries(getSubjectsForExam('g_kentei').map(s => [s.key, s.label])),
    showSubjectPassFail: false,
  },
  kikenbutsu_ko: {
    examTitle: '模擬試験',
    examSubtitle: '危険物甲種 ミニ模試',
    durationSec: 60 * 60, // 60分
    questionsPerSubject: 10, // 各科目最大10問・出題可能な範囲で抽出（計最大30問）
    minQuestionsPerSubject: 1,
    subjectKeys: getSubjectsForExam('kikenbutsu_ko').map(s => s.key),
    subjectLabels: Object.fromEntries(getSubjectsForExam('kikenbutsu_ko').map(s => [s.key, s.label])),
    // 甲種も乙4と同様、科目ごとに60%以上が合格基準（足切りあり）のため合否バッジを表示
    showSubjectPassFail: true,
  },
};

function getMockExamConfig(examId?: string): MockExamConfig {
  if (examId && MOCK_EXAM_CONFIGS[examId]) return MOCK_EXAM_CONFIGS[examId];
  return MOCK_EXAM_CONFIGS.cma;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildExam(config: MockExamConfig): Question[] {
  const selected: Question[] = [];
  for (const subject of config.subjectKeys) {
    const pool = QUESTIONS.filter(q => q.subject === subject);
    const picked = shuffle(pool).slice(0, config.questionsPerSubject);
    selected.push(...picked);
  }
  return shuffle(selected);
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

type ExamPhase = 'intro' | 'exam' | 'result';

interface SubjectResult {
  label: string;
  correct: number;
  total: number;
}

export default function MockExamScreen() {
  const router = useRouter();
  const { examId: examIdParam } = useLocalSearchParams<{ examId?: string }>();
  const { recordAnswer } = useProgress();

  const config = getMockExamConfig(examIdParam);

  const [phase, setPhase] = useState<ExamPhase>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  const [answered, setAnswered] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(config.durationSec);
  const [subjectResults, setSubjectResults] = useState<SubjectResult[]>([]);
  const [correctLabel, setCorrectLabel] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finishExam = useCallback((qs: Question[], ans: Record<string, 'A' | 'B' | 'C' | 'D'>) => {
    if (timerRef.current) clearInterval(timerRef.current);
    const results = config.subjectKeys.map(subject => ({
      label: config.subjectLabels[subject] ?? subject,
      correct: qs.filter(q => q.subject === subject && ans[q.id] === q.correctAnswer).length,
      total: qs.filter(q => q.subject === subject).length,
    }));
    setSubjectResults(results);
    setPhase('result');
  }, [config]);

  useEffect(() => {
    if (phase !== 'exam') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setAnswers(current => {
            finishExam(questions, current);
            return current;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, questions, finishExam]);

  function startExam() {
    const qs = buildExam(config);
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers({});
    setAnswered(false);
    setSelectedKey(null);
    setTimeLeft(config.durationSec);
    setPhase('exam');
  }

  async function handleAnswer(key: 'A' | 'B' | 'C' | 'D') {
    const current = questions[currentIndex];
    setAnswered(true);
    setSelectedKey(key);
    const newAnswers = { ...answers, [current.id]: key };
    setAnswers(newAnswers);
    await recordAnswer({
      questionId: current.id,
      selectedAnswer: key,
      isCorrect: key === current.correctAnswer,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds: 0,
    });
  }

  function nextQuestion() {
    if (currentIndex + 1 >= questions.length) {
      finishExam(questions, { ...answers });
    } else {
      setCurrentIndex(i => i + 1);
      setAnswered(false);
      setSelectedKey(null);
    }
  }

  function handleQuit() {
    Alert.alert('試験を終了しますか？', '途中終了すると結果が記録されます。', [
      { text: 'キャンセル', style: 'cancel' },
      { text: '終了する', style: 'destructive', onPress: () => finishExam(questions, answers) },
    ]);
  }

  // ── イントロ画面 ──────────────────────────────────────
  if (phase === 'intro') {
    const available = config.subjectKeys.map(s => ({
      key: s,
      label: config.subjectLabels[s] ?? s,
      count: QUESTIONS.filter(q => q.subject === s).length,
    }));
    const canStart = available.every(s => s.count >= config.minQuestionsPerSubject);
    const totalQuestions = available.reduce((sum, s) => sum + Math.min(s.count, config.questionsPerSubject), 0);
    const durationLabel = `${Math.round(config.durationSec / 60)}分`;

    return (
      <ScrollView style={styles.bg} contentContainerStyle={styles.introContainer}>
        <Text style={styles.introTitle}>{config.examTitle}</Text>
        <Text style={styles.introSub}>{config.examSubtitle}</Text>

        <View style={styles.infoCard}>
          <Row label="問題数" value={`最大${totalQuestions}問（各科目最大${config.questionsPerSubject}問）`} />
          <Row label="制限時間" value={durationLabel} />
          <Row label="出題形式" value="4択 択一式" />
          <Row label="解答表示" value="1問ごとに確認可" />
          {config.showSubjectPassFail && (
            <Row label="合格基準" value="科目ごとに正答率60%以上（1科目でも未満なら不合格）" />
          )}
        </View>

        <Text style={styles.subjectTitle}>出題科目</Text>
        {available.map(s => (
          <View key={s.key} style={styles.subjectRow}>
            <Text style={styles.subjectName}>{s.label}</Text>
            <Text style={[styles.subjectStat, s.count < config.minQuestionsPerSubject && styles.insufficient]}>
              {s.count < config.minQuestionsPerSubject
                ? `問題不足（${s.count}問）`
                : s.count < config.questionsPerSubject
                  ? `${s.count}問中${s.count}問出題（出題可能な範囲で抽出）`
                  : `${s.count}問中${config.questionsPerSubject}問出題`}
            </Text>
          </View>
        ))}

        {!canStart && (
          <Text style={styles.warningText}>
            問題数が不足している科目があります。演習モードで各科目の問題を先に確認してください。
          </Text>
        )}

        <TouchableOpacity
          style={[styles.startBtn, !canStart && styles.startBtnDisabled]}
          onPress={startExam}
          disabled={!canStart}
        >
          <Text style={styles.startBtnText}>試験開始</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>戻る</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ── 試験画面 ──────────────────────────────────────────
  if (phase === 'exam') {
    const current = questions[currentIndex];
    const total = questions.length;
    const isLast = currentIndex + 1 >= total;
    const isCorrect = answered && selectedKey === current.correctAnswer;
    const timeWarning = timeLeft < 600; // 10分切ったら警告色

    return (
      <ScrollView style={styles.examBg} contentContainerStyle={styles.examContent}>
        {/* ヘッダー */}
        <View style={styles.examHeader}>
          <View>
            <Text style={styles.examProgress}>{currentIndex + 1} / {total}</Text>
            <Text style={styles.examSubject}>{config.subjectLabels[current.subject] ?? current.subject}</Text>
          </View>
          <View style={styles.timerBox}>
            <Text style={[styles.timer, timeWarning && styles.timerWarning]}>
              {formatTime(timeLeft)}
            </Text>
            <TouchableOpacity onPress={handleQuit}>
              <Text style={styles.quitText}>終了</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 進捗バー */}
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentIndex / total) * 100}%` as any }]} />
        </View>

        {/* 問題カード */}
        <QuestionCard
          key={current.id}
          question={current}
          onAnswer={handleAnswer}
          onCorrectLabelChange={setCorrectLabel}
          disabled={answered}
        />

        {/* 解答後バナー */}
        {answered && (
          <>
            <View style={[styles.resultBanner, isCorrect ? styles.correct : styles.wrong]}>
              <Text style={styles.resultBannerText}>
                {isCorrect ? '正解！' : `不正解　正解：${correctLabel}`}
              </Text>
            </View>

            <View style={styles.explanationBox}>
              <Text style={styles.explanationLabel}>解説</Text>
              <Text style={styles.explanationText}>{current.explanation}</Text>
            </View>

            <TouchableOpacity style={styles.nextBtn} onPress={nextQuestion}>
              <Text style={styles.nextBtnText}>
                {isLast ? '採点する' : '次の問題 →'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    );
  }

  // ── 結果画面 ──────────────────────────────────────────
  if (phase === 'result') {
    const totalCorrect = subjectResults.reduce((s, r) => s + r.correct, 0);
    const totalQ = subjectResults.reduce((s, r) => s + r.total, 0);
    const totalRate = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
    // 乙4は科目別60%足切りあり: 1科目でも60%未満（未受験科目=0%扱い）なら不合格。
    // CMA等は総合スコアのみで判定（既存挙動を変更しない）。
    const subjectAllPass = subjectResults.every(r => r.total > 0 && Math.round((r.correct / r.total) * 100) >= 60);
    const passed = config.showSubjectPassFail
      ? (totalRate >= 60 && subjectAllPass)
      : totalRate >= 60;

    return (
      <ScrollView style={styles.bg} contentContainerStyle={styles.resultContainer}>
        <Text style={styles.resultTitle}>模擬試験　結果</Text>

        <View style={styles.totalScoreBox}>
          <Text style={styles.totalScore}>{totalCorrect} / {totalQ}</Text>
          <Text style={styles.totalRate}>{totalRate}%</Text>
          <Text style={[styles.passLabel, passed ? styles.pass : styles.fail]}>
            {passed ? '合格圏' : '要復習'}
          </Text>
          {config.showSubjectPassFail && (
            <Text style={styles.passFailNote}>
              ※乙4は科目ごとに正答率60%以上が合格基準です（1科目でも未満なら不合格）
            </Text>
          )}
        </View>

        <Text style={styles.breakdownTitle}>科目別スコア</Text>
        {subjectResults.map(r => {
          const rate = r.total > 0 ? Math.round((r.correct / r.total) * 100) : 0;
          const subjectPassed = r.total > 0 && rate >= 60;
          return (
            <View key={r.label} style={styles.subjectResultRow}>
              <View style={styles.subjectResultLeft}>
                <Text style={styles.subjectResultLabel}>{r.label}</Text>
                <Text style={styles.subjectResultScore}>{r.correct} / {r.total}問正解</Text>
                {config.showSubjectPassFail && (
                  <View style={[styles.subjectPassBadge, subjectPassed ? styles.subjectPassBadgeOk : styles.subjectPassBadgeNg]}>
                    <Text style={[styles.subjectPassBadgeText, subjectPassed ? styles.subjectPassBadgeTextOk : styles.subjectPassBadgeTextNg]}>
                      {r.total === 0 ? '出題なし' : subjectPassed ? '合格' : '不合格'}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.subjectRateBox}>
                <Text style={[styles.subjectRate, rate >= 60 ? styles.rateGood : styles.rateBad]}>
                  {rate}%
                </Text>
                <View style={styles.miniBar}>
                  <View style={[styles.miniBarFill, { width: `${rate}%` as any, backgroundColor: rate >= 60 ? '#28A745' : '#E94560' }]} />
                </View>
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={styles.startBtn} onPress={startExam}>
          <Text style={styles.startBtnText}>もう一度受験する</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>ホームへ戻る</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return <ActivityIndicator style={{ flex: 1 }} color="#E94560" />;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#1A1A2E' },
  examBg: { flex: 1, backgroundColor: '#FFF' },

  introContainer: { alignItems: 'center', padding: 28, paddingBottom: 48 },
  introTitle: { fontSize: 32, fontWeight: '900', color: '#FFF', marginTop: 24, marginBottom: 4 },
  introSub: { fontSize: 14, color: '#AAA', marginBottom: 32 },

  infoCard: {
    width: '100%', backgroundColor: '#16213E', borderRadius: 12,
    padding: 16, marginBottom: 24, borderWidth: 1, borderColor: '#2A2A4A',
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#2A2A4A' },
  infoLabel: { color: '#AAA', fontSize: 13 },
  infoValue: { color: '#FFF', fontSize: 13, fontWeight: '600' },

  subjectTitle: { fontSize: 12, color: '#888', alignSelf: 'flex-start', marginBottom: 10, letterSpacing: 1 },
  subjectRow: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
    backgroundColor: '#16213E', borderRadius: 8, padding: 14, marginBottom: 8,
    borderWidth: 1, borderColor: '#2A2A4A',
  },
  subjectName: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  subjectStat: { color: '#AAA', fontSize: 12 },
  insufficient: { color: '#E94560' },

  warningText: { color: '#E94560', fontSize: 12, textAlign: 'center', marginTop: 8, marginBottom: 8 },

  startBtn: {
    backgroundColor: '#E94560', width: '100%', padding: 18,
    borderRadius: 50, alignItems: 'center', marginTop: 24,
  },
  startBtnDisabled: { backgroundColor: '#555' },
  startBtnText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  backBtn: { marginTop: 12, padding: 14, alignItems: 'center' },
  backBtnText: { color: '#AAA', fontSize: 14 },

  // 試験中
  examContent: { paddingBottom: 40 },
  examHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, backgroundColor: '#FFF',
  },
  examProgress: { fontSize: 14, color: '#666', fontWeight: '600' },
  examSubject: { fontSize: 11, color: '#E94560', marginTop: 2 },
  timerBox: { alignItems: 'flex-end' },
  timer: { fontSize: 22, fontWeight: '800', color: '#1A1A2E' },
  timerWarning: { color: '#E94560' },
  quitText: { fontSize: 11, color: '#AAA', marginTop: 4 },

  progressBar: { height: 3, backgroundColor: '#EEE', marginHorizontal: 0 },
  progressFill: { height: 3, backgroundColor: '#E94560' },

  resultBanner: { marginHorizontal: 16, marginTop: 8, padding: 14, borderRadius: 8, alignItems: 'center' },
  correct: { backgroundColor: '#D4EDDA' },
  wrong: { backgroundColor: '#F8D7DA' },
  resultBannerText: { fontSize: 16, fontWeight: '700', color: '#1E293B' },

  explanationBox: {
    marginHorizontal: 16, marginTop: 8, padding: 14,
    backgroundColor: '#F8F9FA', borderRadius: 8, borderLeftWidth: 3, borderLeftColor: '#E94560',
  },
  explanationLabel: { fontSize: 11, color: '#E94560', fontWeight: '700', marginBottom: 6, letterSpacing: 1 },
  explanationText: { fontSize: 14, color: '#333', lineHeight: 22 },

  nextBtn: {
    backgroundColor: '#E94560', marginHorizontal: 16, marginTop: 12,
    padding: 14, borderRadius: 8, alignItems: 'center',
  },
  nextBtnText: { color: '#FFF', fontWeight: '700', fontSize: 16 },

  // 結果
  resultContainer: { alignItems: 'center', padding: 28, paddingBottom: 48 },
  resultTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', marginTop: 24, marginBottom: 24 },

  totalScoreBox: {
    width: '100%', backgroundColor: '#16213E', borderRadius: 16,
    padding: 28, alignItems: 'center', marginBottom: 32, borderWidth: 1, borderColor: '#2A2A4A',
  },
  totalScore: { fontSize: 48, fontWeight: '900', color: '#E94560' },
  totalRate: { fontSize: 20, color: '#AAA', marginTop: 4 },
  passLabel: { fontSize: 16, fontWeight: '700', marginTop: 12, paddingHorizontal: 20, paddingVertical: 6, borderRadius: 20 },
  pass: { backgroundColor: 'rgba(40,167,69,0.2)', color: '#28A745' },
  fail: { backgroundColor: 'rgba(233,69,96,0.15)', color: '#E94560' },
  passFailNote: { fontSize: 11, color: '#AAA', marginTop: 12, textAlign: 'center', lineHeight: 16 },

  breakdownTitle: { fontSize: 12, color: '#888', alignSelf: 'flex-start', marginBottom: 12, letterSpacing: 1 },
  subjectResultRow: {
    width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#16213E', borderRadius: 10, padding: 16, marginBottom: 10,
    borderWidth: 1, borderColor: '#2A2A4A',
  },
  subjectResultLeft: { flex: 1 },
  subjectResultLabel: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  subjectResultScore: { color: '#AAA', fontSize: 12, marginTop: 4 },
  subjectRateBox: { alignItems: 'flex-end', minWidth: 60 },
  subjectRate: { fontSize: 20, fontWeight: '800' },
  rateGood: { color: '#28A745' },
  rateBad: { color: '#E94560' },
  miniBar: { height: 4, width: 60, backgroundColor: '#2A2A4A', borderRadius: 2, marginTop: 4 },
  miniBarFill: { height: 4, borderRadius: 2 },

  // 科目別合否バッジ（乙4のみ表示）
  subjectPassBadge: {
    alignSelf: 'flex-start', marginTop: 6, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6,
  },
  subjectPassBadgeOk: { backgroundColor: 'rgba(40,167,69,0.2)' },
  subjectPassBadgeNg: { backgroundColor: 'rgba(233,69,96,0.2)' },
  subjectPassBadgeText: { fontSize: 11, fontWeight: '700' },
  subjectPassBadgeTextOk: { color: '#28A745' },
  subjectPassBadgeTextNg: { color: '#E94560' },
});
