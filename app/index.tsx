import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useProgress } from '../hooks/useProgress';

export default function HomeScreen() {
  const router = useRouter();
  const { stats } = useProgress();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CMA Pass</Text>
      <Text style={styles.subtitle}>証券アナリスト 財務諸表分析</Text>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.totalAnswered}</Text>
          <Text style={styles.statLabel}>解答数</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{stats.accuracyRate}%</Text>
          <Text style={styles.statLabel}>正答率</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => router.push('/quiz')}>
        <Text style={styles.startText}>演習スタート</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A2E', alignItems: 'center', justifyContent: 'center', padding: 32 },
  logo: { fontSize: 36, fontWeight: '900', color: '#FFF', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#AAA', marginBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 32, marginBottom: 48 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '800', color: '#E94560' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  startButton: {
    backgroundColor: '#E94560', paddingVertical: 16, paddingHorizontal: 48,
    borderRadius: 50, width: '100%', alignItems: 'center',
  },
  startText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
});
