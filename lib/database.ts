import * as SQLite from 'expo-sqlite';
import type { UserAnswer } from '../types';

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
  `);
}

function getDb(): SQLite.SQLiteDatabase {
  if (!db) throw new Error('Database not initialized. Call initDatabase() first.');
  return db;
}

export async function saveAnswer(answer: UserAnswer): Promise<number> {
  const result = await getDb().runAsync(
    `INSERT INTO user_answers
      (question_id, selected_answer, is_correct, answered_at, time_spent_seconds)
     VALUES (?, ?, ?, ?, ?)`,
    answer.questionId,
    answer.selectedAnswer,
    answer.isCorrect ? 1 : 0,
    answer.answeredAt,
    answer.timeSpentSeconds,
  );
  return result.lastInsertRowId;
}

export async function getAnswersByQuestionId(questionId: string): Promise<UserAnswer[]> {
  const rows = await getDb().getAllAsync<{
    question_id: string;
    selected_answer: string;
    is_correct: number;
    answered_at: string;
    time_spent_seconds: number;
  }>('SELECT * FROM user_answers WHERE question_id = ?', questionId);

  return rows.map(row => ({
    questionId: row.question_id,
    selectedAnswer: row.selected_answer as UserAnswer['selectedAnswer'],
    isCorrect: row.is_correct === 1,
    answeredAt: row.answered_at,
    timeSpentSeconds: row.time_spent_seconds,
  }));
}

export async function getAllAnswers(): Promise<UserAnswer[]> {
  const rows = await getDb().getAllAsync<{
    question_id: string;
    selected_answer: string;
    is_correct: number;
    answered_at: string;
    time_spent_seconds: number;
  }>('SELECT * FROM user_answers ORDER BY answered_at DESC');

  return rows.map(row => ({
    questionId: row.question_id,
    selectedAnswer: row.selected_answer as UserAnswer['selectedAnswer'],
    isCorrect: row.is_correct === 1,
    answeredAt: row.answered_at,
    timeSpentSeconds: row.time_spent_seconds,
  }));
}
