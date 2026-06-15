import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// 隠し導線: 「用語集」タブを2秒以内に5回連続タップすると非公開のVCノート
// 画面(/vc-notes)へ遷移する。onLongPress/delayLongPressはモバイルブラウザの
// コンテキストメニュー/テキスト選択ジェスチャーと競合して発火しないことが
// あるため、ブラウザ依存しないonPress+タイムスタンプ判定方式にしている。
const HIDDEN_TAP_COUNT = 5;
const HIDDEN_TAP_WINDOW_MS = 2000;

// ── デザイントークン（app/index.tsxと共通。象モチーフのピンク） ──
const COLOR_ACCENT_PINK = '#FF2D87';
const COLOR_INACTIVE = '#9CA3AF';

type TabKey = 'index' | 'progress' | 'saved' | 'glossary';

const TABS: Array<{ key: TabKey; href: '/' | '/progress' | '/saved' | '/glossary'; label: string; icon: keyof typeof Ionicons.glyphMap }> = [
  { key: 'index',    href: '/',          label: 'ホーム', icon: 'home' },
  { key: 'progress', href: '/progress',  label: '進捗',   icon: 'bar-chart' },
  { key: 'saved',    href: '/saved',     label: '保存',   icon: 'bookmark' },
  { key: 'glossary', href: '/glossary',  label: '用語集', icon: 'book' },
];

/**
 * Round9: ボトムタブバーをトップに移動するための共有コンポーネント。
 * index/progress/saved/glossaryの4画面の先頭（progress/saved/glossaryは
 * 既存の濃紺ヘッダーの直下、indexは画面最上部）に配置する。
 * _layout.tsxではネイティブのボトムタブバーをdisplay:'none'で隠している。
 */
export default function TopTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const tapTimestamps = useRef<number[]>([]);

  function handleGlossaryPress() {
    const now = Date.now();
    const recent = tapTimestamps.current.filter(t => now - t < HIDDEN_TAP_WINDOW_MS);
    recent.push(now);
    if (recent.length >= HIDDEN_TAP_COUNT) {
      tapTimestamps.current = [];
      router.push('/vc-notes');
      return;
    }
    tapTimestamps.current = recent;
    router.push('/glossary');
  }

  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const active = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => (tab.key === 'glossary' ? handleGlossaryPress() : router.push(tab.href))}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, active && styles.iconWrapActive]}>
              <Ionicons name={tab.icon} size={20} color={active ? COLOR_ACCENT_PINK : COLOR_INACTIVE} />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(255,45,135,0.1)',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    color: COLOR_INACTIVE,
  },
  labelActive: {
    color: COLOR_ACCENT_PINK,
  },
});
