export interface AnswerOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export type SubjectKey = 'financial_analysis' | 'securities_analysis' | 'market_economics';

export const SUBJECT_LABELS: Record<SubjectKey, string> = {
  financial_analysis:  '財務分析',
  securities_analysis: '証券分析・ポートフォリオ',
  market_economics:    '市場と経済',
};

export const SUBJECT_ICONS: Record<SubjectKey, string> = {
  financial_analysis:  '📊',
  securities_analysis: '📈',
  market_economics:    '🌏',
};

export const SUBJECT_THEMES: Record<SubjectKey, { accent: string; bg: string; dark: string }> = {
  financial_analysis:  { accent: '#E94560', bg: '#FFF0F3', dark: '#7F1D2F' },
  securities_analysis: { accent: '#6D28D9', bg: '#F5F3FF', dark: '#3B1481' },
  market_economics:    { accent: '#0369A1', bg: '#F0F9FF', dark: '#0C4A6E' },
};

export interface Question {
  id: string;
  /**
   * 科目キー。CMAは SubjectKey の3キー固定union（互換性のため）、
   * 他資格は資格名を含む一意な文字列（例: 'kikenbutsu4_law'）。
   * bySubjectCategory はこのキーをそのままトップレベルキーとして使うため、
   * 資格をまたいでもキーが衝突しない設計になっている。
   */
  subject: string;
  category: string;
  content: string;
  options: AnswerOption[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 1 | 2 | 3;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
  answeredAt: string; // ISO 8601
  timeSpentSeconds: number;
}

export type SaveType = 'memo' | 'retry';

export interface SavedQuestion {
  questionId: string;
  type: SaveType;
  savedAt: string;
}

export interface CategoryStat {
  total: number;
  attempted: number;
  correct: number;
}

export interface ProgressStats {
  totalAnswered: number;
  totalCorrect: number;
  accuracyRate: number;
  byCategory: Record<string, { answered: number; correct: number }>;
  /**
   * 科目キー(string) → カテゴリ名 → 統計。
   * 資格非依存。CMAの3キーも他資格のキーもこのRecordにフラットに乗る。
   */
  bySubjectCategory: Record<string, Record<string, CategoryStat>>;
  weakQuestionIds: string[];
  correctQuestionIds: string[];
  streak: number;
  lastStudyDate: string;
  savedQuestions: SavedQuestion[];
  /** 問題ID → 最新の解答日時（ISO文字列）。未解答の問題はキーが存在しない。 */
  lastAnsweredAtByQuestionId: Record<string, string>;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  reading: string;
  /**
   * Round16-B: CMAの3科目キー(SubjectKey)に加え、G検定・危険物等の
   * 資格別科目キー(data/examSubjects.tsのExamSubjectMeta.key)も許容する。
   * getExamIdForSubject(subjectKey: string)による資格別グルーピングのため string を許容する。
   */
  subject: SubjectKey | string;
  category: string;
  definition: string;
}
