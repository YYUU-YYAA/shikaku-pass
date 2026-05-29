import { useState, useCallback } from 'react';
import { getAIExplanation, isApiKeyConfigured } from '../lib/claude';
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
    } catch (e) {
      if (e instanceof Error && e.message === 'API_KEY_NOT_SET') {
        setError('API_KEY_NOT_SET');
      } else {
        setError('通信エラーが発生しました。再試行してください。');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setExplanation(null);
    setError(null);
  }, []);

  return { explanation, isLoading, error, fetchExplanation, reset, isConfigured: isApiKeyConfigured };
}
