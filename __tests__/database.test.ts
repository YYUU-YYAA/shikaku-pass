import { initDatabase, saveAnswer, getAnswersByQuestionId, getAllAnswers } from '../lib/database';

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn().mockResolvedValue({
    execAsync: jest.fn(),
    runAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1 }),
    getAllAsync: jest.fn().mockResolvedValue([]),
    getFirstAsync: jest.fn().mockResolvedValue(null),
  }),
}));

describe('database', () => {
  it('initDatabase resolves without error', async () => {
    await expect(initDatabase()).resolves.not.toThrow();
  });

  it('saveAnswer returns an id', async () => {
    await initDatabase();
    const id = await saveAnswer({
      questionId: 'fs-001',
      selectedAnswer: 'C',
      isCorrect: true,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds: 15,
    });
    expect(id).toBe(1);
  });
});
