import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Question } from '../types';

const LABELS: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

interface Props {
  question: Question;
  onAnswer: (key: 'A' | 'B' | 'C' | 'D') => void;
  onCorrectLabelChange?: (label: 'A' | 'B' | 'C' | 'D') => void;
  disabled?: boolean;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function QuestionCard({ question, onAnswer, onCorrectLabelChange, disabled = false }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  // 「正解が常にAで一番上に来る」位置バイアスを防ぐため、問題ごとに選択肢の
  // 表示順をシャッフルする。表示ラベル（A/B/C/D）は表示位置に基づき常に
  // A→B→C→D の順で固定し、内部の正誤判定（opt.keyとquestion.correctAnswer）とは独立させる。
  const shuffledOptions = useMemo(() => shuffle(question.options), [question.id]);

  useEffect(() => {
    const correctIndex = shuffledOptions.findIndex(opt => opt.key === question.correctAnswer);
    if (correctIndex >= 0) {
      onCorrectLabelChange?.(LABELS[correctIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffledOptions, question.correctAnswer]);

  function handlePress(key: 'A' | 'B' | 'C' | 'D') {
    if (disabled || selected) return;
    setSelected(key);
    onAnswer(key);
  }

  function getOptionStyle(key: string) {
    if (!selected) return styles.option;
    if (key === question.correctAnswer) return [styles.option, styles.correct];
    if (key === selected) return [styles.option, styles.wrong];
    return styles.option;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{question.category}</Text>
      <Text style={styles.content}>{question.content}</Text>
      {shuffledOptions.map((opt, index) => (
        <TouchableOpacity
          key={opt.key}
          style={getOptionStyle(opt.key)}
          onPress={() => handlePress(opt.key)}
          disabled={disabled || !!selected}
        >
          <Text style={styles.optionText}>{LABELS[index]}. {opt.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  category: { fontSize: 12, color: '#888', marginBottom: 8 },
  content: { fontSize: 16, fontWeight: '600', marginBottom: 16, lineHeight: 24 },
  option: {
    padding: 14, marginVertical: 6, borderRadius: 8,
    backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#DDD',
  },
  correct: { backgroundColor: '#D4EDDA', borderColor: '#28A745' },
  wrong: { backgroundColor: '#F8D7DA', borderColor: '#DC3545' },
  optionText: { fontSize: 15 },
});
