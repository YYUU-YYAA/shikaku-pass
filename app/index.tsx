import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import TopTabBar from '../components/TopTabBar';
import { useProgress } from '../hooks/useProgress';
import type { ProgressStats } from '../types';
import { ROLES, EXAMS, getExamDefinition } from '../data/roles';
import type { RoleId, ExamId } from '../data/roles';
import { getSubjectsForExam, getExamProgress } from '../data/examSubjects';

// ── デザイントークン（Bento Grid共通定数 → Round2すごろくで継続） ──────
// 2026-06-12 Bento Gridデザインシステム（docs/product/2026-06-12-home-redesign-bento.md）
// 2026-06-12 すごろく型 全体像 再設計（docs/product/2026-06-12-sugoroku-redesign.md）
const MODULE_RADIUS = 22;
const MODULE_SHADOW = {
  shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 14,
  shadowOffset: { width: 0, height: 4 }, elevation: 3,
};
const COLOR_BG_PAGE   = '#FFF5FA';
const COLOR_TEXT_PRIMARY   = '#1D1D1F';
const COLOR_TEXT_SECONDARY = '#6E6E73';
const COLOR_TEXT_TERTIARY  = '#9CA3AF';
const COLOR_ACCENT_PRIMARY = '#7B2FF7'; // メインアクセント（パープル）。レーンアイコン円・見出し・コア矢印
const COLOR_ACCENT_PINK    = '#FF2D87'; // Delirium象モチーフのピンク。最重要の強調箇所
const COLOR_ACCENT_CYAN    = '#22C3E6'; // 「パスを見る →」リンクのアクセント
const COLOR_ACCENT_MINT    = '#34C759'; // 演習可能・ポジティブな状態（維持）
const COLOR_ACCENT_PEACH   = '#FFB199'; // セクション区切りの背景ティント

// 職種別アクセントカラー（Round7新規）。レーンカード上部のアクセントバー・
// laneIconCircleの背景色に使用する「職種カラー」の正本。
const ROLE_ACCENT_COLORS: Record<RoleId, string> = {
  finance:    COLOR_ACCENT_PINK,    // #FF2D87 既存（CMA母艦・最重要）
  accounting: COLOR_ACCENT_PRIMARY, // #7B2FF7 既存（メインパープル）
  legal:      '#FF9F43',            // 新規: オレンジ（法務＝硬い印象を和らげる暖色）
  is:         COLOR_ACCENT_CYAN,    // #22C3E6 既存
  management: '#8E7CFF',            // 新規: ラベンダー（パープル系統だが既存PRIMARYより淡く区別）
  rd:         COLOR_ACCENT_MINT,    // #34C759 既存
  hr:         '#FF6B9D',            // Phase2新規: ピンク系（人・組織＝あたたかい印象）
  production: '#5B8DEF',            // Phase2新規: ブルー（製造・品質＝信頼感）
  sales:      '#FFA94D',            // Phase2新規: オレンジ系（営業＝活発な印象、legalのオレンジとは色相をずらす）
  logistics:  '#4DB6AC',            // Phase2新規: ティール（物流＝流れ・移動のイメージ）
};

// 10レーンの表示順（finance=CMA Passの母艦を先頭、以降はRoleId定義順に近い並び）
const LANE_ORDER: RoleId[] = ['finance', 'management', 'accounting', 'legal', 'hr', 'rd', 'production', 'is', 'sales', 'logistics'];

/**
 * 全資格・全科目を横断した合計進捗を出す（Round7論点E以降、サイドバーは資格別表示
 * (getExamProgress)に切り替えたため直接の呼び出しはないが、将来的な総合進捗表示の
 * 正本として残す）。
 */
function getOverallProgress(bySubjectCategory: ProgressStats['bySubjectCategory']) {
  let total = 0;
  let attempted = 0;
  for (const cats of Object.values(bySubjectCategory)) {
    for (const c of Object.values(cats)) {
      total += c.total;
      attempted += c.attempted;
    }
  }
  const pct = total > 0 ? (attempted / total) * 100 : 0;
  return { total, attempted, pct };
}

// ── すごろくの「マス」 ───────────────────────────────────────
interface CellProps {
  examId: ExamId;
  /** このマスの先にさらに〇マスある（先頭1マスのみ表示する分岐の補助ラベル） */
  extraCount?: number;
  /** マスサイズを少し大きく（financeのCMAマスなど、目立たせたい場合） */
  emphasize?: boolean;
}

function SugorokuCell({ examId, extraCount, emphasize }: CellProps) {
  const router = useRouter();
  const exam = getExamDefinition(examId);
  if (!exam) return null;
  const icon = getSubjectsForExam(examId)[0]?.icon;

  return (
    <TouchableOpacity
      style={[styles.cell, emphasize && styles.cellEmphasize, !exam.implemented && styles.cellPending]}
      onPress={() => router.push(`/qualifications/${examId}`)}
      activeOpacity={0.85}
    >
      {icon ? <Text style={styles.cellIcon}>{icon}</Text> : null}
      <Text style={[styles.cellText, emphasize && styles.cellTextEmphasize]} numberOfLines={2}>{exam.shortName}</Text>
      <View style={[styles.cellStatusDot, exam.implemented ? styles.cellStatusDotReady : styles.cellStatusDotPending]} />
      {extraCount ? (
        <View style={styles.extraBadge}>
          <Text style={styles.extraBadgeText}>+{extraCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

/** マスとマスの間のコネクタ（Round7: 矢印→ドット連結線） */
function SugorokuConnector() {
  return (
    <View style={styles.connector}>
      <View style={styles.connectorDot} />
      <View style={styles.connectorDot} />
      <View style={styles.connectorDot} />
    </View>
  );
}

/** 路線の途中に挿入する、専門性・レベルの区切りラベル（Round 4: 一直線化） */
function SegmentDivider({ label }: { label: string }) {
  return (
    <View style={styles.segmentDivider}>
      <Text style={styles.segmentLabel}>{label}</Text>
    </View>
  );
}

// ── レーンカード本体 ─────────────────────────────────────────
interface LaneCardProps {
  role: typeof ROLES[number];
  isDesktop?: boolean;
  itemCount: number;
  children: React.ReactNode;
}

function LaneCard({ role, isDesktop, itemCount, children }: LaneCardProps) {
  const router = useRouter();

  return (
    <View style={[styles.module, styles.laneCard, isDesktop && styles.laneCardDesktop, MODULE_SHADOW]}>
      <View style={[styles.laneAccentBar, { backgroundColor: ROLE_ACCENT_COLORS[role.id] }]} />
      <View style={styles.laneCardBody}>
        <TouchableOpacity
          style={styles.laneHeader}
          onPress={() => router.push(`/jobs/${role.id}`)}
          activeOpacity={0.85}
        >
          <View style={[styles.laneIconCircle, { backgroundColor: ROLE_ACCENT_COLORS[role.id] }]}>
            <Text style={styles.laneIcon}>{role.icon}</Text>
          </View>
          <View style={styles.laneHeaderText}>
            <Text style={styles.laneName}>{role.name}</Text>
            <Text style={styles.laneSubtitle}>{LANE_SUBTITLES[role.id]}</Text>
            <View style={styles.laneMaskCountBadge}>
              <Text style={styles.laneMaskCountText}>全{itemCount}マス</Text>
            </View>
          </View>
          <Text style={styles.laneChevron}>›</Text>
        </TouchableOpacity>

        {children}
      </View>
    </View>
  );
}

// レーンカードのサブタイトル（3.2: 入口資格名のみの短縮ラベル）
const LANE_SUBTITLES: Record<RoleId, string> = {
  finance: '入口: 簿記・FP',
  accounting: '入口: 簿記',
  legal: '入口: ビジ法',
  is: '入口: ITパスポート',
  management: '入口: 簿記2級',
  rd: '分野別に進む',
  hr: '入口: 衛生管理者・メンタル検定',
  production: '入口: QC検定',
  sales: '入口: 販売士',
  logistics: '入口: BC検定(ロジスティクス)',
};

/** items配列のうち kind:'cell' または kind:'stack' の数を「マス数」としてカウントする */
function countLaneItems(items: RouteItem[]): number {
  return items.filter((item) => item.kind === 'cell' || item.kind === 'stack').length;
}

export default function HomeScreen() {
  const router  = useRouter();
  const { stats, reload } = useProgress();
  useFocusEffect(useCallback(() => { reload(); }, [reload]));
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const roleById = new Map(ROLES.map((r) => [r.id, r]));

  // 論点E: 進捗がある（implemented: true かつ attempted > 0 な科目を持つ）資格ごとに
  // サイドバーカードを1枚表示する。1件も進捗が無ければ空配列＝CMA固定の旧表示にフォールバック。
  const progressExams = EXAMS.filter((exam) => {
    if (!exam.implemented) return false;
    return getExamProgress(stats.bySubjectCategory, exam.id).attempted > 0;
  });

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <TopTabBar />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
        <View style={styles.body}>
          <View style={[styles.center, { maxWidth: isDesktop ? 1160 : 720 }]}>

            <View style={[styles.layoutRow, isDesktop && styles.layoutRowDesktop]}>

              {/* ── サイドバー（いまのパス） ──────────── */}
              <View style={[styles.sidebar, isDesktop && styles.sidebarDesktop]}>
                <Text style={styles.sectionLabel}>あなたの状況</Text>
                {progressExams.length === 0 ? (
                  <TouchableOpacity
                    style={[styles.module, styles.footerModule, MODULE_SHADOW]}
                    onPress={() => router.push('/qualifications/cma')}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.moduleLabel}>いまのパス</Text>
                    <Text style={styles.moduleTitle}>CMA{'\n'}（証券アナリスト）</Text>
                    <Text style={styles.moduleBody}>
                      まずは1問から。{'\n'}CMAの演習を始めてみる →
                    </Text>
                  </TouchableOpacity>
                ) : (
                  progressExams.map((exam, i) => {
                    const examProgress = getExamProgress(stats.bySubjectCategory, exam.id);
                    return (
                      <TouchableOpacity
                        key={exam.id}
                        style={[styles.module, styles.footerModule, MODULE_SHADOW]}
                        onPress={() => router.push(`/qualifications/${exam.id}`)}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.moduleLabel}>いまのパス</Text>
                        <Text style={styles.moduleTitle}>{exam.name}</Text>

                        <View style={styles.progressRow}>
                          {i === 0 && stats.streak > 0 && (
                            <View style={styles.streakPill}>
                              <Text style={styles.streakPillText}>🔥 {stats.streak}日</Text>
                            </View>
                          )}
                          <Text style={styles.progressPct}>{Math.round(examProgress.pct)}%</Text>
                        </View>
                        <View style={styles.progressTrack}>
                          <View style={[styles.progressFill, { width: `${examProgress.pct}%` as any }]} />
                        </View>
                        <Text style={styles.moduleFootnote}>
                          {examProgress.attempted} / {examProgress.total} 問
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>

              {/* ── 右メイン（すごろくチャート） ──────────── */}
              <View style={[styles.main, isDesktop && styles.mainDesktop]}>

                {/* ── すごろくレーン（10本） ─────────────────── */}
                <View style={[styles.laneGrid, isDesktop && styles.laneGridDesktop]}>
                  {LANE_ORDER.map((roleId) => {
                    const role = roleById.get(roleId);
                    if (!role) return null;

                    if (roleId === 'finance') return <FinanceLane key={roleId} role={role} isDesktop={isDesktop} />;
                    if (roleId === 'rd') return <RdLane key={roleId} role={role} isDesktop={isDesktop} />;
                    return <StandardLane key={roleId} role={role} isDesktop={isDesktop} />;
                  })}
                </View>

              </View>

            </View>
          </View>
        </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ── レーン専用レンダリング（Round 4: 1本の路線に一直線化） ──────────

/** 1本の路線を構成する要素（セル / スタックセル / 区切りラベル） */
type RouteItem =
  | { kind: 'cell'; examId: ExamId; emphasize?: boolean; extraCount?: number }
  | { kind: 'stack'; examIds: ExamId[] }
  | { kind: 'segment'; label: string };

/**
 * 路線アイテムの配列を、コネクタで繋いだ1本のFragment配列としてレンダリングする。
 * セル・スタックセル・区切りラベルの間すべてに`SugorokuConnector`（3ドット）を挿入する
 * （1.4節: 「全セル間に挿入」、Round7: 矢印→ドットコネクタに変更）。
 */
function LaneRoute({ items }: { items: RouteItem[] }) {
  return (
    <>
      {items.map((item, i) => {
        const key = item.kind === 'segment' ? `segment-${item.label}-${i}` :
          item.kind === 'stack' ? item.examIds.join('-') : item.examId;

        return (
          <React.Fragment key={key}>
            {i > 0 && <SugorokuConnector />}
            {item.kind === 'cell' && (
              <SugorokuCell examId={item.examId} emphasize={item.emphasize} extraCount={item.extraCount} />
            )}
            {item.kind === 'stack' && (
              <View style={styles.stackCell}>
                {item.examIds.map((examId) => <SugorokuCell key={examId} examId={examId} />)}
              </View>
            )}
            {item.kind === 'segment' && <SegmentDivider label={item.label} />}
          </React.Fragment>
        );
      })}
    </>
  );
}

/** レーンのチャート部分（折り返し路線）を共通ラップする */
function LaneChart({ items }: { items: RouteItem[] }) {
  return (
    <View style={styles.routeWrap}>
      <LaneRoute items={items} />
    </View>
  );
}


/**
 * 標準レーン（accounting / legal / is / management）
 * role.idごとに、roadmapの各フェーズから1本の路線アイテム配列を組み立てる。
 */
function StandardLane({ role, isDesktop }: { role: typeof ROLES[number]; isDesktop?: boolean }) {
  const phaseSteps = (phaseId: string) => {
    const phase = role.roadmap.find((p) => p.id === phaseId);
    return phase ? [...phase.steps].sort((a, b) => a.order - b.order) : [];
  };

  const items: RouteItem[] = [];

  switch (role.id) {
    case 'accounting': {
      const core = phaseSteps('core');           // 簿記3, 簿記2
      const branchA = phaseSteps('branch-a');     // FP3, FP2
      const branchB = phaseSteps('branch-b');     // 簿記1, 税理士
      const branchC = phaseSteps('branch-c');     // 診断士 | CMA（どちらもorder:1）

      core.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      items.push({ kind: 'segment', label: '実務強化' });
      branchA.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      branchB.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      items.push({ kind: 'segment', label: '専門分岐' });
      items.push({ kind: 'stack', examIds: branchC.map((s) => s.examId) });
      break;
    }

    case 'legal': {
      const core = phaseSteps('core');       // ビジ法3, ビジ法2
      const branchA = phaseSteps('branch-a'); // ビジ法1
      const branchB = phaseSteps('branch-b'); // 行政書士
      const branchC = phaseSteps('branch-c'); // 社労士

      core.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      items.push({ kind: 'segment', label: '専門分岐' });
      [...branchA, ...branchB, ...branchC].forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      break;
    }

    case 'is': {
      const core = phaseSteps('core');       // ITパスポート, 基本情報
      const branchA = phaseSteps('branch-a'); // 応用情報
      const branchB = phaseSteps('branch-b'); // クラウド
      const branchC = phaseSteps('branch-c'); // 支援士, PMP
      const branchD = phaseSteps('branch-d'); // G検定

      core.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      items.push({ kind: 'segment', label: '専門分岐' });
      [...branchA, ...branchB, ...branchC, ...branchD].forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      break;
    }

    case 'management': {
      const core = phaseSteps('core');       // 簿記2, 診断士1次
      const branchA = phaseSteps('branch-a'); // 診断士2次, 簿記1

      core.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      items.push({ kind: 'segment', label: '専門分岐' });
      branchA.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      break;
    }

    case 'hr': {
      const coreSafety = phaseSteps('core-safety'); // 衛生管理者2種
      const coreMental = phaseSteps('core-mental'); // メンタル検定III種, II種
      const branchA = phaseSteps('branch-a');        // BC検定(人事)
      const branchB = phaseSteps('branch-b');        // 社労士

      items.push({ kind: 'segment', label: 'コア(並走可)' });
      items.push({ kind: 'stack', examIds: [...coreSafety, ...coreMental].map((s) => s.examId) });
      items.push({ kind: 'segment', label: '専門分岐' });
      [...branchA, ...branchB].forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      break;
    }

    case 'production': {
      const core = phaseSteps('core');       // QC検定3級, QC検定2級
      const branchA = phaseSteps('branch-a'); // 危険物乙4, 危険物甲種
      const branchB = phaseSteps('branch-b'); // BC検定(生産管理)

      core.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      items.push({ kind: 'segment', label: '専門分岐' });
      [...branchA, ...branchB].forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      break;
    }

    case 'sales': {
      const core = phaseSteps('core');       // 販売士3級, 販売士2級
      const branchA = phaseSteps('branch-a'); // 簿記3級
      const branchB = phaseSteps('branch-b'); // BC検定(営業)

      core.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      items.push({ kind: 'segment', label: '専門分岐' });
      [...branchA, ...branchB].forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      break;
    }

    case 'logistics': {
      const core = phaseSteps('core');       // BC検定(ロジスティクス)
      const branchA = phaseSteps('branch-a'); // 運行管理者
      const branchB = phaseSteps('branch-b'); // 通関士

      core.forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      items.push({ kind: 'segment', label: '専門分岐' });
      [...branchA, ...branchB].forEach((s) => items.push({ kind: 'cell', examId: s.examId }));
      break;
    }
  }

  return (
    <LaneCard role={role} isDesktop={isDesktop} itemCount={countLaneItems(items)}>
      <LaneChart items={items} />
    </LaneCard>
  );
}

/**
 * financeレーン専用:
 * 簿記3→簿記2→FP3→FP2→CMA(★強調)→[専門分岐]→CFA(+1 TOEIC)→CFP→診断士
 */
function FinanceLane({ role, isDesktop }: { role: typeof ROLES[number]; isDesktop?: boolean }) {
  const entryPhase = role.roadmap.find((p) => p.id === 'entry');
  const corePhase  = role.roadmap.find((p) => p.id === 'core');

  const entrySteps = entryPhase ? entryPhase.steps : [];
  // 簿記ルート→FPルートの順に直列化（元データの並び順をそのまま使う）
  const bookkeepingRow = [...entrySteps.filter((s) => s.examId.startsWith('bookkeeping'))].sort((a, b) => a.order - b.order);
  const fpRow = [...entrySteps.filter((s) => s.examId.startsWith('fp'))].sort((a, b) => a.order - b.order);

  const cmaStep = corePhase?.steps.find((s) => s.examId === 'cma');

  const branchA = role.roadmap.find((p) => p.id === 'branch-a'); // CFA, TOEIC（ともにorder:1）
  const cfaStep = branchA?.steps.find((s) => s.examId === 'cfa');
  const branchB = role.roadmap.find((p) => p.id === 'branch-b'); // CFP
  const branchC = role.roadmap.find((p) => p.id === 'branch-c'); // 診断士

  const items: RouteItem[] = [
    ...bookkeepingRow.map((s) => ({ kind: 'cell' as const, examId: s.examId })),
    ...fpRow.map((s) => ({ kind: 'cell' as const, examId: s.examId })),
    ...(cmaStep ? [{ kind: 'cell' as const, examId: cmaStep.examId }] : []),
    { kind: 'segment' as const, label: '専門分岐' },
    ...(cfaStep ? [{ kind: 'cell' as const, examId: cfaStep.examId }] : []),
    ...(branchB?.steps.map((s) => ({ kind: 'cell' as const, examId: s.examId })) ?? []),
    ...(branchC?.steps.map((s) => ({ kind: 'cell' as const, examId: s.examId })) ?? []),
  ];

  return (
    <LaneCard role={role} isDesktop={isDesktop} itemCount={countLaneItems(items)}>
      <LaneChart items={items} />
    </LaneCard>
  );
}

/**
 * rdレーン専用: 3分野（化学・製造／AI・データ／その先の専門）を1本の路線に統合。
 * [化学・製造]→危険物乙4→危険物甲種→[AI・データ]→[G検定|統計検定2級]→E資格
 * →[その先の専門]→クラウドAI資格→統計検定準1級
 */
function RdLane({ role, isDesktop }: { role: typeof ROLES[number]; isDesktop?: boolean }) {
  const chemistry = role.roadmap.find((p) => p.id === 'field-chemistry');
  const aiDs = role.roadmap.find((p) => p.id === 'field-ai-ds');
  const aiDsAdvanced = role.roadmap.find((p) => p.id === 'field-ai-ds-advanced');

  const chemistrySteps = chemistry ? [...chemistry.steps].sort((a, b) => a.order - b.order) : [];
  const aiDsSteps = aiDs ? [...aiDs.steps].sort((a, b) => a.order - b.order) : [];
  const aiDsAdvancedSteps = aiDsAdvanced ? [...aiDsAdvanced.steps].sort((a, b) => a.order - b.order) : [];

  // aiDs: order:1が2つ(g_kentei, stat2)→縦スタック、order:2がe_shikaku
  const aiDsFirst = aiDsSteps.filter((s) => s.order === Math.min(...aiDsSteps.map((x) => x.order)));
  const aiDsRest = aiDsSteps.filter((s) => !aiDsFirst.includes(s));

  const items: RouteItem[] = [
    { kind: 'segment', label: '化学・製造' },
    ...chemistrySteps.map((s) => ({ kind: 'cell' as const, examId: s.examId })),
    { kind: 'segment', label: 'AI・データ' },
    { kind: 'stack', examIds: aiDsFirst.map((s) => s.examId) },
    ...aiDsRest.map((s) => ({ kind: 'cell' as const, examId: s.examId })),
    { kind: 'segment', label: 'その先の専門' },
    ...aiDsAdvancedSteps.map((s) => ({ kind: 'cell' as const, examId: s.examId })),
  ];

  return (
    <LaneCard role={role} isDesktop={isDesktop} itemCount={countLaneItems(items)}>
      <LaneChart items={items} />
    </LaneCard>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLOR_BG_PAGE },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },

  // ── SafeAreaラッパー（ステータスバー避け用途のみ） ──
  safeArea: { flex: 1 },

  // ── ボディ全体 ───────────────────────────────────
  // paddingTop: 16はRound9で追加（トップが詰まりすぎという指摘への対応。8の倍数ルール準拠）
  body: { paddingHorizontal: 20, paddingTop: 16 },
  // Web幅では中央寄せの読みやすい幅に制限（maxWidthはisDesktopで可変、モバイルでは100%のまま）
  center: { width: '100%', alignSelf: 'center' },

  // ── 2カラムレイアウト（Round 3: サイドバー＋メイン） ──
  layoutRow: { flexDirection: 'column' },
  layoutRowDesktop: { flexDirection: 'row', gap: 24, alignItems: 'flex-start' },

  // ── サイドバー（いまのパス） ─────────────────────
  sidebar: { width: '100%' },
  sidebarDesktop: { width: 260, flexShrink: 0 },

  // ── 右メイン（すごろくチャート） ──────────────────
  main: { width: '100%' },
  mainDesktop: { flex: 1 },

  // ── モジュール共通 ───────────────────────────────
  module: {
    backgroundColor: '#FFFFFF', borderRadius: MODULE_RADIUS, padding: 18,
  },

  // ── レーンカードグリッド（Round 3: 2列グリッド） ────
  // Round8論点A: sectionIntro/sectionTitle（メイン見出し「キャリア別資格パス」）削除に伴い、
  // 詰まりすぎないようlaneGrid側に上部余白を補う（デスクトップではサイドバーと横並びの先頭要素になる）。
  laneGrid: { flexDirection: 'column', marginTop: 18 },
  laneGridDesktop: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginTop: 0 },

  // ── レーンカード（Round7: 上部アクセントバーで職種別に色分け） ──────
  // module.padding(18)を打ち消し、上部にカード幅いっぱいのアクセントバーを
  // 配置できるようにする。本文は laneCardBody で18pxパディングを再現する。
  laneCard: {
    width: '100%', marginBottom: 14, padding: 0,
    overflow: 'hidden', // 角丸からアクセントバーがはみ出さないように
  },
  laneCardDesktop: { width: 428 },
  laneAccentBar: { height: 5, width: '100%' },
  laneCardBody: { padding: 18 },
  laneHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  laneIconCircle: {
    width: 40, height: 40, borderRadius: 20,
    // backgroundColor は動的に ROLE_ACCENT_COLORS[role.id] を適用
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  laneIcon: { fontSize: 18 },
  laneHeaderText: { flex: 1 },
  laneName: { fontSize: 17, fontWeight: '700', color: COLOR_TEXT_PRIMARY, letterSpacing: -0.3 },
  laneSubtitle: { fontSize: 12, color: COLOR_TEXT_SECONDARY, marginTop: 2 },
  laneMaskCountBadge: {
    alignSelf: 'flex-start', backgroundColor: 'rgba(123,47,247,0.08)',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginTop: 4,
  },
  laneMaskCountText: { fontSize: 11, fontWeight: '700', color: COLOR_ACCENT_PRIMARY },
  laneChevron: {
    fontSize: 22, fontWeight: '700', color: COLOR_TEXT_TERTIARY, marginLeft: 8,
  },

  // ── 路線レイアウト（折り返し対応） ────────────────
  routeWrap: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' },
  // 路線の途中に挿入する区切りラベル（Round 4: 1.3節 案B）
  segmentDivider: {
    alignItems: 'center', justifyContent: 'center',
    marginRight: 10, marginBottom: 8,
    width: 30, height: 72, borderRadius: 12,
    backgroundColor: 'rgba(255,177,153,0.16)', // COLOR_ACCENT_PEACH (#FFB199) のティント
    paddingHorizontal: 4,
  },
  segmentLabel: {
    fontSize: 10, fontWeight: '600', color: COLOR_TEXT_TERTIARY,
    textAlign: 'center', letterSpacing: 0.2, lineHeight: 13,
  },

  // ── すごろくの「マス」（Round7: 角丸を大幅強化し「丸みの強い吹き出し型」に） ──
  // Round13: 影(elevation)を付与して立体感を出し、アイコン追加・文字/バッジを拡大して視認性を強化
  cell: {
    width: 72, height: 72, borderRadius: 24, backgroundColor: '#FFFFFF', // 10→24
    borderWidth: 1.5, borderColor: 'rgba(123,47,247,0.12)', // ボーダーをやや太く・パープル系に
    alignItems: 'center', justifyContent: 'center', padding: 4,
    marginRight: 8, marginBottom: 8, position: 'relative',
    ...MODULE_SHADOW, shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2,
  },
  cellEmphasize: {
    width: 80, height: 80, borderRadius: 28, // 角丸も合わせて拡大
    borderWidth: 2.5, borderColor: COLOR_ACCENT_PINK, backgroundColor: 'rgba(255,45,135,0.07)',
    shadowColor: COLOR_ACCENT_PINK, shadowOpacity: 0.28, shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 }, elevation: 6,
  },
  cellIcon: {
    fontSize: 18, lineHeight: 19, marginBottom: 1,
  },
  cellText: {
    fontSize: 11, fontWeight: '700', color: COLOR_TEXT_PRIMARY, textAlign: 'center', lineHeight: 13,
  },
  cellTextEmphasize: {
    color: COLOR_ACCENT_PINK,
  },
  // Round16: 「演習できます/準備中」のテキストバッジを廃止し、
  // 色のみのドット（緑=演習可）＋セル全体の不透明度（準備中はフェード）で視覚的に区別
  cellPending: { opacity: 0.45 },
  cellStatusDot: { width: 7, height: 7, borderRadius: 3.5, marginTop: 4 },
  cellStatusDotReady:   { backgroundColor: '#34C759' },
  cellStatusDotPending: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: 'rgba(156,163,175,0.5)' },
  extraBadge: {
    position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18, borderRadius: 9,
    backgroundColor: COLOR_ACCENT_PRIMARY, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 4,
  },
  extraBadgeText: { fontSize: 9, fontWeight: '700', color: '#FFFFFF' },

  stackCell: { marginRight: 8, marginBottom: 8, gap: 6 },

  // ── マス間コネクタ（Round7: 矢印→3ドット連結線） ───────
  connector: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    width: 20, height: 72, marginRight: 4, marginBottom: 8, gap: 3,
  },
  connectorDot: {
    width: 4, height: 4, borderRadius: 2,
    backgroundColor: COLOR_ACCENT_PRIMARY, opacity: 0.5,
  },

  // ── フッターモジュール（いまのパス） ────────────────
  sectionLabel: {
    fontSize: 11, color: COLOR_TEXT_TERTIARY, fontWeight: '600',
    letterSpacing: 0.6, marginBottom: 12, marginTop: 4, textTransform: 'uppercase',
  },
  footerModule: { width: '100%', marginBottom: 12 },
  moduleLabel: {
    fontSize: 11, fontWeight: '600', letterSpacing: 0.6, color: COLOR_TEXT_TERTIARY,
    textTransform: 'uppercase', marginBottom: 10,
  },
  moduleTitle: {
    fontSize: 17, fontWeight: '700', color: COLOR_TEXT_PRIMARY, letterSpacing: -0.3,
    marginBottom: 8, lineHeight: 22,
  },
  moduleBody: { fontSize: 13, color: COLOR_TEXT_SECONDARY, lineHeight: 19 },
  moduleFootnote: { fontSize: 11, color: COLOR_TEXT_TERTIARY, marginTop: 6 },

  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  progressPct: { fontSize: 22, fontWeight: '700', color: COLOR_TEXT_PRIMARY },
  progressTrack: { height: 6, backgroundColor: '#F0F2F5', borderRadius: 3, marginBottom: 4 },
  progressFill:  { height: 6, borderRadius: 3, backgroundColor: COLOR_ACCENT_MINT },

  streakPill: {
    backgroundColor: 'rgba(255,152,0,0.12)', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,152,0,0.3)',
  },
  streakPillText: { color: '#FB923C', fontWeight: '700', fontSize: 12 },
});
