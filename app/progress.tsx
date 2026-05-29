import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useProgress } from '../hooks/useProgress';

export default function ProgressScreen() {
  const { stats } = useProgress();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>総解答数</Text>
        <Text style={styles.value}>{stats.totalAnswered}問</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>正答率</Text>
        <Text style={[styles.value, { color: '#28A745' }]}>{stats.accuracyRate}%</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>正解数</Text>
        <Text style={styles.value}>{stats.totalCorrect}問</Text>
      </View>
      <Text style={styles.sectionTitle}>カテゴリ別（開発中）</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 16 },
  card: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 20,
    marginBottom: 12, alignItems: 'center', shadowColor: '#000',
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  label: { fontSize: 13, color: '#888', marginBottom: 4 },
  value: { fontSize: 32, fontWeight: '800', color: '#1A1A2E' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 8 },
});
