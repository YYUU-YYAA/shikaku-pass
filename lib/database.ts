import * as SQLite from 'expo-sqlite';
import type { UserAnswer, SavedQuestion, SaveType } from '../types';

let db: SQLite.SQLiteDatabase | null = null;

export async function initDatabase(): Promise<void> {
  db = await SQLite.openDatabaseAsync('cmapass.db');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS user_answers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id TEXT NOT NULL,
      selected_answer TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      answered_at TEXT NOT NULL,
      time_spent_seconds INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS saved_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question_id TEXT NOT NULL,
      type TEXT NOT NULL,
      saved_at TEXT NOT NULL,
      UNIQUE(question_id, type)
    );
  `);
}

function getDb(): SQLite.SQLiteDatabase {
  if (!db) throw new Error('Database not initialized.');
  return db;
}

// ── Answers ──────────────────────────────────────────────────────────────────
export async function saveAnswer(answer: UserAnswer): Promise<number> {
  const result = await getDb().runAsync(
    `INSERT INTO user_answers (question_id, selected_answer, is_correct, answered_at, time_spent_seconds)
     VALUES (?, ?, ?, ?, ?)`,
    answer.questionId, answer.selectedAnswer,
    answer.isCorrect ? 1 : 0, answer.answeredAt, answer.timeSpentSeconds,
  );
  return result.lastInsertRowId;
}

export async function getAnswersByQuestionId(questionId: string): Promise<UserAnswer[]> {
  const rows = await getDb().getAllAsync<{
    question_id: string; selected_answer: string;
    is_correct: number; answered_at: string; time_spent_seconds: number;
  }>('SELECT * FROM user_answers WHERE question_id = ?', questionId);
  return rows.map(r => ({
    questionId: r.question_id,
    selectedAnswer: r.selected_answer as UserAnswer['selectedAnswer'],
    isCorrect: r.is_correct === 1,
    answeredAt: r.answered_at,
    timeSpentSeconds: r.time_spent_seconds,
  }));
}

export async function getAllAnswers(): Promise<UserAnswer[]> {
  const rows = await getDb().getAllAsync<{
    question_id: string; selected_answer: string;
    is_correct: number; answered_at: string; time_spent_seconds: number;
  }>('SELECT * FROM user_answers ORDER BY answered_at DESC');
  return rows.map(r => ({
    questionId: r.question_id,
    selectedAnswer: r.selected_answer as UserAnswer['selectedAnswer'],
    isCorrect: r.is_correct === 1,
    answeredAt: r.answered_at,
    timeSpentSeconds: r.time_spent_seconds,
  }));
}

// ── Saved questions ───────────────────────────────────────────────────────────
export async function getSavedQuestions(): Promise<SavedQuestion[]> {
  const rows = await getDb().getAllAsync<{
    question_id: string; type: string; saved_at: string;
  }>('SELECT question_id, type, saved_at FROM saved_questions ORDER BY saved_at DESC');
  return rows.map(r => ({
    questionId: r.question_id,
    type: r.type as SaveType,
    savedAt: r.saved_at,
  }));
}

export async function saveQuestion(questionId: string, type: SaveType): Promise<void> {
  await getDb().runAsync(
    `INSERT OR REPLACE INTO saved_questions (question_id, type, saved_at) VALUES (?, ?, ?)`,
    questionId, type, new Date().toISOString(),
  );
}

export async function removeSavedQuestion(questionId: string, type: SaveType): Promise<void> {
  await getDb().runAsync(
    'DELETE FROM saved_questions WHERE question_id = ? AND type = ?',
    questionId, type,
  );
}
