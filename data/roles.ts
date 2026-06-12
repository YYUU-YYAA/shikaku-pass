/**
 * data/roles.ts — 「職種別キャリア資格ロードマップ」設計試作（2026-06-12）
 *
 * ステータス: 設計検討用ドラフト。新規ファイルのみ追加。
 *   - types/index.ts, data/questions.ts 等の既存ファイルは無変更。
 *   - ここで定義する ExamId / ExamDefinition は前回会議
 *     (2026-06-12-0928-exam-platform-pivot.md, Renセクション 2.1) の案を
 *     ローカルに再掲したもの。実装着手時は types/index.ts 側に統合する。
 *   - Android審査結果が出るまで、このファイルが import されることはない
 *     （app/, data/index.ts 等からは参照しない = ビルドに影響なし）。
 *
 * 設計方針:
 *   1. 「資格(Exam)」と「職種(Role)」は多対多の関係。
 *      RoleDefinition は ExamId の配列を「ロードマップ順」で持つ。
 *   2. ロードマップは「公式な正解」ではなく Forge Labs(資格Pass)としての
 *      編集的な提案。各ステップに推奨理由(note)を一言添える。
 *   3. まだ ExamDefinition が存在しない資格（簿記3級・FP2級・危険物乙4・
 *      ITパスポート等）もロードマップには登場する。実装時に ExamId を
 *      拡張する前提で、いまは「将来追加予定の資格キー」も同じ ExamId
 *      ユニオン型に含めておく（型としては定義するが、対応する
 *      ExamDefinition / 問題データは未実装でよい = "coming soon" 表示）。
 */

// ---------------------------------------------------------------------
// 0. 前回会議の型を再掲（実装時は types/index.ts に統合）
// ---------------------------------------------------------------------

/**
 * 資格キー。
 * 'cma' のみ実装済み。他は前回会議で優先順位付けされた追加予定資格＋
 * 今回オーナーが例示した資格（語学系・基本情報技術者等）を先行的に列挙。
 * → 資格が1つ増えるごとにこのユニオン型に追記していく運用。
 */
export type ExamId =
  | 'cma'              // CMA（証券アナリスト）★母艦・実装済み
  | 'bookkeeping3'     // 日商簿記3級
  | 'bookkeeping2'     // 日商簿記2級
  | 'fp3'              // FP3級
  | 'fp2'              // FP2級
  | 'shoukiboshindanshi' // 中小企業診断士(1次)
  | 'itpassport'       // ITパスポート
  | 'fe'               // 基本情報技術者
  | 'kikenbutsu4'      // 危険物取扱者 乙種4類
  | 'toeic';           // TOEIC（語学系・選択式の代表例）

export interface ExamDefinition {
  id: ExamId;
  name: string;       // 表示名 例: "CMA（証券アナリスト）"
  shortName: string;  // 例: "CMA Pass"
  implemented: boolean; // 問題データが実装済みか（false="準備中"バッジ表示用）
}

// ---------------------------------------------------------------------
// 1. RoleDefinition — 職種定義
// ---------------------------------------------------------------------

/**
 * 職種カテゴリのキー。
 * オーナー例示（経営・経理・法務・研究開発・生産管理・情シス）に
 * 一般的な職種を補って網羅的に列挙（詳細な分類はMia案を参照）。
 */
export type RoleId =
  | 'management'    // 経営・経営企画
  | 'accounting'    // 経理・財務
  | 'legal'         // 法務・総務
  | 'hr'            // 人事・労務
  | 'rd'            // 研究開発・技術
  | 'production'    // 生産管理・品質管理
  | 'is'            // 情報システム・社内SE
  | 'sales'         // 営業・マーケティング
  | 'logistics';    // 物流・購買

/**
 * ロードマップ1ステップ = 1資格 + 編集的コメント。
 * order はロードマップ内での推奨順（1始まり）。
 */
export interface RoadmapStep {
  examId: ExamId;
  order: number;
  note: string; // 「なぜこの順番か」の一言（資格Passとしてのポジション）
}

export interface RoleDefinition {
  id: RoleId;
  name: string;          // 表示名 例: "経理・財務"
  description: string;   // 職種の概要・どんな人向けか
  /** この職種に関連する資格（ロードマップの全資格。orderで並び順を保証） */
  roadmap: RoadmapStep[];
  /** 職種ハブ画面でのアイコン（emoji。実装時は専用アイコンに置換可） */
  icon: string;
}

// ---------------------------------------------------------------------
// 2. サンプルデータ（2職種分のロードマップ）
//    ※ Mia案のロードマップ提案を技術的なデータ構造に落とし込んだもの。
//      文言・順序はMia案準拠。最終的な編集判断はMia/オーナーに委ねる。
// ---------------------------------------------------------------------

export const ROLES: RoleDefinition[] = [
  {
    id: 'accounting',
    name: '経理・財務',
    description:
      '会社のお金の流れを記録・管理し、経営判断のための数字を作る仕事。' +
      '簿記の知識を土台に、外部資金調達や経営分析まで視野を広げていくキャリアパス。',
    icon: '🧮',
    roadmap: [
      {
        examId: 'bookkeeping3',
        order: 1,
        note: 'まずは簿記の基本ルール（仕訳・決算書の読み方）をここで身につける。経理職の入口資格。',
      },
      {
        examId: 'bookkeeping2',
        order: 2,
        note: '工業簿記・連結会計など実務で使う範囲まで拡張。多くの企業が経理職の「実質必須」とみなすレベル。',
      },
      {
        examId: 'fp3',
        order: 3,
        note: '会社のお金だけでなく個人の資産設計にも視野を広げる。会計知識と相性が良く、学習コストも低い。',
      },
      {
        examId: 'cma',
        order: 4,
        note: '将来的に財務分析・IR・経営企画方向にキャリアを伸ばしたい人向け。簿記で身につけた数字を「投資家視点」で読む力に変換するステップ。',
      },
      {
        examId: 'shoukiboshindanshi',
        order: 5,
        note: '経理から経営企画・管理部門の中核へ進みたい人の中長期ゴール。難易度は高いが、簿記2級までの知識が土台になる。',
      },
    ],
  },
  {
    id: 'is',
    name: '情報システム・社内SE',
    description:
      '社内のITインフラ・業務システムを支える仕事。技術知識だけでなく、' +
      '社内調整や業務理解（特に経理・契約関連）も求められる、技術と業務知識の両立がカギ。',
    icon: '🖥️',
    roadmap: [
      {
        examId: 'itpassport',
        order: 1,
        note: 'IT・経営・法務の基礎を広く浅くカバー。社内SEとしての「共通言語」を最短で身につけられる入口資格。',
      },
      {
        examId: 'fe',
        order: 2,
        note: '基本情報技術者でIT専門知識を本格的に固める。技術職としてのベース資格として広く認知されている。',
      },
      {
        examId: 'bookkeeping3',
        order: 3,
        note: '社内SEは経理・購買システムに関わる機会が多い。簿記3級レベルの会計知識があると要件定義の精度が上がる、という編集的提案。',
      },
      {
        examId: 'toeic',
        order: 4,
        note: '外資系ベンダーやグローバル展開企業との関わりに備える。技術力＋語学力で社内での価値が上がりやすい。',
      },
    ],
  },
];

// ---------------------------------------------------------------------
// 3. ヘルパー関数案（実装時の参考。今回はロジック検証はしていない）
// ---------------------------------------------------------------------

/** 指定した資格が、どの職種ロードマップに含まれているかを逆引き */
export function getRolesByExam(examId: ExamId): RoleDefinition[] {
  return ROLES.filter((role) => role.roadmap.some((step) => step.examId === examId));
}

/** 職種IDからロードマップを order 順で取得 */
export function getRoadmap(roleId: RoleId): RoadmapStep[] {
  const role = ROLES.find((r) => r.id === roleId);
  if (!role) return [];
  return [...role.roadmap].sort((a, b) => a.order - b.order);
}
