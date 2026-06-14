import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  StatusBar, SafeAreaView, Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { getExamDefinition, getRolesByExam } from '../../data/roles';
import type { ExamId, RoleDefinition, RoadmapPhase, RoadmapStep } from '../../data/roles';
import { RoleCard } from '../../components/RoleCard';
import { getSubjectsForExam } from '../../data/examSubjects';
import HeaderBackButton from '../../components/HeaderBackButton';

/** examId が登場する phase/step を role ごとに探索する（ロードマップ上の位置セクション用） */
function findPosition(role: RoleDefinition, examId: ExamId): { phase: RoadmapPhase; step: RoadmapStep } | null {
  for (const phase of role.roadmap) {
    const step = phase.steps.find((s) => s.examId === examId);
    if (step) return { phase, step };
  }
  return null;
}

export default function QualificationDetailScreen() {
  const { examId } = useLocalSearchParams<{ examId: string }>();
  const router = useRouter();
  const exam = getExamDefinition(examId as ExamId);

  if (!exam) {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.notFound}>
          <Text style={styles.notFoundTitle}>資格が見つかりませんでした</Text>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.notFoundBtn}>
              <Text style={styles.notFoundBtnText}>ホームへ戻る</Text>
            </TouchableOpacity>
          </Link>
        </SafeAreaView>
      </View>
    );
  }

  const relatedRoles = getRolesByExam(exam.id);
  const positions = relatedRoles
    .map((role) => ({ role, position: findPosition(role, exam.id) }))
    .filter((p): p is { role: RoleDefinition; position: { phase: RoadmapPhase; step: RoadmapStep } } => p.position !== null);

  const hasOverview = !!(exam.studyHours || exam.difficulty || exam.prerequisite || exam.evaluation);
  const subjects = getSubjectsForExam(exam.id);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* ── Dark header ─────────────────────────────── */}
      <View style={styles.header}>
        <SafeAreaView>
          <HeaderBackButton label="ホームへ" onPress={() => router.push('/')} />

          <View style={styles.headerBody}>
            <Text style={styles.headerIcon}>📘</Text>
            <Text style={styles.headerTitle}>{exam.name}</Text>
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
        </SafeAreaView>
      </View>

      {/* ── Light body ──────────────────────────────── */}
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            ※これは資格パスの編集チームが考える、おすすめの順番です
          </Text>
        </View>

        {exam.implemented ? (
          <>
            {/* A. implemented:true — 演習機能への導線（資格ごとにEXAM_SUBJECTSから動的生成） */}
            <Text style={styles.sectionLabel}>{exam.shortName}で演習を始める</Text>
            <Text style={styles.sectionCaption}>
              {exam.name}は{subjects.length}科目構成です。科目別の演習・模擬試験・進捗管理がすべて利用できます。
            </Text>

            {subjects.map((subj) => {
              const theme = subj.theme;
              return (
                <TouchableOpacity
                  key={subj.key}
                  style={styles.subjectCard}
                  onPress={() => router.push({ pathname: '/subject/[key]', params: { key: subj.key, examId: exam.id } })}
                  activeOpacity={0.85}
                >
                  <View style={[styles.subjectAccent, { backgroundColor: theme.accent }]} />
                  <View style={styles.subjectBody}>
                    <View style={styles.subjectTitleRow}>
                      <Text style={styles.subjectIcon}>{subj.icon}</Text>
                      <Text style={styles.subjectName}>{subj.label}</Text>
                    </View>
                    <Text style={[styles.subjectArrow, { color: theme.accent }]}>→</Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={styles.examBtn}
              onPress={() => router.push({ pathname: '/mock-exam', params: { examId: exam.id } })}
            >
              <Text style={styles.examBtnText}>模擬試験モードを試す</Text>
              <Text style={styles.examBtnArrow}>→</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* B. implemented:false (29資格) — 資格概要 + 準備中の案内 */}
            {hasOverview && (
              <>
                <Text style={styles.sectionLabel}>この資格について</Text>
                <View style={styles.overviewCard}>
                  {exam.studyHours && (
                    <View style={styles.overviewRow}>
                      <Text style={styles.overviewLabel}>学習時間の目安</Text>
                      <Text style={styles.overviewValue}>{exam.studyHours}</Text>
                    </View>
                  )}
                  {exam.difficulty && (
                    <View style={styles.overviewRow}>
                      <Text style={styles.overviewLabel}>難易度感</Text>
                      <Text style={styles.overviewValue}>{exam.difficulty}</Text>
                    </View>
                  )}
                  {exam.prerequisite && (
                    <View style={styles.overviewRow}>
                      <Text style={styles.overviewLabel}>前提関係</Text>
                      <Text style={styles.overviewValue}>{exam.prerequisite}</Text>
                    </View>
                  )}
                  {exam.evaluation && (
                    <View style={[styles.overviewRow, { borderBottomWidth: 0 }]}>
                      <Text style={styles.overviewLabel}>実務・転職市場での評価</Text>
                      <Text style={styles.overviewValue}>{exam.evaluation}</Text>
                    </View>
                  )}
                </View>
              </>
            )}

            <View style={styles.pendingBox}>
              <Text style={styles.pendingTitle}>「準備中」について</Text>
              <Text style={styles.pendingText}>
                資格パスではこの資格の演習機能を準備中です。公開されたら、このページから直接演習に進めるようになります。
              </Text>
            </View>
          </>
        )}

        {/* この資格が関係する職種（共通・implemented true/false どちらも表示） */}
        {relatedRoles.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>この資格が関係する職種</Text>
            <View style={styles.roleGrid}>
              {relatedRoles.map((role) => (
                <View key={role.id} style={styles.roleCell}>
                  <RoleCard role={role} highlight={role.id === 'finance'} />
                </View>
              ))}
            </View>
          </>
        )}

        {/* ロードマップ上の位置 */}
        {positions.length > 0 && (
          <>
            <Text style={[styles.sectionLabel, { marginTop: 8 }]}>ロードマップ上の位置</Text>
            {positions.map(({ role, position }) => (
              <View key={role.id} style={styles.positionCard}>
                <Text style={styles.positionTitle}>
                  {role.name}のロードマップでは「{position.phase.title}」に登場します。
                </Text>
                <Text style={styles.positionNote}>{position.step.note}</Text>
              </View>
            ))}
          </>
        )}

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

  headerBody:  { paddingTop: 8 },
  headerIcon:  { fontSize: 36, marginBottom: 8 },
  headerTitle: { fontSize: 22, fontWeight: '900', color: '#FFF', marginBottom: 10 },

  badge: { borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  badgePending: { backgroundColor: 'rgba(243,244,246,0.15)' },
  badgeReady:   { backgroundColor: 'rgba(22,163,74,0.2)' },
  badgeText: { fontSize: 12, fontWeight: '700' },
  badgeTextPending: { color: '#D1D5DB' },
  badgeTextReady:   { color: '#4ADE80' },

  // ── Body ────────────────────────────────────────
  body:        { flex: 1 },
  bodyContent: { padding: 16 },

  noteBox: {
    backgroundColor: '#FFF7E6', borderRadius: 10, padding: 12, marginBottom: 16,
    borderWidth: 1, borderColor: '#FDE9C8',
  },
  noteText: { fontSize: 12, color: '#92660B', lineHeight: 18 },

  sectionLabel: {
    fontSize: 11, color: '#9CA3AF', fontWeight: '700',
    letterSpacing: 0.8, marginBottom: 8, textTransform: 'uppercase',
  },
  sectionCaption: { fontSize: 12, color: '#6B7BA4', lineHeight: 18, marginBottom: 12 },

  // Subject cards (re-used from index.tsx pattern, simplified)
  subjectCard: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 14,
    marginBottom: 10, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  subjectAccent: { width: 5 },
  subjectBody:   {
    flex: 1, padding: 14, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center',
  },
  subjectTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  subjectIcon:  { fontSize: 22 },
  subjectName:  { fontSize: 14, fontWeight: '800', color: '#0F172A', flex: 1 },
  subjectArrow: { fontSize: 18, fontWeight: '700' },

  examBtn: {
    backgroundColor: '#0B1437', borderRadius: 14, padding: 18, marginTop: 4,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: 'rgba(233,69,96,0.4)',
  },
  examBtnText:  { fontSize: 15, fontWeight: '800', color: '#FFF' },
  examBtnArrow: { fontSize: 18, color: '#E94560' },

  // Overview card (implemented:false)
  overviewCard: {
    backgroundColor: '#FFF', borderRadius: 14, padding: 4, marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 }, elevation: 3,
  },
  overviewRow: {
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F0F2F5',
  },
  overviewLabel: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', marginBottom: 4 },
  overviewValue: { fontSize: 13, color: '#0F172A', lineHeight: 19 },

  pendingBox: {
    backgroundColor: '#F3F4F6', borderRadius: 12, padding: 14, marginBottom: 8,
  },
  pendingTitle: { fontSize: 13, fontWeight: '800', color: '#374151', marginBottom: 6 },
  pendingText:  { fontSize: 12, color: '#6B7280', lineHeight: 18 },

  // Related roles
  roleGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  roleCell: { width: '50%', paddingHorizontal: 5, marginBottom: 10 },

  // Roadmap position
  positionCard: {
    backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  positionTitle: { fontSize: 13, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  positionNote:  { fontSize: 12, color: '#6B7BA4', lineHeight: 18 },

  // Not found
  notFound:      { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  notFoundTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  notFoundBtn:   { backgroundColor: '#0B1437', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 12 },
  notFoundBtnText: { color: '#FFF', fontWeight: '700' },
});
