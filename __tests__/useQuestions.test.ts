import { renderHook } from '@testing-library/react-native';
import { useQuestions } from '../hooks/useQuestions';

describe('useQuestions', () => {
  it('returns all questions when no filter', () => {
    const { result } = renderHook(() => useQuestions());
    expect(result.current.questions.length).toBeGreaterThan(0);
  });

  it('filters by category', () => {
    const { result } = renderHook(() => useQuestions({ category: '流動性比率' }));
    result.current.questions.forEach(q => {
      expect(q.category).toBe('流動性比率');
    });
  });

  it('getRandomQuestions returns correct count', () => {
    const { result } = renderHook(() => useQuestions());
    const random = result.current.getRandomQuestions(5);
    expect(random).toHaveLength(5);
  });
});
