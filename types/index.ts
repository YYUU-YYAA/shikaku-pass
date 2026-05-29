export interface AnswerOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: string;
  subject: 'financial_statements';
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

export interface ProgressStats {
  totalAnswered: number;
  totalCorrect: number;
  accuracyRate: number; // 0-100
  byCategory: Record<string, { answered: number; correct: number }>;
  weakQuestionIds: string[]; // 最新回答が不正解だった問題ID
}
