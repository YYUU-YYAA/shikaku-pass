import type { UserAnswer, SavedQuestion, SaveType } from '../types';

const ANSWERS_KEY = 'cmapass_answers';
const SAVED_KEY   = 'cmapass_saved';

function loadAnswers(): UserAnswer[] {
  try { return JSON.parse(localStorage.getItem(ANSWERS_KEY) ?? '[]'); } catch { return []; }
}
function storeAnswers(a: UserAnswer[]): void {
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(a));
}

function loadSaved(): SavedQuestion[] {
  try { return JSON.parse(localStorage.getItem(SAVED_KEY) ?? '[]'); } catch { return []; }
}
function storeSaved(s: SavedQuestion[]): void {
  localStorage.setItem(SAVED_KEY, JSON.stringify(s));
}

// ── Answers ──────────────────────────────────────────────────────────────────
export async function initDatabase(): Promise<void> {}

export async function saveAnswer(answer: UserAnswer): Promise<number> {
  const answers = loadAnswers();
  answers.push(answer);
  storeAnswers(answers);
  return answers.length;
}

export async function getAnswersByQuestionId(questionId: string): Promise<UserAnswer[]> {
  return loadAnswers().filter(a => a.questionId === questionId);
}

export async function getAllAnswers(): Promise<UserAnswer[]> {
  return [...loadAnswers()].reverse();
}

// ── Saved questions ───────────────────────────────────────────────────────────
export async function getSavedQuestions(): Promise<SavedQuestion[]> {
  return loadSaved();
}

export async function saveQuestion(questionId: string, type: SaveType): Promise<void> {
  const saved = loadSaved().filter(s => !(s.questionId === questionId && s.type === type));
  saved.push({ questionId, type, savedAt: new Date().toISOString() });
  storeSaved(saved);
}

export async function removeSavedQuestion(questionId: string, type: SaveType): Promise<void> {
  storeSaved(loadSaved().filter(s => !(s.questionId === questionId && s.type === type)));
}
