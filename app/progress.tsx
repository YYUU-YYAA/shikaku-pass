import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useProgress } from '../hooks/useProgress';

export default function ProgressScreen() {
  const { stats } = useProgress();
  const router = useRouter();
  const weakCount = stats.weakQuestionIds.length;
  const hasAnswered = stats.totalAnswered > 0;

  return (
    <ScrollView style={styles.container}>
      {/* 概要カード */}
      <View style={styles.row}>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.label}>総解答数</Text>
          <Text style={styles.value}>{stats.totalAnswered}問</Text>
        </View>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.label}>正答率</Text>
          <Text style={[styles.value, { color: '#28A745' }]}>{stats.accuracyRate}%</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.label}>正解数</Text>
          <Text style={styles.value}>{stats.totalCorrect}問</Text>
        </View>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.label}>苦手問題</Text>
          <Text style={[styles.value, { color: weakCount > 0 ? '#E94560' : '#28A745' }]}>
            {weakCount}問
          </Text>
        </View>
      </View>

      {/* 苦手問題復習 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>苦手問題の復習</Text>
        {!hasAnswered ? (
          <Text style={styles.hint}>演習を開始すると苦手問題が記録されます</Text>
        ) : weakCount === 0 ? (
          <View style={styles.perfectCard}>
            <Text style={styles.perfectText}>🎉 苦手問題ゼロ！</Text>
            <Text style={styles.hint}>全問題に直近で正解しています</Text>
          </View>
        ) : (
          <>
            <Text style={styles.hint}>
              直近の回答で不正解だった {weakCount} 問を集中練習できます
            </Text>
            <TouchableOpacity
              style={styles.reviewButton}
              onPress={() => router.push({ pathname: '/quiz', params: { mode: 'review' } })}
            >
              <Text style={styles.reviewButtonText}>苦手問題を復習する ({weakCount}問)</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* カテゴリ別（今後） */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>カテゴリ別正答率</Text>
        <Text style={styles.hint}>（次フェーズで実装予定）</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  card: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 20,
    alignItems: 'center', shadowColor: '#000',
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  cardHalf: { flex: 1 },
  label: { fontSize: 12, color: '#888', marginBottom: 4 },
  value: { fontSize: 28, fontWeight: '800', color: '#1A1A2E' },

  section: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 16,
    marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 10 },
  hint: { fontSize: 13, color: '#888', lineHeight: 20 },

  perfectCard: { alignItems: 'center', paddingVertical: 8 },
  perfectText: { fontSize: 18, fontWeight: '700', color: '#28A745', marginBottom: 4 },

  reviewButton: {
    backgroundColor: '#E94560', padding: 14, borderRadius: 8,
    alignItems: 'center', marginTop: 12,
  },
  reviewButtonText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});
