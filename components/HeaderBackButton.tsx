import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * HeaderBackButton — カスタムヘッダー（紫/各科目テーマカラー背景）の左上に置く
 * 戻るボタン。Round11論点F: Unicode矢印「←」のテキストリンクをやめ、
 * `_layout.tsx`のタブアイコンと同じ@expo/vector-icons(Ionicons)を使った
 * 半透明白背景の丸ボタン+ラベルに統一する。
 *
 * 対象4画面: subject/[key] / jobs/[roleId] / qualifications/[examId] / progress/[examId]
 */
export default function HeaderBackButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.wrap} onPress={onPress} activeOpacity={0.7} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
      <View style={styles.iconCircle}>
        <Ionicons name="chevron-back" size={18} color="#FFF" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingRight: 8,
    paddingBottom: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  label: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
});
