import type { Question, UserAnswer, ProgressStats } from '../types';

describe('types', () => {
  it('Question has required fields', () => {
    const q: Question = {
      id: 'q1',
      subject: 'financial_statements',
      category: '流動性比率',
      content: '流動比率を計算せよ',
      options: [
        { key: 'A', text: '100%' },
        { key: 'B', text: '150%' },
        { key: 'C', text: '200%' },
        { key: 'D', text: '250%' },
      ],
      correctAnswer: 'C',
      explanation: '流動比率 = 流動資産 ÷ 流動負債 × 100',
      difficulty: 1,
    };
    expect(q.id).toBe('q1');
    expect(q.options).toHaveLength(4);
  });
});
