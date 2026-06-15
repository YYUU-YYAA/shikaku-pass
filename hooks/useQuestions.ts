import { useMemo } from 'react';
import { QUESTIONS } from '../data/questions';
import type { Question } from '../types';

interface UseQuestionsOptions {
  subject?: string | 'all';
  category?: string;
  difficulty?: 1 | 2 | 3;
}

export function useQuestions(options: UseQuestionsOptions = {}) {
  const questions = useMemo(() => {
    let filtered = QUESTIONS;
    if (options.subject && options.subject !== 'all') {
      filtered = filtered.filter(q => q.subject === options.subject);
    }
    if (options.category) {
      filtered = filtered.filter(q => q.category === options.category);
    }
    if (options.difficulty) {
      filtered = filtered.filter(q => q.difficulty === options.difficulty);
    }
    return filtered;
  }, [options.subject, options.category, options.difficulty]);

  function getRandomQuestions(count: number): Question[] {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  /**
   * 「一通り出題してから2周目・3周目に進む」ための出題順。
   * 最後に解答した日時が古い（＝未解答を含む）問題ほど先に出題されるよう並べ、
   * 同じ優先度の問題同士はランダムな順序にする。
   */
  function getLeastRecentQuestions(count: number, lastAnsweredAt: Record<string, string>): Question[] {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const sorted = shuffled.sort((a, b) => {
      const aTime = lastAnsweredAt[a.id] ?? '';
      const bTime = lastAnsweredAt[b.id] ?? '';
      return aTime < bTime ? -1 : aTime > bTime ? 1 : 0;
    });
    return sorted.slice(0, Math.min(count, sorted.length));
  }

  return { questions, getRandomQuestions, getLeastRecentQuestions };
}
