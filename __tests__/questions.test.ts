import { QUESTIONS } from '../data/questions';

describe('QUESTIONS data', () => {
  it('has at least 30 questions', () => {
    expect(QUESTIONS.length).toBeGreaterThanOrEqual(30);
  });

  it('every question has 4 options', () => {
    QUESTIONS.forEach(q => {
      expect(q.options).toHaveLength(4);
      expect(q.options.map(o => o.key)).toEqual(['A', 'B', 'C', 'D']);
    });
  });

  it('correctAnswer is always A, B, C, or D', () => {
    QUESTIONS.forEach(q => {
      expect(['A', 'B', 'C', 'D']).toContain(q.correctAnswer);
    });
  });

  it('all IDs are unique', () => {
    const ids = QUESTIONS.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
