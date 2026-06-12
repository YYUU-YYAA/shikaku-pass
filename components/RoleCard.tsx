import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { RoleDefinition } from '../data/roles';

interface Props {
  role: RoleDefinition;
  /** CMA Passの母艦職種（金融・investment）に付ける小さなバッジ */
  highlight?: boolean;
}

/**
 * 職種カード。
 * - ホーム画面の「キャリアロードマップ」セクション（6職種一覧）
 * - 資格詳細ページの「この資格が関係する職種」セクション
 * の両方で使う共通コンポーネント。タップで /jobs/[roleId] へ遷移する。
 */
export function RoleCard({ role, highlight = false }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/jobs/${role.id}`)}
      activeOpacity={0.85}
    >
      {highlight && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>CMA Passはこの職種の資格です</Text>
        </View>
      )}
      <View style={styles.top}>
        <Text style={styles.icon}>{role.icon}</Text>
        <Text style={styles.name}>{role.name}</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {role.description}
      </Text>
      <Text style={styles.cta}>ロードマップを見る →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 14, padding: 14,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  badge: {
    backgroundColor: '#FFF0F3', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3,
    marginBottom: 8, alignSelf: 'flex-start',
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#E94560' },
  top: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  icon: { fontSize: 22 },
  name: { fontSize: 14, fontWeight: '800', color: '#0F172A', flex: 1 },
  description: { fontSize: 12, color: '#6B7BA4', lineHeight: 17, marginBottom: 10 },
  cta: { fontSize: 12, fontWeight: '700', color: '#E94560' },
});
