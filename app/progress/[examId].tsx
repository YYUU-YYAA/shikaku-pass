import React, { useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, SafeAreaView, Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Link, useFocusEffect } from 'expo-router';
import { useProgress } from '../../hooks/useProgress';
import { SUBJECT_LABELS, SUBJECT_THEMES, SUBJECT_ICONS } from '../../types';
import type { SubjectKey } from '../../types';
import { getExamDefinition } from '../../data/roles';
import type { ExamId } from '../../data/roles';
import { getSubjectsForExam, getExamProgress } from '../../data/examSubjects';
import HeaderBackButton from '../../components/HeaderBackButton';

/**
 * /progress/[examId] — 資格別・科目別（分野別）進捗画面（Round8論点B）。
 * /progress トップレベルの資格カードから遷移してくる。
 * 科目ごとの表示形式は元app/progress.tsxのロジックをそのまま移植:
 *  - CMAの科目: 「未解答/正解/不正解」の3ボックス形式（タップで/quizへ）
 *  - その他の科目: 進捗バー＋統計テキスト形式（カード全体タップで/subject/[key]へ）
 */
export default function ExamProgressScreen() {
  const { examId } = useLocalSearchParams<{ examId: string }>();
  const { stats, reload } = useProgress();
  useFocusEffect(useCallback(() => { reload(); }, [reload]));
  const router = useRouter();

  const exam = getExamDefinition(examId as ExamId);
  const subjects = getSubjectsForExam(examId);

  if (!exam) {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.notFound}>
          <Text style={styles.notFoundTitle}>資格が見つかりませんでした</Text>
          <Link href="/progress" asChild>
            <TouchableOpacity style={styles.notFoundBtn}>
              <Text style={styles.notFoundBtnText}>進捗トップへ戻る</Text>
            </TouchableOpacity>
          </Link>
        </SafeAreaView>
      </View>
    );
  }

  const resolvedExamId = exam.id;
  const examProgress = getExamProgress(stats.bySubjectCategory, resolvedExamId);
  const headerAccent = subjects[0]?.theme.accent ?? '#7B2FF7';
  const headerIcon = subjects[0]?.icon ?? '📘';

  function goTo(subject: SubjectKey, status: 'unanswered' | 'correct' | 'incorrect') {
    router.push({ pathname: '/quiz', params: { subject, status } });
  }

  /** CMA以外の科目: /subject/[key] 汎用ルートへ遷移（カテゴリ別の演習導線はそちら側で提供） */
  function goToSubjectHub(subjectKey: string) {
    router.push({ pathname: '/subject/[key]', params: { key: subjectKey, examId: resolvedExamId } });
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* Colored header（資格テーマカラー＋全体進捗バー） */}
      <View style={[styles.header, { backgroundColor: headerAccent }]}>
        <SafeAreaView>
          <HeaderBackButton label="進捗トップへ" onPress={() => router.push('/progress')} />

          <View style={styles.headerBody}>
            <Text style={styles.headerIcon}>{headerIcon}</Text>
            <Text style={styles.headerTitle}>{exam.name}</Text>
            <Text style={styles.headerStat}>
              {examProgress.attempted > 0
                ? `${examProgress.attempted}/${examProgress.total}問達成  ·  正答率 ${Math.round((examProgress.correct / examProgress.attempted) * 100)}%`
                : `全${examProgress.total}問  ·  未着手`}
            </Text>
          </View>

          <View style={styles.headerBarTrack}>
            <View style={[styles.headerBarFill, { width: `${examProgress.pct}%` as any }]} />
          </View>
          <Text style={styles.headerPct}>{Math.round(examProgress.pct)}% 達成</Text>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Text style={styles.sectionHeader}>科目別の進捗</Text>

        {subjects.map((subject) => {
          const subjectKey = subject.key;
          const isCma = resolvedExamId === 'cma';
          const theme  = isCma ? SUBJECT_THEMES[subjectKey as SubjectKey] : subject.theme;
          const label  = isCma ? SUBJECT_LABELS[subjectKey as SubjectKey] : subject.label;
          const icon   = isCma ? SUBJECT_ICONS[subjectKey as SubjectKey] : subject.icon;
          const catMap = stats.bySubjectCategory[subjectKey] ?? {};
          const cats   = Object.values(catMap);
          const total     = cats.reduce((s, c) => s + c.total, 0);
          const attempted = cats.reduce((s, c) => s + c.attempted, 0);
          const correct   = cats.reduce((s, c) => s + c.correct, 0);
          const incorrect = attempted - correct;
          const unanswered = total - attempted;
          const prog = total > 0 ? (attempted / total) * 100 : 0;

          // CMAの科目: 「未解答/正解/不正解」の3ボタンで /quiz へ
          if (isCma) {
            return (
              <View key={subjectKey} style={styles.subjectCard}>
                <View style={[styles.subjectAccentBar, { backgroundColor: theme.accent }]} />
                <View style={styles.subjectBody}>
                  <Text style={styles.subjectName}>{icon} {label}</Text>
                  <View style={styles.statusRow}>
                    <TouchableOpacity
                      style={[styles.statusBox, unanswered === 0 && styles.statusBoxDisabled]}
                      onPress={() => goTo(subjectKey as SubjectKey, 'unanswered')}
                      disabled={unanswered === 0}
                    >
                      <Text style={styles.statusValue}>{unanswered}</Text>
                      <Text style={styles.statusLabel}>未解答</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.statusBox, correct === 0 && styles.statusBoxDisabled]}
                      onPress={() => goTo(subjectKey as SubjectKey, 'correct')}
                      disabled={correct === 0}
                    >
                      <Text style={[styles.statusValue, styles.statusCorrect]}>{correct}</Text>
                      <Text style={styles.statusLabel}>正解</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.statusBox, incorrect === 0 && styles.statusBoxDisabled]}
                      onPress={() => goTo(subjectKey as SubjectKey, 'incorrect')}
                      disabled={incorrect === 0}
                    >
                      <Text style={[styles.statusValue, styles.statusIncorrect]}>{incorrect}</Text>
                      <Text style={styles.statusLabel}>不正解</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }

          // CMA以外の科目: カード全体をタップで /subject/[key] 汎用ルートへ
          return (
            <TouchableOpacity
              key={subjectKey}
              style={styles.subjectCard}
              onPress={() => goToSubjectHub(subjectKey)}
              activeOpacity={0.85}
            >
              <View style={[styles.subjectAccentBar, { backgroundColor: theme.accent }]} />
              <View style={styles.subjectBody}>
                <Text style={styles.subjectName}>{icon} {label}</Text>
                <Text style={styles.subjectStat}>
                  {attempted > 0
                    ? `${attempted}/${total}問達成  ·  正答率 ${Math.round((correct / attempted) * 100)}%`
                    : `全${total}問  ·  未着手`}
                </Text>
                <View style={styles.subjectBarTrack}>
                  <View style={[styles.subjectBarFill, { width: `${prog}%` as any, backgroundColor: theme.accent }]} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2F5FA' },

  header: {
    paddingBottom: 20, paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0,
  },
  headerBody: { paddingBottom: 12 },
  headerIcon:    { fontSize: 32, marginBottom: 6 },
  headerTitle:   { fontSize: 22, fontWeight: '900', color: '#FFF', marginBottom: 4 },
  headerStat:    { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 2 },

  headerBarTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 3, marginBottom: 6 },
  headerBarFill:  { height: 6, backgroundColor: '#FFF', borderRadius: 3 },
  headerPct:      { fontSize: 11, color: 'rgba(255,255,255,0.75)', textAlign: 'right' },

  body:        { flex: 1 },
  bodyContent: { padding: 16 },

  sectionHeader: { fontSize: 13, color: '#888', fontWeight: '600', letterSpacing: 0.5, marginBottom: 8, marginTop: 4 },

  subjectCard: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, marginBottom: 10,
    overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  subjectAccentBar: { width: 5 },
  subjectBody: { flex: 1, padding: 14 },
  subjectName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 10 },

  subjectStat: { fontSize: 12, color: '#9CA3AF', marginBottom: 8 },
  subjectBarTrack: { height: 5, backgroundColor: '#F0F0F0', borderRadius: 3 },
  subjectBarFill:  { height: 5, borderRadius: 3 },

  statusRow: { flexDirection: 'row', gap: 8 },
  statusBox: {
    flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 8,
    backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#EEE',
  },
  statusBoxDisabled: { opacity: 0.4 },
  statusValue: { fontSize: 22, fontWeight: '800', color: '#1A1A2E' },
  statusLabel: { fontSize: 11, color: '#888', marginTop: 4, fontWeight: '600' },
  statusCorrect:   { color: '#28A745' },
  statusIncorrect: { color: '#E94560' },

  // Not found
  notFound:      { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  notFoundTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  notFoundBtn:   { backgroundColor: '#0B1437', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  notFoundBtnText: { color: '#FFF', fontWeight: '700' },
});
