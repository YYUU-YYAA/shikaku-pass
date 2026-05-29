import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuestions } from '../hooks/useQuestions';
import { useProgress } from '../hooks/useProgress';
import { useAIExplanation } from '../hooks/useAIExplanation';
import { QuestionCard } from '../components/QuestionCard';
import { AIExplanation } from '../components/AIExplanation';
import { QUESTIONS } from '../data/questions';
import type { Question } from '../types';

const QUIZ_SIZE = 10;
const REVIEW_MAX = 20;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const router = useRouter();
  const isReviewMode = mode === 'review';

  const { getRandomQuestions } = useQuestions();
  const { stats, recordAnswer } = useProgress();
  const { explanation, isLoading, error, fetchExplanation, reset, isConfigured } = useAIExplanation();

  // 復習モードは stats.weakQuestionIds が揃ってから初期化
  const [questions, setQuestions] = useState<Question[] | null>(
    isReviewMode ? null : shuffle(getRandomQuestions(QUIZ_SIZE)),
  );
  const [initialized, setInitialized] = useState(!isReviewMode);

  useEffect(() => {
    if (!isReviewMode || initialized) return;
    if (stats.totalAnswered === 0 && stats.weakQuestionIds.length === 0) return; // まだロード中
    const weak = QUESTIONS.filter(q => stats.weakQuestionIds.includes(q.id));
    setQuestions(shuffle(weak).slice(0, REVIEW_MAX));
    setInitialized(true);
  }, [isReviewMode, initialized, stats.weakQuestionIds, stats.totalAnswered]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const startTime = useRef(Date.now());

  // ロード中
  if (!initialized || questions === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E94560" />
        <Text style={styles.loadingText}>苦手問題を読み込み中...</Text>
      </View>
    );
  }

  // 苦手問題が0件
  if (questions.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyIcon}>🎉</Text>
        <Text style={styles.emptyTitle}>苦手問題はありません！</Text>
        <Text style={styles.emptyText}>すべての問題に正解しています。</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>戻る</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const total = questions.length;
  const current = questions[currentIndex];

  async function handleAnswer(key: 'A' | 'B' | 'C' | 'D') {
    const correct = key === current.correctAnswer;
    const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
    setAnswered(true);
    setIsCorrect(correct);
    setSelectedKey(key);
    if (correct) setCorrectCount(c => c + 1);
    await recordAnswer({
      questionId: current.id,
      selectedAnswer: key,
      isCorrect: correct,
      answeredAt: new Date().toISOString(),
      timeSpentSeconds: timeSpent,
    });
  }

  function nextQuestion() {
    reset();
    if (currentIndex + 1 >= total) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
      setAnswered(false);
      setIsCorrect(false);
      setSelectedKey(null);
      startTime.current = Date.now();
    }
  }

  // 結果画面
  if (finished) {
    const rate = Math.round((correctCount / total) * 100);
    return (
      <View style={styles.result}>
        <Text style={styles.resultTitle}>
          {isReviewMode ? '復習完了！' : '演習完了！'}
        </Text>
        <Text style={styles.resultScore}>{correctCount} / {total}</Text>
        <Text style={styles.resultRate}>正答率 {rate}%</Text>
        {rate === 100 && (
          <Text style={styles.perfectText}>完璧です！</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={() => {
          setCurrentIndex(0);
          setAnswered(false);
          setIsCorrect(false);
          setSelectedKey(null);
          setFinished(false);
          setCorrectCount(0);
          reset();
          setQuestions(isReviewMode
            ? shuffle(QUESTIONS.filter(q => stats.weakQuestionIds.includes(q.id))).slice(0, REVIEW_MAX)
            : shuffle(getRandomQuestions(QUIZ_SIZE)));
        }}>
          <Text style={styles.buttonText}>もう一度</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>戻る</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 進捗バー */}
      <View style={styles.progressRow}>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {total}
          {isReviewMode ? '（苦手問題）' : ''}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${((currentIndex) / total) * 100}%` as any }]} />
        </View>
      </View>

      {/* 問題カード */}
      <QuestionCard
        key={current.id}
        question={current}
        onAnswer={handleAnswer}
        disabled={answered}
      />

      {/* 正解/不正解バナー */}
      {answered && (
        <>
          <View style={[styles.resultBanner, isCorrect ? styles.correctBanner : styles.wrongBanner]}>
            <Text style={styles.resultBannerText}>
              {isCorrect ? '🎉 正解！' : `❌ 不正解　正解：${current.correctAnswer}`}
            </Text>
          </View>

          {/* 解説 + AI解説 */}
          <AIExplanation
            staticExplanation={current.explanation}
            aiExplanation={explanation}
            isLoading={isLoading}
            error={error}
            isConfigured={isConfigured}
            onRequest={() => fetchExplanation(current)}
          />

          {/* 次へボタン */}
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentIndex + 1 >= total ? '結果を見る' : '次の問題 →'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  loadingText: { marginTop: 12, color: '#666', fontSize: 14 },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  emptyText: { fontSize: 14, color: '#666', marginBottom: 32 },

  progressRow: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 },
  progressText: { fontSize: 12, color: '#888', marginBottom: 6 },
  progressBar: { height: 4, backgroundColor: '#EEE', borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: '#E94560', borderRadius: 2 },

  resultBanner: {
    marginHorizontal: 16, marginTop: 8, marginBottom: 4,
    padding: 14, borderRadius: 8, alignItems: 'center',
  },
  correctBanner: { backgroundColor: '#D4EDDA' },
  wrongBanner: { backgroundColor: '#F8D7DA' },
  resultBannerText: { fontSize: 16, fontWeight: '700', color: '#1E293B' },

  nextButton: {
    backgroundColor: '#E94560', marginHorizontal: 16, marginTop: 12,
    padding: 14, borderRadius: 8, alignItems: 'center',
  },
  nextButtonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },

  button: {
    backgroundColor: '#1A1A2E', marginTop: 16, paddingVertical: 14,
    paddingHorizontal: 40, borderRadius: 8, alignItems: 'center', minWidth: 200,
  },
  homeButton: { backgroundColor: '#64748B' },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },

  result: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  resultTitle: { fontSize: 22, fontWeight: '700', marginBottom: 16, color: '#1A1A2E' },
  resultScore: { fontSize: 56, fontWeight: '900', color: '#E94560' },
  resultRate: { fontSize: 18, color: '#666', marginBottom: 8 },
  perfectText: { fontSize: 16, color: '#28A745', fontWeight: '600', marginBottom: 8 },
});
