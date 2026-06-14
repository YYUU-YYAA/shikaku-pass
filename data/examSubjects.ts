/**
 * data/examSubjects.ts — 「資格ごとの科目メタ情報」レジストリ
 *
 * 背景: 2026-06-12 危険物乙4の演習機能拡張(question-bank-expansion)で、
 *   CMA以外の資格にも演習機能（/subject/[key], /quiz, /mock-exam,
 *   /qualifications/[examId]）を対応させるための汎用化の一環として追加。
 *
 * 設計:
 *   - ExamSubjectMeta = 1科目分の表示情報（CMAのSUBJECT_LABELS/ICONS/THEMES相当）。
 *   - EXAM_SUBJECTS: Record<examId, ExamSubjectMeta[]> — 資格ごとの科目一覧。
 *     配列順 = 画面表示順。
 *   - CMA分は既存の SUBJECT_LABELS/SUBJECT_ICONS/SUBJECT_THEMES をラップする
 *     形で生成する（重複定義を避ける。既存定数は変更しない）。
 *   - 新資格(kikenbutsu4)は Mia設計(docs/product/2026-06-12-question-bank-expansion.md
 *     2-1章)の科目・カテゴリ構造に基づいて定義する。
 *
 * 次の資格(G検定 g_kentei / 簿記3級 bookkeeping3)を追加する際は、
 *   1. このファイルに ExamSubjectMeta[] を追加する（科目キーは資格名を含めて
 *      一意にする。例: 'g_kentei_ai_overview'）
 *   2. data/questions-<examId>-<subject>.ts を作成し、Question[] を作る
 *      （Question.subject にはこのキーを使う）
 *   3. data/questions.ts の QUESTIONS 配列にスプレッドで追加する
 *   4. data/roles.ts の該当 ExamDefinition.implemented を true にする
 *   の4ステップで完了する（型・ルーティング側の追加変更は不要）。
 */

import { SUBJECT_LABELS, SUBJECT_ICONS, SUBJECT_THEMES } from '../types';
import type { SubjectKey, ProgressStats } from '../types';

export interface ExamSubjectCategory {
  key: string;
  label: string;
}

export interface ExamSubjectMeta {
  /** Question.subject / bySubjectCategory のトップレベルキーと一致させる */
  key: string;
  /** 画面表示名 */
  label: string;
  /** 科目アイコン（emoji） */
  icon: string;
  /** 科目テーマカラー */
  theme: { accent: string; bg: string; dark: string };
  /** この科目に属するカテゴリ一覧（表示順） */
  categories: ExamSubjectCategory[];
}

// ---------------------------------------------------------------------
// CMA — 既存の SUBJECT_LABELS / SUBJECT_ICONS / SUBJECT_THEMES をラップ
// ---------------------------------------------------------------------

const CMA_SUBJECT_KEYS: SubjectKey[] = ['financial_analysis', 'securities_analysis', 'market_economics'];

// CMAのカテゴリ一覧はQUESTIONSから動的に集約するため、ここでは空配列にしておく。
// (CMAの既存画面 /subject/[key].tsx は stats.bySubjectCategory から直接カテゴリを
//  取得しており、EXAM_SUBJECTS[].categories を参照しないため問題ない)
const CMA_SUBJECTS: ExamSubjectMeta[] = CMA_SUBJECT_KEYS.map((key) => ({
  key,
  label: SUBJECT_LABELS[key],
  icon: SUBJECT_ICONS[key],
  theme: SUBJECT_THEMES[key],
  categories: [],
}));

// ---------------------------------------------------------------------
// 危険物取扱者 乙種第4類 (kikenbutsu4)
// 出典: docs/product/2026-06-12-question-bank-expansion.md 2-1章
// ---------------------------------------------------------------------

const KIKENBUTSU4_SUBJECTS: ExamSubjectMeta[] = [
  {
    key: 'kikenbutsu4_law',
    label: '危険物に関する法令',
    icon: '⚖️',
    theme: { accent: '#B45309', bg: '#FFFBEB', dark: '#78350F' },
    categories: [
      { key: '危険物の定義・分類', label: '危険物の定義・分類' },
      { key: '製造所等の区分・許可と届出', label: '製造所等の区分・許可と届出' },
      { key: '位置・構造・設備の基準', label: '位置・構造・設備の基準' },
      { key: '貯蔵・取扱いの基準', label: '貯蔵・取扱いの基準' },
      { key: '運搬・移動の基準', label: '運搬・移動の基準' },
      { key: '危険物取扱者制度・保安体制', label: '危険物取扱者制度・保安体制' },
    ],
  },
  {
    key: 'kikenbutsu4_chemistry_physics',
    label: '基礎的な物理学及び基礎的な化学',
    icon: '🧪',
    theme: { accent: '#0D9488', bg: '#F0FDFA', dark: '#134E4A' },
    categories: [
      { key: '物理基礎', label: '物理基礎（燃焼の三要素・熱・比重・圧力）' },
      { key: '化学基礎', label: '化学基礎（物質の種類・化学反応・酸化還元）' },
      { key: '静電気・電気の基礎', label: '静電気・電気の基礎' },
    ],
  },
  {
    key: 'kikenbutsu4_properties',
    label: '危険物の性質並びにその火災予防及び消火の方法',
    icon: '🔥',
    theme: { accent: '#DC2626', bg: '#FEF2F2', dark: '#7F1D1D' },
    categories: [
      { key: '第4類危険物の共通性質', label: '第4類危険物の共通性質' },
      { key: '品名別の特性', label: '品名別の特性（ガソリン・灯油・軽油・アルコール類等）' },
      { key: '火災予防の方法', label: '火災予防の方法' },
      { key: '消火の方法', label: '消火の方法・消火剤の種類と適用' },
    ],
  },
];

// ---------------------------------------------------------------------
// G検定 (g_kentei)
// 出典: docs/product/2026-06-12-question-bank-expansion.md 2-2章
// ---------------------------------------------------------------------

const G_KENTEI_SUBJECTS: ExamSubjectMeta[] = [
  {
    key: 'gkentei_ai_overview',
    label: 'AIの基礎・歴史',
    icon: '🤖',
    theme: { accent: '#7C3AED', bg: '#F5F3FF', dark: '#4C1D95' },
    categories: [
      { key: 'AIの定義と分類', label: 'AIの定義と分類（強いAI/弱いAI等）' },
      { key: 'AIの歴史', label: 'AIの歴史（探索・知識表現・機械学習の各ブーム）' },
    ],
  },
  {
    key: 'gkentei_machine_learning',
    label: '機械学習の基礎',
    icon: '📈',
    theme: { accent: '#0284C7', bg: '#F0F9FF', dark: '#0C4A6E' },
    categories: [
      { key: '機械学習の種類', label: '機械学習の種類（教師あり/なし・強化学習）' },
      { key: '代表的な手法', label: '代表的な手法（回帰・決定木・SVM・クラスタリング等）' },
      { key: 'モデル評価', label: 'モデル評価（精度・過学習・交差検証）' },
    ],
  },
  {
    key: 'gkentei_deep_learning',
    label: '深層学習の基礎・応用',
    icon: '🧠',
    theme: { accent: '#DB2777', bg: '#FDF2F8', dark: '#831843' },
    categories: [
      { key: 'ニューラルネットワークの基本構造', label: 'ニューラルネットワークの基本構造' },
      { key: 'CNN・画像認識', label: 'CNN・画像認識' },
      { key: 'RNN・自然言語処理・Transformer', label: 'RNN・自然言語処理・Transformer' },
      { key: '深層学習の応用分野', label: '深層学習の応用分野（生成AI・強化学習との組み合わせ等）' },
    ],
  },
  {
    key: 'gkentei_math_stats',
    label: '数理・統計の基礎',
    icon: '📐',
    theme: { accent: '#059669', bg: '#ECFDF5', dark: '#064E3B' },
    categories: [
      { key: '線形代数・微分の基礎', label: '線形代数・微分の基礎' },
      { key: '統計の基礎', label: '統計の基礎（確率分布・検定の考え方）' },
    ],
  },
  {
    key: 'gkentei_law_ethics',
    label: '法律・倫理・社会問題',
    icon: '⚖️',
    theme: { accent: '#B45309', bg: '#FFFBEB', dark: '#78350F' },
    categories: [
      { key: 'AIに関する法律', label: 'AIに関する法律（著作権・個人情報保護法等）' },
      { key: 'AI倫理・ガバナンス', label: 'AI倫理・ガバナンス' },
      { key: 'AIの社会実装・産業応用事例', label: 'AIの社会実装・産業応用事例' },
    ],
  },
];

// ---------------------------------------------------------------------
// 危険物取扱者 甲種 (kikenbutsu_ko)
// 出典: docs/meetings/2026-06-13-1530-question-bank-phase2.md タスク2 IA設計
//   乙4の3科目構造（法令／物理・化学／性質・消火）を踏襲しつつ、
//   対象を「第4類のみ」から「第1類〜第6類全て」に拡張し、
//   物理化学はより専門的な内容（気体の法則・有機化学等）を含める。
// ---------------------------------------------------------------------

const KIKENBUTSU_KO_SUBJECTS: ExamSubjectMeta[] = [
  {
    key: 'kikenko_law',
    label: '危険物に関する法令',
    icon: '⚖️',
    theme: { accent: '#B45309', bg: '#FFFBEB', dark: '#78350F' },
    categories: [
      { key: '危険物の定義・分類', label: '危険物の定義・分類（第1類〜第6類の概要）' },
      { key: '製造所等の区分・許可と届出', label: '製造所等の区分・許可と届出' },
      { key: '位置・構造・設備の基準', label: '位置・構造・設備の基準' },
      { key: '貯蔵・取扱いの基準', label: '貯蔵・取扱いの基準' },
      { key: '運搬・移動の基準', label: '運搬・移動の基準' },
      { key: '危険物取扱者制度・保安体制', label: '危険物取扱者制度・保安体制' },
    ],
  },
  {
    key: 'kikenko_chemistry_physics',
    label: '基礎的な物理学及び基礎的な化学',
    icon: '🧪',
    theme: { accent: '#0D9488', bg: '#F0FDFA', dark: '#134E4A' },
    categories: [
      { key: '物理基礎', label: '物理基礎（燃焼・熱・気体の法則等）' },
      { key: '化学基礎', label: '化学基礎（酸化還元・化学反応式・無機化学）' },
      { key: '物質の状態変化・溶液', label: '物質の状態変化・溶液（有機化学を含む）' },
    ],
  },
  {
    key: 'kikenko_properties',
    label: '危険物の性質並びにその火災予防及び消火の方法',
    icon: '🔥',
    theme: { accent: '#DC2626', bg: '#FEF2F2', dark: '#7F1D1D' },
    categories: [
      { key: '第1類_酸化性固体', label: '第1類（酸化性固体）' },
      { key: '第2類_可燃性固体', label: '第2類（可燃性固体）' },
      { key: '第3類_自然発火性禁水性', label: '第3類（自然発火性・禁水性物質）' },
      { key: '第5類_自己反応性', label: '第5類（自己反応性物質）' },
      { key: '第6類_酸化性液体', label: '第6類（酸化性液体）' },
      { key: '第4類_引火性液体', label: '第4類（引火性液体）' },
    ],
  },
];

// ---------------------------------------------------------------------
// レジストリ本体
// ---------------------------------------------------------------------

export const EXAM_SUBJECTS: Record<string, ExamSubjectMeta[]> = {
  cma: CMA_SUBJECTS,
  kikenbutsu4: KIKENBUTSU4_SUBJECTS,
  g_kentei: G_KENTEI_SUBJECTS,
  kikenbutsu_ko: KIKENBUTSU_KO_SUBJECTS,
};

/** 指定した資格の科目一覧を取得（未登録ならCMAにフォールバック） */
export function getSubjectsForExam(examId: string | undefined): ExamSubjectMeta[] {
  if (examId && EXAM_SUBJECTS[examId]) return EXAM_SUBJECTS[examId];
  return EXAM_SUBJECTS.cma;
}

/** 科目キーからExamSubjectMetaを取得（全資格を横断検索） */
export function getSubjectMeta(subjectKey: string): ExamSubjectMeta | undefined {
  for (const subjects of Object.values(EXAM_SUBJECTS)) {
    const found = subjects.find((s) => s.key === subjectKey);
    if (found) return found;
  }
  return undefined;
}

/**
 * 科目キー(Question.subject)からその科目が属する資格(examId)を逆引きする。
 * Round12論点G: /saved画面の資格別グループ表示のために追加。
 * EXAM_SUBJECTSを1回ループするだけのシンプルな実装。
 */
export function getExamIdForSubject(subjectKey: string): string | undefined {
  for (const [examId, subjects] of Object.entries(EXAM_SUBJECTS)) {
    if (subjects.some((s) => s.key === subjectKey)) return examId;
  }
  return undefined;
}

/**
 * 指定した資格(examId)が対象とする科目のみで進捗を集計する。
 * Round7論点Eでapp/index.tsxに実装したロジックを共有モジュールに抽出（Round8論点B）。
 * app/index.tsx・app/progress/index.tsx・app/progress/[examId].tsx から共通利用する。
 */
export function getExamProgress(bySubjectCategory: ProgressStats['bySubjectCategory'], examId: string) {
  let total = 0;
  let attempted = 0;
  let correct = 0;
  const subjectKeys = getSubjectsForExam(examId).map((s) => s.key);
  for (const subjectKey of subjectKeys) {
    const cats = bySubjectCategory[subjectKey];
    if (!cats) continue;
    for (const c of Object.values(cats)) {
      total += c.total;
      attempted += c.attempted;
      correct += c.correct;
    }
  }
  const pct = total > 0 ? (attempted / total) * 100 : 0;
  return { total, attempted, correct, pct };
}
