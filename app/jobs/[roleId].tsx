import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, SafeAreaView, Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ROLES } from '../../data/roles';
import type { RoleId, RoadmapPhase, RoadmapStep } from '../../data/roles';
import { ExamStepCard } from '../../components/ExamStepCard';
import HeaderBackButton from '../../components/HeaderBackButton';

// ── デザイントークン（Round6配色トークンを継承。Round7論点C: ヘッダー等に適用） ──
// 出典: app/index.tsx（COLOR_*定数の正本）。このファイルでも同じ値を使うため再定義する。
const COLOR_BG_PAGE        = '#FFF5FA';
const COLOR_TEXT_PRIMARY   = '#1D1D1F';
const COLOR_TEXT_SECONDARY = '#6E6E73';
const COLOR_ACCENT_PRIMARY = '#7B2FF7'; // メインアクセント（パープル）
const COLOR_ACCENT_CYAN    = '#22C3E6'; // 並走可バッジ・もっと見るリンク
const COLOR_ACCENT_PEACH   = '#FFB199'; // 注記ボックスのティント

/**
 * フェーズ内の steps を order 昇順でグルーピングする。
 * 同じ order が複数ある場合は「並走可」として同じグループにまとめ、
 * グループ間はコネクタ（縦ドット）で接続する。
 */
function groupStepsByOrder(steps: RoadmapStep[]): RoadmapStep[][] {
  const sorted = [...steps].sort((a, b) => a.order - b.order);
  const groups: RoadmapStep[][] = [];
  for (const step of sorted) {
    const last = groups[groups.length - 1];
    if (last && last[0].order === step.order) {
      last.push(step);
    } else {
      groups.push([step]);
    }
  }
  return groups;
}

/** フェーズ間・グループ間のコネクタ（Round7: `↓`記号→縦方向ドットコネクタに統一） */
function VerticalConnector() {
  return (
    <View style={styles.verticalConnector}>
      <View style={styles.connectorDotV} />
      <View style={styles.connectorDotV} />
      <View style={styles.connectorDotV} />
    </View>
  );
}

/** 1つの sequence/parallel フェーズをカードとして表示する（Round7: description をアコーディオン化） */
function PhaseCard({ phase }: { phase: RoadmapPhase }) {
  const [expanded, setExpanded] = useState(false);
  const groups = groupStepsByOrder(phase.steps);
  // 最初の句点までを要約として抽出（データ変更なし、表示側の軽量処理）
  const firstSentence = phase.description.split('。')[0] + '。';
  const hasMore = phase.description.length > firstSentence.length;

  return (
    <View style={styles.phaseCard}>
      <Text style={styles.phaseTitle}>{phase.title}</Text>

      <TouchableOpacity
        onPress={() => hasMore && setExpanded((v) => !v)}
        activeOpacity={hasMore ? 0.7 : 1}
        style={styles.phaseDescRow}
      >
        <Text style={styles.phaseDescription} numberOfLines={expanded ? undefined : 1}>
          {expanded ? phase.description : firstSentence}
        </Text>
        {hasMore && (
          <Text style={styles.phaseDescToggle}>{expanded ? '閉じる' : 'もっと見る'}</Text>
        )}
      </TouchableOpacity>

      <View style={styles.stepsArea}>
        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <VerticalConnector />}
            {group.length > 1 && (
              <View style={styles.parallelBadge}>
                <Text style={styles.parallelBadgeText}>並走可</Text>
              </View>
            )}
            {group.map((step) => (
              <ExamStepCard key={`${phase.id}-${step.examId}`} step={step} />
            ))}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

export default function JobRoadmapScreen() {
  const { roleId } = useLocalSearchParams<{ roleId: string }>();
  const router = useRouter();
  const role = ROLES.find((r) => r.id === (roleId as RoleId));

  if (!role) {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.notFound}>
          <Text style={styles.notFoundTitle}>職種が見つかりませんでした</Text>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.notFoundBtn}>
              <Text style={styles.notFoundBtnText}>ホームへ戻る</Text>
            </TouchableOpacity>
          </Link>
        </SafeAreaView>
      </View>
    );
  }

  // 連続する type:'parallel' のフェーズをグループ化し、横並び/縦積みカード列として表示する
  const groups: { type: 'sequence' | 'parallel'; phases: RoadmapPhase[] }[] = [];
  for (const phase of role.roadmap) {
    const last = groups[groups.length - 1];
    if (phase.type === 'parallel' && last && last.type === 'parallel') {
      last.phases.push(phase);
    } else {
      groups.push({ type: phase.type, phases: [phase] });
    }
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* ── Header（Round7: ダークネイビー→Round6メインアクセントのパープルに変更） ── */}
      <View style={styles.header}>
        <SafeAreaView>
          <HeaderBackButton label="ホームへ" onPress={() => router.push('/')} />

          <View style={styles.headerBody}>
            <Text style={styles.headerIcon}>{role.icon}</Text>
            <Text style={styles.headerTitle}>{role.name}</Text>
            <Text style={styles.headerDescription}>{role.description}</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* ── Light body ──────────────────────────────── */}
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            ※これは資格パスの編集チームが考える、おすすめの順番です
          </Text>
        </View>

        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && <VerticalConnector />}

            {group.type === 'sequence' ? (
              <PhaseCard phase={group.phases[0]} />
            ) : (
              <View style={styles.parallelGroup}>
                {group.phases.map((phase) => (
                  <View key={phase.id} style={styles.parallelCell}>
                    <PhaseCard phase={phase} />
                  </View>
                ))}
              </View>
            )}
          </React.Fragment>
        ))}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLOR_BG_PAGE }, // #F2F5FA→COLOR_BG_PAGE(#FFF5FA)、ホーム画面と統一

  // ── Header（Round7: ダークネイビー→Round6メインアクセントに変更、余白拡大） ──
  header: {
    backgroundColor: COLOR_ACCENT_PRIMARY, // #0B1437→#7B2FF7
    paddingHorizontal: 24,   // 20→24
    paddingBottom: 32,       // 24→32
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0,
  },

  headerBody:        { paddingTop: 8 },
  headerIcon:        { fontSize: 36, marginBottom: 8 },
  headerTitle:       { fontSize: 28, fontWeight: '800', color: '#FFF', marginBottom: 10, letterSpacing: -0.6 }, // 24/900→28/800
  headerDescription: { fontSize: 14, color: 'rgba(255,255,255,0.82)', lineHeight: 22 }, // 13/0.75→14/0.82

  // ── Body ────────────────────────────────────────
  body:        { flex: 1 },
  bodyContent: { padding: 20 }, // 16→20

  // 注記ボックス（Round7: 黄色＋ボーダー→COLOR_ACCENT_PEACHティント、ボーダーなし）
  noteBox: {
    backgroundColor: 'rgba(255,177,153,0.16)', borderRadius: 12, padding: 10, marginBottom: 20,
  },
  noteText: { fontSize: 11, color: COLOR_TEXT_SECONDARY, lineHeight: 16 },

  // ── Phase card（Round7: カード型・余白拡大・description折り畳み） ──
  phaseCard: {
    backgroundColor: '#FFF', borderRadius: 20, padding: 20, marginBottom: 12, // 14/14/4→20/20/12
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 12, // 0.05→0.04, 8→12
    shadowOffset: { width: 0, height: 4 }, elevation: 2, // height 2→4
  },
  phaseTitle: {
    fontSize: 15, fontWeight: '700', color: COLOR_TEXT_PRIMARY, // '800'→'700'
    marginBottom: 8, letterSpacing: -0.2,
  },
  phaseDescRow: { marginBottom: 16 }, // 12→16
  phaseDescription: { fontSize: 12, color: COLOR_TEXT_SECONDARY, lineHeight: 18 },
  phaseDescToggle: {
    fontSize: 11, fontWeight: '700', color: COLOR_ACCENT_CYAN, marginTop: 4,
  },

  stepsArea: {},

  // 並走可ラベル（Round7: 赤文字→シアンのピル型バッジ）
  parallelBadge: {
    alignSelf: 'flex-start', backgroundColor: 'rgba(34,195,230,0.12)',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 8,
  },
  parallelBadgeText: { fontSize: 11, fontWeight: '700', color: COLOR_ACCENT_CYAN },

  // フェーズ間・グループ間コネクタ（Round7: `↓`記号→縦方向ドットコネクタに統一）
  verticalConnector: { alignItems: 'center', paddingVertical: 6, gap: 3 },
  connectorDotV: { width: 4, height: 4, borderRadius: 2, backgroundColor: COLOR_ACCENT_PRIMARY, opacity: 0.5 },

  // Parallel group layout (連続する parallel フェーズの横並び/縦積み)
  // flexBasis + flexGrow で「幅があれば横並び、狭ければ縦積み」を実現する。
  parallelGroup: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  parallelCell:  { flexGrow: 1, flexBasis: 280, paddingHorizontal: 5, marginBottom: 12 },

  // Not found
  notFound:      { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  notFoundTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  notFoundBtn:   { backgroundColor: COLOR_ACCENT_PRIMARY, borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  notFoundBtnText: { color: '#FFF', fontWeight: '700' },
});
