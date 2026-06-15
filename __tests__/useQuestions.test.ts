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

  describe('getLeastRecentQuestions（一通り出題してから2周目へ）', () => {
    it('未解答の問題を優先して出題する', () => {
      const { result } = renderHook(() => useQuestions({ category: '流動性比率' }));
      const total = result.current.questions.length;
      expect(total).toBeGreaterThan(1);

      // 1問だけ「最近解答済み」にする
      const answered = result.current.questions[0];
      const lastAnsweredAt = { [answered.id]: '2026-06-14T00:00:00.000Z' };

      const picked = result.current.getLeastRecentQuestions(total - 1, lastAnsweredAt);

      expect(picked).toHaveLength(total - 1);
      expect(picked.some(q => q.id === answered.id)).toBe(false);
    });

    it('全問が同じ優先度なら指定件数を返す（重複なし）', () => {
      const { result } = renderHook(() => useQuestions({ category: '流動性比率' }));
      const total = result.current.questions.length;
      const picked = result.current.getLeastRecentQuestions(total, {});
      expect(picked).toHaveLength(total);
      expect(new Set(picked.map(q => q.id)).size).toBe(total);
    });

    it('全問解答済みなら、最も古く解答した問題から出題する（2周目）', () => {
      const { result } = renderHook(() => useQuestions({ category: '流動性比率' }));
      const total = result.current.questions.length;
      expect(total).toBeGreaterThanOrEqual(2);

      const [oldest, ...rest] = result.current.questions;
      const lastAnsweredAt: Record<string, string> = { [oldest.id]: '2026-06-13T00:00:00.000Z' };
      rest.forEach((q, i) => {
        lastAnsweredAt[q.id] = `2026-06-14T00:0${i}:00.000Z`;
      });

      const [picked] = result.current.getLeastRecentQuestions(1, lastAnsweredAt);
      expect(picked.id).toBe(oldest.id);
    });
  });
});
