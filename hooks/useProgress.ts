import { useState, useEffect, useCallback } from 'react';
import { initDatabase, saveAnswer, getAllAnswers, getSavedQuestions } from '../lib/database';
import { computeProgressStats, EMPTY_PROGRESS_STATS } from '../lib/progressStats';
import type { UserAnswer, ProgressStats } from '../types';

export function useProgress() {
  const [stats, setStats] = useState<ProgressStats>(EMPTY_PROGRESS_STATS);
  const [loaded, setLoaded] = useState(false);

  const loadStats = useCallback(async () => {
    await initDatabase();
    const [answers, savedQuestions] = await Promise.all([getAllAnswers(), getSavedQuestions()]);
    setStats(computeProgressStats(answers, savedQuestions));
    setLoaded(true);
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const recordAnswer = useCallback(async (answer: UserAnswer) => {
    await saveAnswer(answer);
    await loadStats();
  }, [loadStats]);

  return { stats, recordAnswer, reload: loadStats, loaded };
}
