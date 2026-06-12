import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, SafeAreaView, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useProgress } from '../hooks/useProgress';
import { QUESTIONS } from '../data/questions';
import { SUBJECT_LABELS, SUBJECT_ICONS, SUBJECT_THEMES } from '../types';
import type { SubjectKey, ProgressStats } from '../types';
import { ROLES } from '../data/roles';
import { RoleCard } from '../components/RoleCard';

const SUBJECTS: SubjectKey[] = ['financial_analysis', 'securities_analysis', 'market_economics'];

function getSubjectStats(key: SubjectKey, bySubjectCategory: ProgressStats['bySubjectCategory']) {
  const catMap   = bySubjectCategory[key] ?? {};
  const cats     = Object.values(catMap);
  const total    = cats.reduce((s, c) => s + c.total, 0);
  const attempted = cats.reduce((s, c) => s + c.attempted, 0);
  const correct  = cats.reduce((s, c) => s + c.correct, 0);
  const rate     = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
  const pct      = total > 0 ? (attempted / total) * 100 : 0;
  return { total, attempted, correct, rate, pct };
}

export default function HomeScreen() {
  const router    = useRouter();
  const { stats } = useProgress();
  const weakCount = stats.weakQuestionIds.length;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Dark header ─────────────────────────────── */}
        <View style={styles.header}>
          <SafeAreaView>
            <View style={styles.headerTop}>
              <View>
                <Text style={styles.logo}>CMA Pass</Text>
                <Text style={styles.subtitle}>証券アナリスト 1次試験対策</Text>
              </View>
              {stats.streak > 0 && (
                <View style={styles.streakPill}>
                  <Text style={styles.streakPillText}>🔥 {stats.streak}日</Text>
                </View>
              )}
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{stats.totalAnswered}</Text>
                <Text style={styles.statLabel}>解答数</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{QUESTIONS.length}</Text>
                <Text style={styles.statLabel}>問題数</Text>
              </View>
              {weakCount > 0 && (
                <>
                  <View style={styles.statDivider} />
                  <View style={styles.statBox}>
                    <Text style={[styles.statValue, styles.statRed]}>{weakCount}</Text>
                    <Text style={styles.statLabel}>苦手</Text>
                  </View>
                </>
              )}
            </View>
          </SafeAreaView>
        </View>

        {/* ── Light body ──────────────────────────────── */}
        <View style={styles.body}>

          {/* Subject cards */}
          <Text style={styles.sectionLabel}>科目を選んで演習</Text>

          {SUBJECTS.map(key => {
            const theme = SUBJECT_THEMES[key];
            const s     = getSubjectStats(key, stats.bySubjectCategory);
            return (
              <TouchableOpacity
                key={key}
                style={styles.subjectCard}
                onPress={() => router.push(`/subject/${key}`)}
                activeOpacity={0.85}
              >
                <View style={[styles.subjectAccent, { backgroundColor: theme.accent }]} />
                <View style={styles.subjectBody}>
                  <View style={styles.subjectTop}>
                    <View style={styles.subjectTitleRow}>
                      <Text style={styles.subjectIcon}>{SUBJECT_ICONS[key]}</Text>
                      <View>
                        <Text style={styles.subjectName}>{SUBJECT_LABELS[key]}</Text>
                        <Text style={styles.subjectCount}>{s.total}問</Text>
                      </View>
                    </View>
                    <Text style={[styles.subjectArrow, { color: theme.accent }]}>→</Text>
                  </View>

                  {s.attempted > 0 ? (
                    <Text style={styles.subjectStat}>
                      {s.attempted}問達成  ·  正答率 {s.rate}%
                    </Text>
                  ) : (
                    <Text style={[styles.subjectStat, { color: '#C0C0C0' }]}>未着手</Text>
                  )}

                  <View style={styles.progressTrack}>
                    <View style={[
                      styles.progressFill,
                      { width: `${s.pct}%` as any, backgroundColor: theme.accent },
                    ]} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Quick access */}
          <Text style={[styles.sectionLabel, { marginTop: 8 }]}>クイックアクセス</Text>

          <View style={styles.quickRow}>
            <TouchableOpacity
              style={styles.quickBtn}
              onPress={() => router.push({ pathname: '/quiz', params: { subject: 'all' } })}
            >
              <Text style={styles.quickIcon}>🎲</Text>
              <Text style={styles.quickTitle}>ランダム10問</Text>
              <Text style={styles.quickSub}>全科目ミックス</Text>
            </TouchableOpacity>

            {weakCount > 0 ? (
              <TouchableOpacity
                style={[styles.quickBtn, styles.quickBtnWeak]}
                onPress={() => router.push({ pathname: '/quiz', params: { mode: 'review' } })}
              >
                <Text style={styles.quickIcon}>🎯</Text>
                <Text style={[styles.quickTitle, { color: '#E94560' }]}>苦手復習</Text>
                <Text style={styles.quickSub}>{weakCount}問を特訓</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.quickBtn, { opacity: 0.5 }]}
                disabled
              >
                <Text style={styles.quickIcon}>🎯</Text>
                <Text style={styles.quickTitle}>苦手復習</Text>
                <Text style={styles.quickSub}>苦手問題なし</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.examBtn}
            onPress={() => router.push('/mock-exam')}
          >
            <View>
              <Text style={styles.examTitle}>模擬試験モード</Text>
              <Text style={styles.examSub}>3科目 × 20問  /  90分計測</Text>
            </View>
            <Text style={styles.examArrow}>→</Text>
          </TouchableOpacity>

          {/* ── キャリアロードマップ ───────────────────── */}
          <Text style={[styles.sectionLabel, { marginTop: 28 }]}>キャリアから資格を探す</Text>
          <Text style={styles.roadmapCaption}>
            あなたの職種・目指す方向から、おすすめの資格ルートを見てみる
          </Text>

          <View style={styles.roleGrid}>
            {ROLES.map((role) => (
              <View key={role.id} style={styles.roleCell}>
                <RoleCard role={role} highlight={role.id === 'finance'} />
              </View>
            ))}
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2F5FA' },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },

  // ── Header ──────────────────────────────────────
  header: {
    backgroundColor: '#0B1437', paddingHorizontal: 22, paddingBottom: 28,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: 16, marginBottom: 24 },

  logo:     { fontSize: 30, fontWeight: '900', color: '#FFF', letterSpacing: -0.5 },
  subtitle: { fontSize: 12, color: '#6B7BA4', marginTop: 2 },

  streakPill: {
    backgroundColor: 'rgba(255,152,0,0.18)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1, borderColor: 'rgba(255,152,0,0.4)',
  },
  streakPillText: { color: '#FFA726', fontWeight: '700', fontSize: 13 },

  statsRow:   { flexDirection: 'row', alignItems: 'center', gap: 0 },
  statBox:    { flex: 1, alignItems: 'center' },
  statValue:  { fontSize: 24, fontWeight: '900', color: '#FFF' },
  statLabel:  { fontSize: 11, color: '#6B7BA4', marginTop: 3 },
  statRed:    { color: '#F87171' },
  statDivider: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.08)' },

  // ── Body ────────────────────────────────────────
  body: { paddingHorizontal: 16, paddingTop: 20 },

  sectionLabel: {
    fontSize: 11, color: '#9CA3AF', fontWeight: '700',
    letterSpacing: 0.8, marginBottom: 12, textTransform: 'uppercase',
  },

  // Career roadmap section
  roadmapCaption: { fontSize: 12, color: '#6B7BA4', marginTop: -6, marginBottom: 14, lineHeight: 18 },
  roleGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  roleCell: { width: '50%', paddingHorizontal: 5, marginBottom: 10 },

  // Subject cards
  subjectCard: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 14,
    marginBottom: 10, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  subjectAccent: { width: 5 },
  subjectBody:   { flex: 1, padding: 14 },
  subjectTop:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  subjectTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  subjectIcon:  { fontSize: 24 },
  subjectName:  { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  subjectCount: { fontSize: 11, color: '#9CA3AF', marginTop: 1 },
  subjectArrow: { fontSize: 18, fontWeight: '700' },
  subjectStat:  { fontSize: 12, color: '#6B7BA4', marginBottom: 8 },

  progressTrack: { height: 5, backgroundColor: '#F0F2F5', borderRadius: 3 },
  progressFill:  { height: 5, borderRadius: 3 },

  // Quick access
  quickRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  quickBtn: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 14, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  quickBtnWeak: { borderWidth: 1, borderColor: 'rgba(233,69,96,0.2)' },
  quickIcon:  { fontSize: 24, marginBottom: 8 },
  quickTitle: { fontSize: 14, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  quickSub:   { fontSize: 11, color: '#9CA3AF', textAlign: 'center' },

  examBtn: {
    backgroundColor: '#0B1437', borderRadius: 14, padding: 18,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: 'rgba(233,69,96,0.4)',
  },
  examTitle: { fontSize: 16, fontWeight: '800', color: '#FFF' },
  examSub:   { fontSize: 12, color: '#6B7BA4', marginTop: 3 },
  examArrow: { fontSize: 20, color: '#E94560' },
});
