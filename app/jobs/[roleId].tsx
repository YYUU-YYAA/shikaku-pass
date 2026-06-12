import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, SafeAreaView, Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ROLES } from '../../data/roles';
import type { RoleId, RoadmapPhase, RoadmapStep } from '../../data/roles';
import { ExamStepCard } from '../../components/ExamStepCard';

/**
 * フェーズ内の steps を order 昇順でグルーピングする。
 * 同じ order が複数ある場合は「並走可」として同じグループにまとめ、
 * グループ間は矢印（→）で接続する。
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

/** 1つの sequence/parallel フェーズをカードとして表示する */
function PhaseCard({ phase }: { phase: RoadmapPhase }) {
  const groups = groupStepsByOrder(phase.steps);

  return (
    <View style={styles.phaseCard}>
      <Text style={styles.phaseTitle}>{phase.title}</Text>
      <Text style={styles.phaseDescription}>{phase.description}</Text>

      <View style={styles.stepsArea}>
        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && (
              <View style={styles.arrowRow}>
                <Text style={styles.arrowText}>↓</Text>
              </View>
            )}
            {group.length > 1 && (
              <Text style={styles.parallelLabel}>並走可</Text>
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

      {/* ── Dark header ─────────────────────────────── */}
      <View style={styles.header}>
        <SafeAreaView>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.push('/')}>
            <Text style={styles.backText}>← ホームへ</Text>
          </TouchableOpacity>

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
            ※これは資格Passの編集チームが考える、おすすめの順番です
          </Text>
        </View>

        {groups.map((group, gi) => (
          <React.Fragment key={gi}>
            {gi > 0 && (
              <View style={styles.connector}>
                <Text style={styles.connectorText}>↓</Text>
              </View>
            )}

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
  screen: { flex: 1, backgroundColor: '#F2F5FA' },

  // ── Header ──────────────────────────────────────
  header: {
    backgroundColor: '#0B1437', paddingHorizontal: 20, paddingBottom: 24,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) : 0,
  },
  backBtn:  { paddingTop: 12, paddingBottom: 8 },
  backText: { color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '600' },

  headerBody:        { paddingTop: 8 },
  headerIcon:        { fontSize: 36, marginBottom: 8 },
  headerTitle:       { fontSize: 24, fontWeight: '900', color: '#FFF', marginBottom: 8 },
  headerDescription: { fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 20 },

  // ── Body ────────────────────────────────────────
  body:        { flex: 1 },
  bodyContent: { padding: 16 },

  noteBox: {
    backgroundColor: '#FFF7E6', borderRadius: 10, padding: 12, marginBottom: 16,
    borderWidth: 1, borderColor: '#FDE9C8',
  },
  noteText: { fontSize: 12, color: '#92660B', lineHeight: 18 },

  // Phase card
  phaseCard: {
    backgroundColor: '#FFF', borderRadius: 14, padding: 14, marginBottom: 4,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  phaseTitle:       { fontSize: 14, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  phaseDescription: { fontSize: 12, color: '#6B7BA4', lineHeight: 18, marginBottom: 12 },

  stepsArea: {},
  arrowRow:  { alignItems: 'center', paddingVertical: 4 },
  arrowText: { fontSize: 16, color: '#9CA3AF' },
  parallelLabel: {
    fontSize: 11, fontWeight: '700', color: '#E94560', marginBottom: 6,
  },

  // Phase group connector (between sequence/parallel groups)
  connector:     { alignItems: 'center', paddingVertical: 8 },
  connectorText: { fontSize: 20, color: '#9CA3AF' },

  // Parallel group layout (連続する parallel フェーズの横並び/縦積み)
  // flexBasis + flexGrow で「幅があれば横並び、狭ければ縦積み」を実現する。
  parallelGroup: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  parallelCell:  { flexGrow: 1, flexBasis: 280, paddingHorizontal: 5, marginBottom: 12 },

  // Not found
  notFound:      { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  notFoundTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  notFoundBtn:   { backgroundColor: '#0B1437', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  notFoundBtnText: { color: '#FFF', fontWeight: '700' },
});
