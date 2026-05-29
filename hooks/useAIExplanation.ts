import { useState, useCallback } from 'react';
import { getAIExplanation } from '../lib/claude';
import type { Question } from '../types';

export function useAIExplanation() {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExplanation = useCallback(async (question: Question) => {
    setIsLoading(true);
    setError(null);
    try {
      const text = await getAIExplanation(
        question.content,
        question.correctAnswer,
        question.explanation,
      );
      setExplanation(text);
    } catch {
      setError('AI解説の取得に失敗しました。通信環境を確認してください。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setExplanation(null);
    setError(null);
  }, []);

  return { explanation, isLoading, error, fetchExplanation, reset };
}
