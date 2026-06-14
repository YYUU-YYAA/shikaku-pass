import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// ── デザイントークン（app/index.tsx・TopTabBarと共通。象モチーフのピンク） ──
const COLOR_ACCENT_PINK = '#FF2D87';

/**
 * Round10: 全画面共通ヘッダーのタイトル表示。
 * 🐘バッジ（Round9のlogoEmojiBadge/TopTabBarのiconWrapActiveと同じ
 * rgba(255,45,135,0.1)円形）＋タイトル文字列を表示する。
 * _layout.tsxのscreenOptions.headerTitleに指定し、各画面のtitleを
 * children経由で受け取って表示する。
 */
export default function HeaderTitle({ children }: { children?: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.emojiBadge}>
        <Text style={styles.emoji}>🐘</Text>
      </View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  emojiBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(255,45,135,0.1)',
    alignItems: 'center', justifyContent: 'center',
  },
  emoji: { fontSize: 16 },
  title: { fontSize: 18, fontWeight: '800', color: '#FFF', letterSpacing: -0.2 },
});
