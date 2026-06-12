import { useState, useEffect, useCallback } from 'react';
import { initDatabase, saveAnswer, getAllAnswers, getSavedQuestions } from '../lib/database';
import { QUESTIONS } from '../data/questions';
import type { UserAnswer, ProgressStats, SubjectKey, CategoryStat } from '../types';

// Build subject→category→total lookup once at module load (static data)
const SUBJECT_CATEGORY_TOTALS: Record<string, Record<string, number>> = {};
const QUESTION_MAP = new Map(QUESTIONS.map(q => [q.id, q]));
for (const q of QUESTIONS) {
  if (!SUBJECT_CATEGORY_TOTALS[q.subject]) SUBJECT_CATEGORY_TOTALS[q.subject] = {};
  SUBJECT_CATEGORY_TOTALS[q.subject][q.category] =
    (SUBJECT_CATEGORY_TOTALS[q.subject][q.category] ?? 0) + 1;
}

function computeStreak(answers: UserAnswer[]): { streak: number; lastStudyDate: string } {
  if (answers.length === 0) return { streak: 0, lastStudyDate: '' };
  const days = new Set(answers.map(a => a.answeredAt.slice(0, 10)));
  const sorted = Array.from(days).sort().reverse();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const lastStudyDate = sorted[0];
  if (lastStudyDate !== today && lastStudyDate !== yesterday) {
    return { streak: 0, lastStudyDate };
  }
  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const diff = Math.round(
      (new Date(sorted[i - 1]).getTime() - new Date(sorted[i]).getTime()) / 86_400_000,
    );
    if (diff === 1) streak++;
    else break;
  }
  return { streak, lastStudyDate };
}

const EMPTY_STATS: ProgressStats = {
  totalAnswered: 0,
  totalCorrect: 0,
  accuracyRate: 0,
  byCategory: {},
  bySubjectCategory: {
    financial_analysis: {},
    securities_analysis: {},
    market_economics: {},
  },
  weakQuestionIds: [],
  correctQuestionIds: [],
  streak: 0,
  lastStudyDate: '',
  savedQuestions: [],
};

export function useProgress() {
  const [stats, setStats] = useState<ProgressStats>(EMPTY_STATS);
  const [loaded, setLoaded] = useState(false);

  const loadStats = useCallback(async () => {
    await initDatabase();
    const [answers, savedQuestions] = await Promise.all([getAllAnswers(), getSavedQuestions()]);

    // Latest answer per question
    const latestByQuestion = new Map<string, { isCorrect: boolean; answeredAt: string }>();
    for (const a of answers) {
      const ex = latestByQuestion.get(a.questionId);
      if (!ex || a.answeredAt > ex.answeredAt) {
        latestByQuestion.set(a.questionId, { isCorrect: a.isCorrect, answeredAt: a.answeredAt });
      }
    }

    // Weak / correct questions (by latest answer)
    const weakQuestionIds: string[] = [];
    const correctQuestionIds: string[] = [];
    latestByQuestion.forEach((latest, qId) => {
      if (latest.isCorrect) correctQuestionIds.push(qId);
      else weakQuestionIds.push(qId);
    });

    // Legacy byCategory (per questionId)
    const byCategory: ProgressStats['byCategory'] = {};
    for (const a of answers) {
      if (!byCategory[a.questionId]) byCategory[a.questionId] = { answered: 0, correct: 0 };
      byCategory[a.questionId].answered++;
      if (a.isCorrect) byCategory[a.questionId].correct++;
    }

    // Subject→category stats
    const bySubjectCategory: ProgressStats['bySubjectCategory'] = {
      financial_analysis: {},
      securities_analysis: {},
      market_economics: {},
    };
    for (const [subject, cats] of Object.entries(SUBJECT_CATEGORY_TOTALS)) {
      for (const [cat, total] of Object.entries(cats)) {
        bySubjectCategory[subject as SubjectKey][cat] = { total, attempted: 0, correct: 0 };
      }
    }
    for (const [qId, latest] of latestByQuestion) {
      const q = QUESTION_MAP.get(qId);
      if (!q) continue;
      const stat = bySubjectCategory[q.subject]?.[q.category];
      if (!stat) continue;
      stat.attempted++;
      if (latest.isCorrect) stat.correct++;
    }

    const { streak, lastStudyDate } = computeStreak(answers);

    setStats({
      totalAnswered: answers.length,
      totalCorrect: answers.filter(a => a.isCorrect).length,
      accuracyRate: answers.length > 0
        ? Math.round((answers.filter(a => a.isCorrect).length / answers.length) * 100) : 0,
      byCategory,
      bySubjectCategory,
      weakQuestionIds,
      correctQuestionIds,
      streak,
      lastStudyDate,
      savedQuestions,
    });
    setLoaded(true);
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const recordAnswer = useCallback(async (answer: UserAnswer) => {
    await saveAnswer(answer);
    await loadStats();
  }, [loadStats]);

  return { stats, recordAnswer, reload: loadStats, loaded };
}
