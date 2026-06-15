import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, SafeAreaView,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { useProgress } from '../hooks/useProgress';
import { EXAM_SUBJECTS } from '../data/examSubjects';
import HeaderBackButton from '../components/HeaderBackButton';

/**
 * /vc-notes — オーナー専用の隠しVC/スタートアップ問題集 入口画面。
 *
 * 出典: docs/meetings/2026-06-15-2051-hidden-vc-question-bank.md
 *
 * 設計:
 *   - data/examSubjects.ts の EXAM_SUBJECTS.vc_secret（7科目）を直接読み込み、
 *     科目ごとに1カテゴリずつ表示するシンプルな一覧画面。
 *   - 各科目カードをタップすると /quiz?subject=<key>&category=<category> へ遷移。
 *   - この画面は app/_layout.tsx で href: null を指定し、タブバーには
 *     一切表示しない。到達経路は components/TopTabBar.tsx の長押し
 *     （onLongPress, 1.5秒以上）のみ。
 *   - data/roles.ts のEXAMS/ROLESには一切登録されていないため、
 *     ホーム画面・/glossary・/progress・/qualifications/* には
 *     この画面・科目・カテゴリへの導線は一切出現しない。
 */
export default function VcNotesScreen() {
  const router = useRouter();
  const { stats, reload } = useProgress();

  useFocusEffect(useCallback(() => { reload(); }, [reload]));

  const subjects = EXAM_SUBJECTS.vc_secret ?? [];

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <SafeAreaView>
          <HeaderBackButton label="ホームへ" onPress={() => router.back()} />
          <View style={styles.headerBody}>
            <Text style={styles.headerIcon}>🤫</Text>
            <Text style={styles.headerTitle}>VCノート（非公開）</Text>
            <Text style={styles.headerSub}>自分用 — VC/スタートアップ知識の演習帳</Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        {subjects.map((subject) => {
          const catMap = stats.bySubjectCategory[subject.key] ?? {};
          const cats = Object.entries(catMap);
          const total = cats.reduce((s, [, c]) => s + c.total, 0);
          const attempted = cats.reduce((s, [, c]) => s + c.attempted, 0);
          const correct = cats.reduce((s, [, c]) => s + c.correct, 0);
          const rate = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
          const category = subject.categories[0]?.key ?? '';

          return (
            <TouchableOpacity
              key={subject.key}
              style={[styles.card, { borderLeftColor: subject.theme.accent }]}
              activeOpacity={0.85}
              onPress={() => router.push({
                pathname: '/quiz',
                params: { subject: subject.key, category, examId: 'vc_secret' },
              })}
            >
              <View style={styles.cardTop}>
                <Text style={styles.cardIcon}>{subject.icon}</Text>
                <Text style={styles.cardLabel}>{subject.label}</Text>
              </View>
              <Text style={styles.cardStat}>
                {attempted > 0
                  ? `${attempted}/${total}問達成  ·  正答率 ${rate}%`
                  : `全${total}問  ·  未着手`}
              </Text>
              <Text style={[styles.cardArrow, { color: subject.theme.accent }]}>演習 →</Text>
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

  header: { backgroundColor: '#1A1A2E', paddingBottom: 20, paddingHorizontal: 20 },
  headerBody: { paddingBottom: 12 },
  headerIcon: { fontSize: 32, marginBottom: 6 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#FFF', marginBottom: 4 },
  headerSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },

  body: { flex: 1 },
  bodyContent: { padding: 16 },

  card: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 10,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  cardIcon: { fontSize: 20 },
  cardLabel: { fontSize: 15, fontWeight: '800', color: '#1A1A2E', flex: 1 },
  cardStat: { fontSize: 12, color: '#9CA3AF', marginBottom: 4 },
  cardArrow: { fontSize: 12, fontWeight: '700', textAlign: 'right' },
});
