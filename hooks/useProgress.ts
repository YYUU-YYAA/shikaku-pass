import { useState, useEffect, useCallback } from 'react';
import { initDatabase, saveAnswer, getAllAnswers } from '../lib/database';
import type { UserAnswer, ProgressStats } from '../types';

export function useProgress() {
  const [stats, setStats] = useState<ProgressStats>({
    totalAnswered: 0,
    totalCorrect: 0,
    accuracyRate: 0,
    byCategory: {},
  });

  const loadStats = useCallback(async () => {
    await initDatabase();
    const answers = await getAllAnswers();
    const byCategory: ProgressStats['byCategory'] = {};

    for (const a of answers) {
      if (!byCategory[a.questionId]) {
        byCategory[a.questionId] = { answered: 0, correct: 0 };
      }
      byCategory[a.questionId].answered += 1;
      if (a.isCorrect) byCategory[a.questionId].correct += 1;
    }

    const totalAnswered = answers.length;
    const totalCorrect = answers.filter(a => a.isCorrect).length;
    setStats({
      totalAnswered,
      totalCorrect,
      accuracyRate: totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0,
      byCategory,
    });
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const recordAnswer = useCallback(async (answer: UserAnswer) => {
    await saveAnswer(answer);
    await loadStats();
  }, [loadStats]);

  return { stats, recordAnswer };
}
