import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { RoadmapStep } from '../data/roles';
import { getExamDefinition } from '../data/roles';

// ── デザイントークン（Round6配色トークンを継承。出典: app/index.tsx） ──
const COLOR_TEXT_PRIMARY   = '#1D1D1F';
const COLOR_TEXT_SECONDARY = '#6E6E73';
const COLOR_ACCENT_PRIMARY = '#7B2FF7';

interface Props {
  step: RoadmapStep;
}

/**
 * ロードマップのステップカード（資格1件）。
 * - implemented: true（CMA・危険物乙4・G検定・危険物甲種）→「演習できます」緑バッジ
 * - implemented: false（その他の資格）→「準備中」グレーバッジ
 * タップで /qualifications/[examId] へ遷移する。
 * Round7: 番号丸を塗り→アウトライン円に、step.noteを1行+タップ展開に変更。
 */
export function ExamStepCard({ step }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
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
            <Text style={[styles.badgeText, styles.badgeTextReady]}>演習できます</Text>
          </View>
        ) : (
          <View style={[styles.badge, styles.badgePending]}>
            <Text style={[styles.badgeText, styles.badgeTextPending]}>準備中</Text>
          </View>
        )}
      </View>
      <Text
        style={styles.note}
        numberOfLines={expanded ? undefined : 1}
        onPress={(e) => { e.stopPropagation?.(); setExpanded((v) => !v); }}
      >
        {step.note}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF', borderRadius: 16, padding: 14, marginBottom: 8, // 12/12→16/14
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, // 0.04→0.03, 6→8
    shadowOffset: { width: 0, height: 2 }, elevation: 1, // 2→1
  },
  top: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 }, // gap 8→10
  // Round7: 番号丸を塗り(#0B1437)→アウトライン円(パープル)に変更
  orderCircle: {
    width: 22, height: 22, borderRadius: 11,
    backgroundColor: 'transparent',
    borderWidth: 1.5, borderColor: COLOR_ACCENT_PRIMARY,
    alignItems: 'center', justifyContent: 'center',
  },
  orderText: { fontSize: 11, fontWeight: '700', color: COLOR_ACCENT_PRIMARY }, // 白文字→パープル文字, 800→700
  name: { fontSize: 14, fontWeight: '700', color: COLOR_TEXT_PRIMARY, flex: 1 }, // '800'→'700'、色トークン統一

  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }, // 6→8
  badgePending: { backgroundColor: 'rgba(156,163,175,0.14)' },          // cellBadgePendingと統一
  badgeReady:   { backgroundColor: 'rgba(52,199,89,0.14)' },            // cellBadgeReadyと統一
  badgeText: { fontSize: 10, fontWeight: '700' },
  badgeTextPending: { color: COLOR_TEXT_SECONDARY },
  badgeTextReady:   { color: '#1F9D45' },

  note: { fontSize: 12, color: COLOR_TEXT_SECONDARY, lineHeight: 17 },
});
