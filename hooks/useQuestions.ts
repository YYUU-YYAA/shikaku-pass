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
   * 優先度は 未解答 → 不正解（苦手） → 正解済み の3段階。
   * 未解答が残っている間は解答済みの問題を出さず、不正解の問題が残っている間は
   * 正解済みの問題を出さない。各段階内はランダム順（不正解・正解は解答日時が
   * 古いものを先に）にする。
   */
  function getLeastRecentQuestions(
    count: number,
    lastAnsweredAt: Record<string, string>,
    weakQuestionIds: string[] = [],
  ): Question[] {
    const weakSet = new Set(weakQuestionIds);
    const shuffled = [...questions].sort(() => Math.random() - 0.5);

    const byRecency = (a: Question, b: Question) => {
      const aTime = lastAnsweredAt[a.id] ?? '';
      const bTime = lastAnsweredAt[b.id] ?? '';
      return aTime < bTime ? -1 : aTime > bTime ? 1 : 0;
    };

    const unanswered: Question[] = [];
    const incorrect: Question[] = [];
    const correct: Question[] = [];
    for (const q of shuffled) {
      if (!(q.id in lastAnsweredAt)) unanswered.push(q);
      else if (weakSet.has(q.id)) incorrect.push(q);
      else correct.push(q);
    }
    incorrect.sort(byRecency);
    correct.sort(byRecency);

    const ordered = [...unanswered, ...incorrect, ...correct];
    return ordered.slice(0, Math.min(count, ordered.length));
  }

  return { questions, getRandomQuestions, getLeastRecentQuestions };
}
