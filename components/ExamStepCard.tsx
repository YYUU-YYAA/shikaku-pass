import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { RoadmapStep } from '../data/roles';
import { getExamDefinition } from '../data/roles';

interface Props {
  step: RoadmapStep;
}

/**
 * ロードマップのステップカード（資格1件）。
 * - implemented: true（CMAのみ）→「演習できます ✏️」緑バッジ
 * - implemented: false（その他29資格）→「準備中」グレーバッジ
 * タップで /qualifications/[examId] へ遷移する。
 */
export function ExamStepCard({ step }: Props) {
  const router = useRouter();
  const exam = getExamDefinition(step.examId);
  if (!exam) return null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/qualifications/${step.examId}`)}
      activeOpacity={0.85}
    >
      <View style={styles.top}>
        <View style={styles.orderCircle}>
          <Text style={styles.orderText}>{step.order}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>{exam.name}</Text>
        {exam.implemented ? (
          <View style={[styles.badge, styles.badgeReady]}>
            <Text style={[styles.badgeText, styles.badgeTextReady]}>演習できます ✏️</Text>
          </View>
        ) : (
          <View style={[styles.badge, styles.badgePending]}>
            <Text style={[styles.badgeText, styles.badgeTextPending]}>準備中</Text>
          </View>
        )}
      </View>
      <Text style={styles.note} numberOfLines={3}>{step.note}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  orderCircle: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: '#0B1437',
    alignItems: 'center', justifyContent: 'center',
  },
  orderText: { fontSize: 11, fontWeight: '800', color: '#FFF' },
  name: { fontSize: 14, fontWeight: '800', color: '#0F172A', flex: 1 },

  badge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgePending: { backgroundColor: '#F3F4F6' },
  badgeReady:   { backgroundColor: '#DCFCE7' },
  badgeText: { fontSize: 10, fontWeight: '700' },
  badgeTextPending: { color: '#9CA3AF' },
  badgeTextReady:   { color: '#16A34A' },

  note: { fontSize: 12, color: '#6B7BA4', lineHeight: 17 },
});
