import { useState, useEffect, useCallback } from 'react';
import {
  initDatabase,
  getSavedQuestions as dbGet,
  saveQuestion as dbSave,
  removeSavedQuestion as dbRemove,
} from '../lib/database';
import type { SavedQuestion, SaveType } from '../types';

export function useSavedQuestions() {
  const [saved, setSaved] = useState<SavedQuestion[]>([]);

  const load = useCallback(async () => {
    await initDatabase();
    setSaved(await dbGet());
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveQuestion = useCallback(async (questionId: string, type: SaveType) => {
    await dbSave(questionId, type);
    await load();
  }, [load]);

  const removeQuestion = useCallback(async (questionId: string, type: SaveType) => {
    await dbRemove(questionId, type);
    await load();
  }, [load]);

  const isSaved = useCallback((questionId: string, type: SaveType) =>
    saved.some(s => s.questionId === questionId && s.type === type),
  [saved]);

  const byType = useCallback((type: SaveType) =>
    saved.filter(s => s.type === type),
  [saved]);

  return { saved, saveQuestion, removeQuestion, isSaved, byType };
}
