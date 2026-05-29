import type { UserAnswer } from '../types';

const STORAGE_KEY = 'cmapass_answers';

function loadAnswers(): UserAnswer[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function saveAnswers(answers: UserAnswer[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
}

export async function initDatabase(): Promise<void> {
  // no-op on web; localStorage needs no setup
}

export async function saveAnswer(answer: UserAnswer): Promise<number> {
  const answers = loadAnswers();
  answers.push(answer);
  saveAnswers(answers);
  return answers.length;
}

export async function getAnswersByQuestionId(questionId: string): Promise<UserAnswer[]> {
  return loadAnswers().filter(a => a.questionId === questionId);
}

export async function getAllAnswers(): Promise<UserAnswer[]> {
  return [...loadAnswers()].reverse();
}
