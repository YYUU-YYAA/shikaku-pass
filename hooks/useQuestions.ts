import { useMemo } from 'react';
import { QUESTIONS } from '../data/questions';
import type { Question, SubjectKey } from '../types';

interface UseQuestionsOptions {
  subject?: SubjectKey | 'all';
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

  return { questions, getRandomQuestions };
}
