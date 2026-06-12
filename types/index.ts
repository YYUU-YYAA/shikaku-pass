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
  subject: SubjectKey;
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
  bySubjectCategory: Record<SubjectKey, Record<string, CategoryStat>>;
  weakQuestionIds: string[];
  correctQuestionIds: string[];
  streak: number;
  lastStudyDate: string;
  savedQuestions: SavedQuestion[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  reading: string;
  subject: SubjectKey;
  category: string;
  definition: string;
}
