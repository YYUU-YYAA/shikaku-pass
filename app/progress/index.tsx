import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import TopTabBar from '../../components/TopTabBar';
import { useProgress } from '../../hooks/useProgress';
import { useSavedQuestions } from '../../hooks/useSavedQuestions';
import { EXAMS } from '../../data/roles';
import { getSubjectsForExam, getExamProgress } from '../../data/examSubjects';

/**
 * /progress トップレベル（Round8論点B）。
 * 資格ごとに1枚の「資格全体の進捗」カードを表示する。タップで /progress/[examId] へ。
 * 科目別（分野別）の進捗は /progress/[examId] に分離した。
 * ストリーク表示・保存済み問題はここに残す（資格に依存しないグローバル情報）。
 */
export default function ProgressScreen() {
  const { stats, reload } = useProgress();
  useFocusEffect(useCallback(() => { reload(); }, [reload]));
  const { byType } = useSavedQuestions();
  const router = useRouter();
  const [debugOpen, setDebugOpen] = useState(false);

  const memoCount = byType('memo').length;
  const retryCount = byType('retry').length;

  const implementedExams = EXAMS.filter((exam) => exam.implemented);

  return (
    <View style={styles.container}>
      <TopTabBar />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>

      {/* Streak banner */}
      {stats.streak > 0 ? (
        <View style={styles.streakBanner}>
          <Text style={styles.streakIcon}>🔥</Text>
          <View>
            <Text style={styles.streakValue}>{stats.streak}日連続学習中</Text>
            <Text style={styles.streakSub}>最終学習: {stats.lastStudyDate}</Text>
          </View>
        </View>
      ) : stats.lastStudyDate ? (
        <View style={[styles.streakBanner, styles.streakBannerOff]}>
          <Text style={styles.streakIcon}>📅</Text>
          <View>
            <Text style={[styles.streakValue, { color: '#888' }]}>連続学習途切れ中</Text>
            <Text style={styles.streakSub}>最終学習: {stats.lastStudyDate}</Text>
          </View>
        </View>
      ) : null}

      {/* 資格別の進捗（資格カード一覧。タップで /progress/[examId] へ） */}
      <Text style={styles.sectionHeader}>資格別の進捗</Text>
      {implementedExams.map((exam) => {
        const subjects = getSubjectsForExam(exam.id);
        const icon = subjects[0]?.icon ?? '📘';
        const accent = subjects[0]?.theme.accent ?? '#7B2FF7';
        const progress = getExamProgress(stats.bySubjectCategory, exam.id);

        return (
          <TouchableOpacity
            key={exam.id}
            style={styles.examCard}
            onPress={() => router.push(`/progress/${exam.id}`)}
            activeOpacity={0.85}
          >
            <View style={[styles.examAccentBar, { backgroundColor: accent }]} />
            <View style={styles.examBody}>
              <Text style={styles.examName}>{icon} {exam.name}</Text>
              <Text style={styles.examStat}>
                {progress.attempted > 0
                  ? `${progress.attempted}/${progress.total}問・正答率 ${Math.round((progress.correct / progress.attempted) * 100)}%`
                  : `全${progress.total}問・未着手`}
              </Text>
              <View style={styles.examBarTrack}>
                <View style={[styles.examBarFill, { width: `${progress.pct}%` as any, backgroundColor: accent }]} />
              </View>
            </View>
            <Text style={styles.examArrow}>→</Text>
          </TouchableOpacity>
        );
      })}

      {/* Saved questions summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>保存済み問題</Text>
        <View style={styles.savedRow}>
          <TouchableOpacity
            style={styles.savedBtn}
            onPress={() => router.push('/saved')}
          >
            <Text style={styles.savedBtnIcon}>📌</Text>
            <Text style={styles.savedBtnLabel}>念のため保存</Text>
            <Text style={styles.savedBtnCount}>{memoCount}問</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.savedBtn}
            onPress={() => router.push('/saved')}
          >
            <Text style={styles.savedBtnIcon}>🔁</Text>
            <Text style={styles.savedBtnLabel}>苦手リスト</Text>
            <Text style={styles.savedBtnCount}>{retryCount}問</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*
        Round14 調査用デバッグ表示（暫定実装）。
        進捗・正答率の集計バグ（オーナー報告）の原因特定のため、
        実機データに基づく生の集計値をその場で確認できるようにする。
        原因確定後に削除 or 本実装への統合を検討すること。
      */}
      <TouchableOpacity
        style={styles.debugToggle}
        onPress={() => setDebugOpen((v) => !v)}
        activeOpacity={0.7}
      >
        <Text style={styles.debugToggleText}>
          {debugOpen ? '▼' : '▶'} 🔧 デバッグ情報
        </Text>
      </TouchableOpacity>
      {debugOpen && (
        <View style={styles.debugBox}>
          <Text style={styles.debugLine}>totalAnswered: {stats.totalAnswered}</Text>
          <Text style={styles.debugLine}>totalCorrect: {stats.totalCorrect}</Text>
          <Text style={styles.debugLine}>accuracyRate: {stats.accuracyRate}%</Text>
          <Text style={[styles.debugLine, styles.debugSectionTitle]}>
            bySubjectCategory['gkentei_law_ethics']:
          </Text>
          {stats.bySubjectCategory['gkentei_law_ethics']
            ? Object.entries(stats.bySubjectCategory['gkentei_law_ethics']).map(([cat, c]) => (
                <Text key={cat} style={styles.debugLine}>
                  {cat}: total={c.total} attempted={c.attempted} correct={c.correct}
                </Text>
              ))
            : <Text style={styles.debugLine}>(データなし)</Text>}
        </View>
      )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scroll:    { flex: 1 },
  content:   { padding: 16, paddingBottom: 48 },

  streakBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#FFF3E0', borderRadius: 12, padding: 14,
    marginBottom: 12, borderWidth: 1, borderColor: '#FF9800',
  },
  streakBannerOff: {
    backgroundColor: '#F5F5F5', borderColor: '#DDD',
  },
  streakIcon:  { fontSize: 28 },
  streakValue: { fontSize: 16, fontWeight: '700', color: '#E65100' },
  streakSub:   { fontSize: 12, color: '#888', marginTop: 2 },

  sectionHeader: { fontSize: 13, color: '#888', fontWeight: '600', letterSpacing: 0.5, marginBottom: 8, marginTop: 4 },

  // 資格カード（Round8論点B: 統一フォーマット = アイコン＋資格名＋全体進捗バー＋統計テキスト）
  examCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, marginBottom: 10,
    overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  examAccentBar: { width: 5, alignSelf: 'stretch' },
  examBody: { flex: 1, padding: 14 },
  examName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  examStat: { fontSize: 12, color: '#9CA3AF', marginBottom: 8 },
  examBarTrack: { height: 5, backgroundColor: '#F0F0F0', borderRadius: 3 },
  examBarFill:  { height: 5, borderRadius: 3 },
  examArrow: { fontSize: 18, fontWeight: '700', color: '#9CA3AF', paddingRight: 16 },

  section:      { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 10 },

  savedRow: { flexDirection: 'row', gap: 10 },
  savedBtn: {
    flex: 1, alignItems: 'center', paddingVertical: 12, borderRadius: 8,
    backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#DDD',
  },
  savedBtnIcon:  { fontSize: 20, marginBottom: 4 },
  savedBtnLabel: { fontSize: 12, color: '#555', fontWeight: '600' },
  savedBtnCount: { fontSize: 18, fontWeight: '800', color: '#1A1A2E', marginTop: 2 },

  // Round14 調査用デバッグ表示（暫定）
  debugToggle: { paddingVertical: 10, paddingHorizontal: 4 },
  debugToggleText: { fontSize: 12, color: '#9CA3AF', fontWeight: '600' },
  debugBox: {
    backgroundColor: '#1A1A2E', borderRadius: 8, padding: 12, marginBottom: 24,
  },
  debugLine: { fontSize: 11, color: '#D1FAE5', fontFamily: 'monospace', marginBottom: 2 },
  debugSectionTitle: { color: '#FFF', fontWeight: '700', marginTop: 6, marginBottom: 4 },
});
