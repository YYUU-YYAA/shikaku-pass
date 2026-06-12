import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useProgress } from '../../hooks/useProgress';
import { SUBJECT_LABELS, SUBJECT_ICONS, SUBJECT_THEMES } from '../../types';
import type { SubjectKey } from '../../types';

function getMastery(attempted: number, rate: number) {
  if (attempted === 0) return { label: '未着手', color: '#9CA3AF', bg: '#F3F4F6' };
  if (rate >= 80)      return { label: '習得',   color: '#16A34A', bg: '#DCFCE7' };
  if (rate >= 60)      return { label: '練習中',  color: '#D97706', bg: '#FEF3C7' };
  return                      { label: '学習中',  color: '#DC2626', bg: '#FEE2E2' };
}

export default function SubjectDetailScreen() {
  const { key }    = useLocalSearchParams<{ key: string }>();
  const subjectKey = key as SubjectKey;
  const { stats }  = useProgress();
  const router     = useRouter();

  if (!SUBJECT_THEMES[subjectKey]) return null;

  const theme  = SUBJECT_THEMES[subjectKey];
  const icon   = SUBJECT_ICONS[subjectKey];
  const label  = SUBJECT_LABELS[subjectKey];
  const catMap = stats.bySubjectCategory[subjectKey] ?? {};
  const cats   = Object.entries(catMap);

  const subTotal     = cats.reduce((s, [, c]) => s + c.total, 0);
  const subAttempted = cats.reduce((s, [, c]) => s + c.attempted, 0);
  const subCorrect   = cats.reduce((s, [, c]) => s + c.correct, 0);
  const subRate      = subAttempted > 0 ? Math.round((subCorrect / subAttempted) * 100) : 0;
  const subProgress  = subTotal > 0 ? (subAttempted / subTotal) * 100 : 0;
  const mastered     = cats.filter(([, c]) => c.attempted > 0 && Math.round((c.correct / c.attempted) * 100) >= 80).length;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* Colored header */}
      <View style={[styles.header, { backgroundColor: theme.accent }]}>
        <SafeAreaView>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>← ホームへ</Text>
          </TouchableOpacity>

          <View style={styles.headerBody}>
            <Text style={styles.headerIcon}>{icon}</Text>
            <Text style={styles.headerTitle}>{label}</Text>
            <Text style={styles.headerStat}>
              {subAttempted > 0
                ? `${subAttempted}/${subTotal}問達成  ·  正答率 ${subRate}%`
                : `全${subTotal}問  ·  未着手`}
            </Text>
            {subAttempted > 0 && (
              <Text style={styles.headerMastery}>
                カテゴリ習得: {mastered}/{cats.length}
              </Text>
            )}
          </View>

          {/* Progress bar */}
          <View style={styles.headerBarTrack}>
            <View style={[styles.headerBarFill, { width: `${subProgress}%` as any }]} />
          </View>
          <Text style={styles.headerPct}>{Math.round(subProgress)}% 達成</Text>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {/* Quiz all */}
        <TouchableOpacity
          style={[styles.quizAllBtn, { backgroundColor: theme.accent }]}
          onPress={() => router.push({ pathname: '/quiz', params: { subject: subjectKey } })}
        >
          <Text style={styles.quizAllText}>全カテゴリ ランダム10問演習</Text>
          <Text style={styles.quizAllSub}>苦手もまとめて対策できます</Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>カテゴリ別</Text>

        {cats.map(([cat, stat]) => {
          const rate    = stat.attempted > 0 ? Math.round((stat.correct / stat.attempted) * 100) : 0;
          const mastery = getMastery(stat.attempted, rate);
          const prog    = stat.total > 0 ? (stat.attempted / stat.total) * 100 : 0;

          return (
            <TouchableOpacity
              key={cat}
              style={styles.catCard}
              onPress={() => router.push({ pathname: '/quiz', params: { subject: subjectKey, category: cat } })}
              activeOpacity={0.85}
            >
              <View style={styles.catTop}>
                <View style={styles.catLeft}>
                  <View style={[styles.masteryBadge, { backgroundColor: mastery.bg }]}>
                    <Text style={[styles.masteryLabel, { color: mastery.color }]}>{mastery.label}</Text>
                  </View>
                  <Text style={styles.catName}>{cat}</Text>
                </View>
                <Text style={[styles.catArrow, { color: theme.accent }]}>演習 →</Text>
              </View>

              <Text style={styles.catStat}>
                {stat.attempted}/{stat.total}問
                {stat.attempted > 0 ? `  ·  正答率 ${rate}%` : ''}
              </Text>

              <View style={styles.catBarTrack}>
                <View style={[
                  styles.catBarFill,
                  { width: `${prog}%` as any, backgroundColor: theme.accent + 'CC' },
                ]} />
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

  header:     { backgroundColor: '#E94560', paddingBottom: 20, paddingHorizontal: 20 },
  backBtn:    { paddingTop: 12, paddingBottom: 8 },
  backText:   { color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '600' },
  headerBody: { paddingBottom: 12 },
  headerIcon:    { fontSize: 32, marginBottom: 6 },
  headerTitle:   { fontSize: 22, fontWeight: '900', color: '#FFF', marginBottom: 4 },
  headerStat:    { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 2 },
  headerMastery: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },

  headerBarTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 3, marginBottom: 6 },
  headerBarFill:  { height: 6, backgroundColor: '#FFF', borderRadius: 3 },
  headerPct:      { fontSize: 11, color: 'rgba(255,255,255,0.75)', textAlign: 'right' },

  body:        { flex: 1 },
  bodyContent: { padding: 16 },

  quizAllBtn: {
    borderRadius: 12, padding: 16, marginBottom: 20, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  quizAllText: { color: '#FFF', fontWeight: '800', fontSize: 16 },
  quizAllSub:  { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 4 },

  sectionLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '700', letterSpacing: 0.8, marginBottom: 10, marginLeft: 2, textTransform: 'uppercase' },

  catCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  catTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  catLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },

  masteryBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  masteryLabel: { fontSize: 11, fontWeight: '700' },

  catName:  { fontSize: 14, fontWeight: '700', color: '#1A1A2E', flex: 1 },
  catArrow: { fontSize: 12, fontWeight: '700' },
  catStat:  { fontSize: 12, color: '#9CA3AF', marginBottom: 8 },

  catBarTrack: { height: 5, backgroundColor: '#F0F0F0', borderRadius: 3 },
  catBarFill:  { height: 5, borderRadius: 3 },
});
