import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuestions } from '../hooks/useQuestions';
import { useProgress } from '../hooks/useProgress';
import { useAIExplanation } from '../hooks/useAIExplanation';
import { QuestionCard } from '../components/QuestionCard';
import { AIExplanation } from '../components/AIExplanation';
import type { Question } from '../types';

const QUIZ_SIZE = 10;

export default function QuizScreen() {
  const { getRandomQuestions } = useQuestions();
  const { recordAnswer } = useProgress();
  const { explanation, isLoading, error, fetchExplanation, reset } = useAIExplanation();

  const [questions] = useState<Question[]>(() => getRandomQuestions(QUIZ_SIZE));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());

  const current = questions[currentIndex];

  async function handleAnswer(key: 'A' | 'B' | 'C' | 'D') {
    const isCorrect = key === current.correctAnswer;
    const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
    setAnswered(true);
    if (isCorrect) setCorrectCount(c => c + 1);
    await recordAnswer({
      questionId: current.id,
      selectedAnswer: key,
      isCorrect,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds: timeSpent,
    });
  }

  function nextQuestion() {
    reset();
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setAnswered(false);
      startTime.current = Date.now();
    }
  }

  if (finished) {
    return (
      <View style={styles.result}>
        <Text style={styles.resultTitle}>結果</Text>
        <Text style={styles.resultScore}>{correctCount} / {QUIZ_SIZE}</Text>
        <Text style={styles.resultRate}>正答率 {Math.round((correctCount / QUIZ_SIZE) * 100)}%</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          setCurrentIndex(0); setAnswered(false); setFinished(false); setCorrectCount(0);
        }}>
          <Text style={styles.buttonText}>もう一度</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.progress}>{currentIndex + 1} / {QUIZ_SIZE}</Text>
      <QuestionCard question={current} onAnswer={handleAnswer} disabled={answered} />
      {answered && (
        <>
          <View style={styles.staticExplanation}>
            <Text style={styles.explanationLabel}>解説</Text>
            <Text style={styles.explanationText}>{current.explanation}</Text>
          </View>
          <AIExplanation
            explanation={explanation}
            isLoading={isLoading}
            error={error}
            onRequest={() => fetchExplanation(current)}
          />
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.buttonText}>次の問題 →</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  progress: { textAlign: 'center', color: '#888', padding: 12, fontSize: 13 },
  staticExplanation: { margin: 16, padding: 14, backgroundColor: '#EEF', borderRadius: 8 },
  explanationLabel: { fontWeight: '700', marginBottom: 6, color: '#1A1A2E' },
  explanationText: { fontSize: 14, lineHeight: 22 },
  nextButton: {
    backgroundColor: '#E94560', margin: 16, padding: 14,
    borderRadius: 8, alignItems: 'center',
  },
  button: {
    backgroundColor: '#1A1A2E', margin: 16, padding: 14,
    borderRadius: 8, alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  result: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  resultTitle: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  resultScore: { fontSize: 48, fontWeight: '900', color: '#E94560' },
  resultRate: { fontSize: 18, color: '#666', marginBottom: 32 },
});
