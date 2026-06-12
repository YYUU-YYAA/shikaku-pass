import { renderHook, act } from '@testing-library/react-native';
import { useProgress } from '../hooks/useProgress';

jest.mock('../lib/database', () => ({
  initDatabase: jest.fn().mockResolvedValue(undefined),
  saveAnswer: jest.fn().mockResolvedValue(1),
  getAllAnswers: jest.fn().mockResolvedValue([
    { questionId: 'fs-001', selectedAnswer: 'C', isCorrect: true, answeredAt: '2026-05-01', timeSpentSeconds: 10 },
    { questionId: 'fs-002', selectedAnswer: 'A', isCorrect: false, answeredAt: '2026-05-01', timeSpentSeconds: 20 },
  ]),
  getSavedQuestions: jest.fn().mockResolvedValue([]),
}));

describe('useProgress', () => {
  it('calculates accuracy correctly', async () => {
    const { result } = renderHook(() => useProgress());
    await act(async () => { await new Promise(r => setTimeout(r, 0)); });
    expect(result.current.stats.totalAnswered).toBe(2);
    expect(result.current.stats.totalCorrect).toBe(1);
    expect(result.current.stats.accuracyRate).toBe(50);
  });
});
