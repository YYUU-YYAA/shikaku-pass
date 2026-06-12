import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TEXTBOOK_BY_CATEGORY } from '../data/textbook';

interface Props {
  explanation: string;
  category?: string;
}

export function AIExplanation({ explanation, category }: Props) {
  const [open, setOpen] = useState(true);
  const entry = category ? TEXTBOOK_BY_CATEGORY.get(category) : undefined;

  return (
    <View style={styles.wrapper}>

      {/* ── 問題の解説 ─────────────────────────── */}
      <View style={styles.explainBox}>
        <Text style={styles.explainLabel}>解説</Text>
        <Text style={styles.explainText}>{explanation}</Text>
      </View>

      {/* ── 教科書セクション ─────────────────── */}
      {entry && (
        <View style={styles.tbOuter}>

          {/* ヘッダー（タップで折りたたみ） */}
          <TouchableOpacity
            style={styles.tbHeader}
            onPress={() => setOpen(v => !v)}
            activeOpacity={0.85}
          >
            <View style={styles.tbHeaderLeft}>
              <Text style={styles.tbIcon}>📖</Text>
              <View>
                <Text style={styles.tbBadge}>教科書</Text>
                <Text style={styles.tbTitle}>{entry.title}</Text>
              </View>
            </View>
            <Text style={styles.tbChevron}>{open ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {open && (
            <View style={styles.tbBody}>

              {/* サマリー */}
              <Text style={styles.tbSummary}>{entry.summary}</Text>

              {/* 主な公式 */}
              {entry.keyFormulas.length > 0 && (
                <View style={styles.formulaBox}>
                  <Text style={styles.formulaBoxTitle}>主な公式</Text>
                  {entry.keyFormulas.map((f, i) => (
                    <View key={i} style={styles.formulaRow}>
                      <Text style={styles.formulaLabel}>{f.label}</Text>
                      <Text style={styles.formulaExpr}>{f.formula}</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* ポイント */}
              <View style={styles.pointsBox}>
                {entry.keyPoints.map((pt, i) => (
                  <View key={i} style={styles.pointRow}>
                    <Text style={styles.pointBullet}>▸</Text>
                    <Text style={styles.pointText}>{pt}</Text>
                  </View>
                ))}
              </View>

              {/* 試験のポイント */}
              <View style={styles.examTipBox}>
                <Text style={styles.examTipIcon}>🎯</Text>
                <Text style={styles.examTipText}>
                  <Text style={styles.examTipLabel}>試験のポイント　</Text>
                  {entry.examTip}
                </Text>
              </View>

            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 16, marginTop: 4, gap: 8 },

  // ── 解説ボックス ─────────────────────────────────
  explainBox: {
    padding: 14,
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
  },
  explainLabel: { fontWeight: '700', fontSize: 12, color: '#4F46E5', marginBottom: 6 },
  explainText:  { fontSize: 14, lineHeight: 22, color: '#1E293B' },

  // ── 教科書外枠 ────────────────────────────────────
  tbOuter: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#C7D7FB',
    backgroundColor: '#F8FAFF',
  },

  // ヘッダー
  tbHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#E8EFFD',
    paddingHorizontal: 14, paddingVertical: 10,
  },
  tbHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  tbIcon:       { fontSize: 20 },
  tbBadge:      { fontSize: 9, color: '#4F46E5', fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 1 },
  tbTitle:      { fontSize: 14, fontWeight: '800', color: '#1E237A' },
  tbChevron:    { fontSize: 11, color: '#7C8FD4' },

  // 本文
  tbBody: { padding: 14, gap: 12 },

  tbSummary: { fontSize: 13, lineHeight: 21, color: '#374151' },

  // 公式ボックス
  formulaBox: {
    backgroundColor: '#EDF2FF',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4F46E5',
    gap: 6,
  },
  formulaBoxTitle: { fontSize: 10, fontWeight: '700', color: '#4F46E5', letterSpacing: 0.5, marginBottom: 4, textTransform: 'uppercase' },
  formulaRow:   { gap: 2 },
  formulaLabel: { fontSize: 11, color: '#6B7BA4', fontWeight: '600' },
  formulaExpr:  { fontSize: 13, color: '#1A237E', fontWeight: '500', lineHeight: 20 },

  // ポイントリスト
  pointsBox: { gap: 6 },
  pointRow:  { flexDirection: 'row', gap: 8, alignItems: 'flex-start' },
  pointBullet: { color: '#4F46E5', fontWeight: '700', fontSize: 14, marginTop: 1 },
  pointText:   { fontSize: 13, color: '#374151', lineHeight: 20, flex: 1 },

  // 試験のポイント
  examTipBox: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 8,
    backgroundColor: '#FFF8E7',
    borderRadius: 8,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  examTipIcon:  { fontSize: 14, marginTop: 1 },
  examTipText:  { flex: 1, fontSize: 13, lineHeight: 20, color: '#374151' },
  examTipLabel: { fontWeight: '700', color: '#92400E' },
});
