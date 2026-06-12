import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useProgress } from '../hooks/useProgress';
import { useSavedQuestions } from '../hooks/useSavedQuestions';
import { SUBJECT_LABELS, SUBJECT_THEMES, SUBJECT_ICONS } from '../types';
import type { SubjectKey } from '../types';

const SUBJECTS: SubjectKey[] = ['financial_analysis', 'securities_analysis', 'market_economics'];

export default function ProgressScreen() {
  const { stats } = useProgress();
  const { byType } = useSavedQuestions();
  const router = useRouter();

  const memoCount = byType('memo').length;
  const retryCount = byType('retry').length;

  function goTo(subject: SubjectKey, status: 'unanswered' | 'correct' | 'incorrect') {
    router.push({ pathname: '/quiz', params: { subject, status } });
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

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

      {/* Subject breakdown */}
      <Text style={styles.sectionHeader}>科目別の進捗</Text>
      {SUBJECTS.map(subjectKey => {
        const theme  = SUBJECT_THEMES[subjectKey];
        const catMap = stats.bySubjectCategory[subjectKey] ?? {};
        const cats   = Object.values(catMap);
        const total     = cats.reduce((s, c) => s + c.total, 0);
        const attempted = cats.reduce((s, c) => s + c.attempted, 0);
        const correct   = cats.reduce((s, c) => s + c.correct, 0);
        const incorrect = attempted - correct;
        const unanswered = total - attempted;

        return (
          <View key={subjectKey} style={styles.subjectCard}>
            <View style={[styles.subjectAccentBar, { backgroundColor: theme.accent }]} />
            <View style={styles.subjectBody}>
              <Text style={styles.subjectName}>
                {SUBJECT_ICONS[subjectKey]} {SUBJECT_LABELS[subjectKey]}
              </Text>
              <View style={styles.statusRow}>
                <TouchableOpacity
                  style={[styles.statusBox, unanswered === 0 && styles.statusBoxDisabled]}
                  onPress={() => goTo(subjectKey, 'unanswered')}
                  disabled={unanswered === 0}
                >
                  <Text style={styles.statusValue}>{unanswered}</Text>
                  <Text style={styles.statusLabel}>未解答</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.statusBox, correct === 0 && styles.statusBoxDisabled]}
                  onPress={() => goTo(subjectKey, 'correct')}
                  disabled={correct === 0}
                >
                  <Text style={[styles.statusValue, styles.statusCorrect]}>{correct}</Text>
                  <Text style={styles.statusLabel}>正解</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.statusBox, incorrect === 0 && styles.statusBoxDisabled]}
                  onPress={() => goTo(subjectKey, 'incorrect')}
                  disabled={incorrect === 0}
                >
                  <Text style={[styles.statusValue, styles.statusIncorrect]}>{incorrect}</Text>
                  <Text style={styles.statusLabel}>不正解</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
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

  subjectCard: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, marginBottom: 10,
    overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  subjectAccentBar: { width: 5 },
  subjectBody: { flex: 1, padding: 14 },
  subjectName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 10 },

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
});
