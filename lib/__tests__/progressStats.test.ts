import { computeProgressStats } from '../progressStats';
import type { UserAnswer } from '../../types';

const SUBJECT = 'gkentei_law_ethics';
const CATEGORY = 'AIに関する法律'; // 21問

function answer(questionId: string, isCorrect: boolean, answeredAt: string): UserAnswer {
  return {
    questionId,
    selectedAnswer: isCorrect ? 'A' : 'B',
    isCorrect,
    answeredAt,
    timeSpentSeconds: 10,
  };
}

describe('computeProgressStats — 進捗(attempted)と正答率(correct/attempted)', () => {
  it('正解2問・不正解3問を解答した場合、attempted=5・correct=2・total=21になる', () => {
    // オーナーのスクリーンショット再現:
    // AIに関する法律(21問)から5問を解答（各questionId一意・再挑戦なし）
    // 2問正解 / 3問不正解
    const answers: UserAnswer[] = [
      answer('gkentei-le-001', true,  '2026-06-13T10:00:00.000Z'),
      answer('gkentei-le-002', true,  '2026-06-13T10:01:00.000Z'),
      answer('gkentei-le-003', false, '2026-06-13T10:02:00.000Z'),
      answer('gkentei-le-004', false, '2026-06-13T10:03:00.000Z'),
      answer('gkentei-le-013', false, '2026-06-13T10:04:00.000Z'),
    ];

    const result = computeProgressStats(answers, []);
    const stat = result.bySubjectCategory[SUBJECT][CATEGORY];

    expect(stat).toEqual({ total: 21, attempted: 5, correct: 2 });
  });

  it('不正解のみ解答した場合でもattemptedはカウントされ、correctは0になる（進捗は正誤に関わらず進む）', () => {
    const answers: UserAnswer[] = [
      answer('gkentei-le-001', false, '2026-06-13T10:00:00.000Z'),
      answer('gkentei-le-002', false, '2026-06-13T10:01:00.000Z'),
    ];

    const result = computeProgressStats(answers, []);
    const stat = result.bySubjectCategory[SUBJECT][CATEGORY];

    expect(stat).toEqual({ total: 21, attempted: 2, correct: 0 });
  });

  it('同じ問題に複数回解答した場合、attemptedはdistinct question数（最新解答で正誤を判定）', () => {
    const answers: UserAnswer[] = [
      // gkentei-le-001: 1回目不正解 → 2回目正解（最新が正解）
      answer('gkentei-le-001', false, '2026-06-13T10:00:00.000Z'),
      answer('gkentei-le-001', true,  '2026-06-13T10:05:00.000Z'),
      // gkentei-le-002: 1回のみ不正解
      answer('gkentei-le-002', false, '2026-06-13T10:01:00.000Z'),
    ];

    const result = computeProgressStats(answers, []);
    const stat = result.bySubjectCategory[SUBJECT][CATEGORY];

    // distinct問題数=2、最新解答で正解1・不正解1
    expect(stat).toEqual({ total: 21, attempted: 2, correct: 1 });
  });
});

describe('computeProgressStats — lastAnsweredAtByQuestionId（出題の周回管理用）', () => {
  it('問題ごとに最新の解答日時を記録する', () => {
    const answers: UserAnswer[] = [
      answer('gkentei-le-001', false, '2026-06-13T10:00:00.000Z'),
      answer('gkentei-le-001', true,  '2026-06-13T10:05:00.000Z'),
      answer('gkentei-le-002', false, '2026-06-13T10:01:00.000Z'),
    ];

    const result = computeProgressStats(answers, []);

    expect(result.lastAnsweredAtByQuestionId).toEqual({
      'gkentei-le-001': '2026-06-13T10:05:00.000Z',
      'gkentei-le-002': '2026-06-13T10:01:00.000Z',
    });
  });

  it('未解答の問題はキーが存在しない', () => {
    const result = computeProgressStats([], []);
    expect(result.lastAnsweredAtByQuestionId).toEqual({});
  });
});
