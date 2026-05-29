import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { Question } from '../types';

interface Props {
  question: Question;
  onAnswer: (key: 'A' | 'B' | 'C' | 'D') => void;
  disabled?: boolean;
}

export function QuestionCard({ question, onAnswer, disabled = false }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

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
      {question.options.map(opt => (
        <TouchableOpacity
          key={opt.key}
          style={getOptionStyle(opt.key)}
          onPress={() => handlePress(opt.key)}
          disabled={disabled || !!selected}
        >
          <Text style={styles.optionText}>{opt.key}. {opt.text}</Text>
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
