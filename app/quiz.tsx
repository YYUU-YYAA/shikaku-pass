import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuestions } from '../hooks/useQuestions';
import { useProgress } from '../hooks/useProgress';
import { useSavedQuestions } from '../hooks/useSavedQuestions';
import { QuestionCard } from '../components/QuestionCard';
import { AIExplanation } from '../components/AIExplanation';
import { QUESTIONS } from '../data/questions';
import { getSubjectMeta, getExamIdForSubject } from '../data/examSubjects';
import type { Question, SaveType } from '../types';

const QUIZ_SIZE   = 10;
const REVIEW_MAX  = 20;
const SAVED_MAX   = 30;
const STATUS_MAX  = 30;

const STATUS_LABELS: Record<string, string> = {
  unanswered: '未解答',
  correct: '正解済み',
  incorrect: '不正解',
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizScreen() {
  const { mode, subject, category, status, examId, questionId } = useLocalSearchParams<{ mode?: string; subject?: string; category?: string; status?: string; examId?: string; questionId?: string }>();
  const router = useRouter();

  const isReviewMode = mode === 'review';
  const isMemoMode   = mode === 'memo';
  const isRetryMode  = mode === 'retry';
  const isSavedMode  = isMemoMode || isRetryMode;
  const isStatusMode = status === 'unanswered' || status === 'correct' || status === 'incorrect';
  const isSingleMode = mode === 'single' && !!questionId;
  const examIdFilter = (examId && examId !== '') ? examId : undefined;

  const subjectFilter  = (subject && subject !== 'all') ? subject : undefined;
  const categoryFilter = (category && category !== '') ? category : undefined;

  const { getLeastRecentQuestions } = useQuestions({ subject: subjectFilter ?? 'all', category: categoryFilter });
  const { stats, recordAnswer, loaded }  = useProgress();
  const { saved, saveQuestion, removeQuestion, isSaved } = useSavedQuestions();

  // ── Question list initialization ─────────────────────���──────────────────────
  // 「一通り出題してから2周目・3周目に進む」ため、最後に解答した日時が古い
  // （未解答含む）問題を優先して出題する。
  function buildNormalQuestions() {
    return getLeastRecentQuestions(QUIZ_SIZE, stats.lastAnsweredAtByQuestionId);
  }

  function buildSingleQuestion() {
    return QUESTIONS.filter(q => q.id === questionId);
  }

  function buildStatusQuestions() {
    const correctSet   = new Set(stats.correctQuestionIds);
    const incorrectSet = new Set(stats.weakQuestionIds);
    let pool = QUESTIONS.filter(q => !subjectFilter || q.subject === subjectFilter);
    if (status === 'correct')        pool = pool.filter(q => correctSet.has(q.id));
    else if (status === 'incorrect') pool = pool.filter(q => incorrectSet.has(q.id));
    else                              pool = pool.filter(q => !correctSet.has(q.id) && !incorrectSet.has(q.id));
    return shuffle(pool).slice(0, STATUS_MAX);
  }

  const [questions, setQuestions] = useState<Question[] | null>(
    isSingleMode ? buildSingleQuestion() : null,
  );
  const [initialized, setInitialized] = useState(isSingleMode);

  useEffect(() => {
    if (initialized) return;

    if (isReviewMode) {
      if (stats.totalAnswered === 0 && stats.weakQuestionIds.length === 0) return;
      const weak = QUESTIONS.filter(q => stats.weakQuestionIds.includes(q.id));
      setQuestions(shuffle(weak).slice(0, REVIEW_MAX));
      setInitialized(true);
      return;
    }

    if (isStatusMode) {
      if (!loaded) return;
      setQuestions(buildStatusQuestions());
      setInitialized(true);
      return;
    }

    if (isSavedMode) {
      const saveType: SaveType = isMemoMode ? 'memo' : 'retry';
      const ids = saved.filter(s => s.type === saveType).map(s => s.questionId);
      if (ids.length === 0) {
        setQuestions([]);
        setInitialized(true);
        return;
      }
      let qs = QUESTIONS.filter(q => ids.includes(q.id));
      if (examIdFilter) {
        qs = qs.filter(q => getExamIdForSubject(q.subject) === examIdFilter);
      }
      setQuestions(shuffle(qs).slice(0, SAVED_MAX));
      setInitialized(true);
      return;
    }

    // 通常モード: DBから読込んだ解答履歴を使って出題順を決めるため、loaded待ち
    if (!loaded) return;
    setQuestions(buildNormalQuestions());
    setInitialized(true);
  }, [isReviewMode, isSavedMode, isStatusMode, isMemoMode, initialized, examIdFilter,
      stats.weakQuestionIds, stats.correctQuestionIds, stats.totalAnswered,
      stats.lastAnsweredAtByQuestionId, loaded, saved]);

  // ── Quiz state ──────────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex]       = useState(0);
  const [answered, setAnswered]               = useState(false);
  const [isCorrect, setIsCorrect]             = useState(false);
  const [selectedKey, setSelectedKey]         = useState<string | null>(null);
  const [correctCount, setCorrectCount]       = useState(0);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [finished, setFinished]               = useState(false);
  const [correctLabel, setCorrectLabel]       = useState<'A' | 'B' | 'C' | 'D'>('A');
  const startTime = useRef(Date.now());

  const subjectTitle = subjectFilter ? (getSubjectMeta(subjectFilter)?.label ?? subjectFilter) : '全科目';
  const modeLabel = isSingleMode ? '1問演習'
    : isReviewMode ? '苦手問題' : isMemoMode ? '📌 念のため保存' : isRetryMode ? '🔁 苦手リスト'
    : isStatusMode ? `${subjectTitle}・${STATUS_LABELS[status as string]}`
    : categoryFilter ? categoryFilter : subjectTitle;

  // ── 「戻る」「やめる」の遷移先（フィードバック#3/#7共通ロジック） ────────────────
  // 期待動作: 演習の科目選択画面（/subject/[key]）に戻る。科目未指定の場合は
  // 元の画面（保存リスト/進捗/ホーム）に戻る。
  // Round12論点H: 1問演習モード（/saved からの遷移）は常に/savedへ戻る。
  function goBack() {
    if (isSingleMode) {
      router.push('/saved');
    } else if (subjectFilter) {
      router.push({
        pathname: '/subject/[key]',
        params: { key: subjectFilter, ...(examId ? { examId } : {}) },
      });
    } else if (isSavedMode) {
      router.push('/saved');
    } else if (isReviewMode) {
      router.push('/progress');
    } else {
      router.push('/');
    }
  }

  // ── Loading / empty states ──────────────────────────────────────────────────
  if (!initialized || questions === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E94560" />
        <Text style={styles.loadingText}>読み込み中...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    const emptyTitle = isSingleMode ? '問題が見つかりませんでした'
      : isReviewMode ? '苦手問題はありません！'
      : isSavedMode ? '保存済み問題がありません'
      : isStatusMode ? (
          status === 'unanswered' ? 'すべて解答済みです！'
          : status === 'correct' ? '正解した問題がありません'
          : '不正解の問題はありません！'
        )
      : '問題がありません';
    const emptyText = isSingleMode ? '保存リストに戻ってください。'
      : isReviewMode ? 'すべての問題に正解しています。'
      : isSavedMode ? '問題を保存すると演習できます。'
      : isStatusMode ? (
          status === 'unanswered' ? 'この科目はすべて解答済みです。'
          : status === 'correct' ? 'まだ正解した問題がありません。'
          : '不正解の問題はありません。素晴らしい！'
        )
      : '別の科目を選択してください。';
    const emptyIcon = isReviewMode ? '🎉'
      : isStatusMode && status !== 'correct' ? '🎉'
      : '📭';
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>{emptyIcon}</Text>
        <Text style={styles.emptyTitle}>{emptyTitle}</Text>
        <Text style={styles.emptyText}>{emptyText}</Text>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>戻る</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const total   = questions.length;
  const current = questions[currentIndex];

  // ── Handlers ────────────────────────────────────────────────────────────────
  async function handleAnswer(key: 'A' | 'B' | 'C' | 'D') {
    const correct    = key === current.correctAnswer;
    const timeSpent  = Math.round((Date.now() - startTime.current) / 1000);
    setAnswered(true);
    setIsCorrect(correct);
    setSelectedKey(key);
    if (correct) { setCorrectCount(c => c + 1); setConsecutiveWrong(0); }
    else          { setConsecutiveWrong(c => c + 1); }
    await recordAnswer({
      questionId: current.id,
      selectedAnswer: key,
      isCorrect: correct,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds: timeSpent,
    });
    if (!correct) {
      await saveQuestion(current.id, 'retry');
    } else if (isSaved(current.id, 'retry')) {
      // 苦手リストに入っている問題に再度正解したら自動的にリストから外す（フィードバック#4）
      await removeQuestion(current.id, 'retry');
    }
  }

  function nextQuestion() {
    if (currentIndex + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setAnswered(false);
      setIsCorrect(false);
      setSelectedKey(null);
      startTime.current = Date.now();
    }
  }

  function resetQuiz() {
    setCurrentIndex(0); setAnswered(false); setIsCorrect(false);
    setSelectedKey(null); setFinished(false); setCorrectCount(0); setConsecutiveWrong(0);
    if (isSingleMode) {
      setQuestions(buildSingleQuestion());
    } else if (isReviewMode) {
      setQuestions(shuffle(QUESTIONS.filter(q => stats.weakQuestionIds.includes(q.id))).slice(0, REVIEW_MAX));
    } else if (isStatusMode) {
      setQuestions(buildStatusQuestions());
    } else if (isSavedMode) {
      const saveType: SaveType = isMemoMode ? 'memo' : 'retry';
      const ids = saved.filter(s => s.type === saveType).map(s => s.questionId);
      let qs = QUESTIONS.filter(q => ids.includes(q.id));
      if (examIdFilter) {
        qs = qs.filter(q => getExamIdForSubject(q.subject) === examIdFilter);
      }
      setQuestions(shuffle(qs).slice(0, SAVED_MAX));
    } else {
      setQuestions(buildNormalQuestions());
    }
  }

  async function toggleSave(type: SaveType) {
    if (isSaved(current.id, type)) {
      await removeQuestion(current.id, type);
    } else {
      await saveQuestion(current.id, type);
    }
  }

  // ── Finished screen ─────────────────────────────────────────────────────────
  if (finished) {
    const rate = Math.round((correctCount / total) * 100);
    return (
      <View style={styles.result}>
        <Text style={styles.resultSubject}>{modeLabel}</Text>
        <Text style={styles.resultTitle}>演習完了！</Text>
        <Text style={styles.resultScore}>{correctCount} / {total}</Text>
        <Text style={styles.resultRate}>正答率 {rate}%</Text>
        {rate === 100 && <Text style={styles.perfectText}>完璧です！</Text>}
        <TouchableOpacity style={styles.button} onPress={resetQuiz}>
          <Text style={styles.buttonText}>もう一度</Text>
        </TouchableOpacity>
        {!isReviewMode && !isSavedMode && !isSingleMode && stats.weakQuestionIds.length > 0 && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#E94560', marginTop: 12 }]}
            onPress={() => {
              setCurrentIndex(0); setAnswered(false); setIsCorrect(false);
              setSelectedKey(null); setFinished(false); setCorrectCount(0); setConsecutiveWrong(0);
              setQuestions(shuffle(QUESTIONS.filter(q => stats.weakQuestionIds.includes(q.id))).slice(0, REVIEW_MAX));
            }}
          >
            <Text style={styles.buttonText}>苦手問題を復習 ({stats.weakQuestionIds.length}問)</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={goBack}>
          <Text style={styles.buttonText}>戻る</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Quiz screen ─────────────────────────────────────────────────────────────
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Progress */}
      <View style={styles.progressRow}>
        <View style={styles.progressHeaderRow}>
          <View style={styles.progressHeaderText}>
            <Text style={styles.progressSubject}>{modeLabel}</Text>
            <Text style={styles.progressText}>{currentIndex + 1} / {total}</Text>
          </View>
          <TouchableOpacity style={styles.quitBtn} onPress={goBack}>
            <Text style={styles.quitBtnText}>✕ やめる</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(currentIndex / total) * 100}%` as any }]} />
        </View>
      </View>

      {/* ── 常時表示の操作バー ── */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={[styles.actionBtn, isSaved(current.id, 'memo') && styles.actionBtnMemoActive]}
          onPress={() => toggleSave('memo')}
        >
          <Text style={[styles.actionBtnText, isSaved(current.id, 'memo') && styles.actionBtnTextMemoActive]}>
            📌 {isSaved(current.id, 'memo') ? '保存済み' : '念のため保存'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, isSaved(current.id, 'retry') && styles.actionBtnRetryActive]}
          onPress={() => toggleSave('retry')}
        >
          <Text style={[styles.actionBtnText, isSaved(current.id, 'retry') && styles.actionBtnTextRetryActive]}>
            🔁 {isSaved(current.id, 'retry') ? '苦手リスト追加済み' : '苦手リストに保存'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, styles.actionBtnNext]} onPress={nextQuestion}>
          <Text style={[styles.actionBtnText, styles.actionBtnTextNext]}>
            {currentIndex + 1 >= total ? '結果へ' : '次の問題'} →
          </Text>
        </TouchableOpacity>
      </View>

      <QuestionCard
        key={current.id}
        question={current}
        onAnswer={handleAnswer}
        onCorrectLabelChange={setCorrectLabel}
        disabled={answered}
      />

      {answered && (
        <>
          {/* 正解/不正解バナー */}
          <View style={[styles.resultBanner, isCorrect ? styles.correctBanner : styles.wrongBanner]}>
            <Text style={styles.resultBannerText}>
              {isCorrect ? '正解！' : `不正解　正解：${correctLabel}`}
            </Text>
          </View>

          {consecutiveWrong >= 3 && !isCorrect && (
            <View style={styles.encourageBanner}>
              <Text style={styles.encourageText}>
                難しい問題が続いています。解説をじっくり読んで次に活かしましょう！
              </Text>
            </View>
          )}

          <AIExplanation explanation={current.explanation} category={current.category} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content:   { paddingBottom: 40 },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  loadingText: { marginTop: 12, color: '#666', fontSize: 14 },
  emptyIcon:   { fontSize: 48, marginBottom: 16 },
  emptyTitle:  { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  emptyText:   { fontSize: 14, color: '#666', marginBottom: 32 },

  progressRow:    { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  progressHeaderRow:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  progressHeaderText: { flex: 1 },
  progressSubject: { fontSize: 11, color: '#E94560', fontWeight: '600', marginBottom: 2 },
  progressText:   { fontSize: 12, color: '#888', marginBottom: 6 },
  progressBar:    { height: 4, backgroundColor: '#EEE', borderRadius: 2 },
  progressFill:   { height: 4, backgroundColor: '#E94560', borderRadius: 2 },
  quitBtn:        { paddingHorizontal: 10, paddingVertical: 4, marginLeft: 8 },
  quitBtnText:    { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },

  resultBanner:    { marginHorizontal: 16, marginTop: 8, marginBottom: 4, padding: 14, borderRadius: 8, alignItems: 'center' },
  correctBanner:   { backgroundColor: '#D4EDDA' },
  wrongBanner:     { backgroundColor: '#F8D7DA' },
  resultBannerText: { fontSize: 16, fontWeight: '700', color: '#1E293B' },

  encourageBanner: { marginHorizontal: 16, marginTop: 4, marginBottom: 4, padding: 12, borderRadius: 8, backgroundColor: '#FFF3CD' },
  encourageText:   { fontSize: 13, color: '#856404', lineHeight: 20 },

  // 常時表示の操作バー
  actionBar: {
    flexDirection: 'row', gap: 6,
    marginHorizontal: 16, marginTop: 10, marginBottom: 4,
  },
  actionBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 48,
    paddingVertical: 8, paddingHorizontal: 4, borderRadius: 8,
    backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#DDD',
  },
  actionBtnText: { fontSize: 11, fontWeight: '600', color: '#666', textAlign: 'center' },
  actionBtnMemoActive: {
    backgroundColor: '#FFF3E0', borderColor: '#FF9800',
  },
  actionBtnTextMemoActive: { color: '#E65100' },
  actionBtnRetryActive: {
    backgroundColor: '#FFEBEE', borderColor: '#E94560',
  },
  actionBtnTextRetryActive: { color: '#C2185B' },
  actionBtnNext: { backgroundColor: '#E94560', borderColor: '#E94560' },
  actionBtnTextNext: { color: '#FFF', fontWeight: '700' },

  button:     { backgroundColor: '#1A1A2E', marginTop: 16, paddingVertical: 14, paddingHorizontal: 40, borderRadius: 8, alignItems: 'center', minWidth: 200 },
  homeButton: { backgroundColor: '#64748B' },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },

  result:        { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  resultSubject: { fontSize: 13, color: '#E94560', fontWeight: '600', marginBottom: 4 },
  resultTitle:   { fontSize: 22, fontWeight: '700', marginBottom: 16, color: '#1A1A2E' },
  resultScore:   { fontSize: 56, fontWeight: '900', color: '#E94560' },
  resultRate:    { fontSize: 18, color: '#666', marginBottom: 8 },
  perfectText:   { fontSize: 16, color: '#28A745', fontWeight: '600', marginBottom: 8 },
});
