import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSavedQuestions } from '../hooks/useSavedQuestions';
import { QUESTIONS } from '../data/questions';
import type { SaveType } from '../types';

type Tab = 'memo' | 'retry';

const TAB_CONFIG: Record<Tab, { icon: string; label: string; quizMode: string; emptyText: string }> = {
  memo: {
    icon: '📌',
    label: '念のため保存',
    quizMode: 'memo',
    emptyText: '演習中に「📌 念のため保存」ボタンを押すと\nここに問題が保存されます',
  },
  retry: {
    icon: '🔁',
    label: '苦手リスト',
    quizMode: 'retry',
    emptyText: '演習中に「🔁 苦手リストに保存」ボタンを押すか、\n問題に不正解になると自動的にここに追加されます',
  },
};

export default function SavedScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('memo');
  const { byType, removeQuestion } = useSavedQuestions();
  const router = useRouter();

  const savedItems = byType(activeTab);
  const cfg = TAB_CONFIG[activeTab];

  const questionList = savedItems
    .map(s => QUESTIONS.find(q => q.id === s.questionId))
    .filter((q): q is NonNullable<typeof q> => q !== undefined);

  function confirmRemove(questionId: string) {
    Alert.alert(
      '削除確認',
      'この問題をリストから削除しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { text: '削除', style: 'destructive', onPress: () => removeQuestion(questionId, activeTab) },
      ],
    );
  }

  return (
    <View style={styles.container}>
      {/* Tab selector */}
      <View style={styles.tabBar}>
        {(['memo', 'retry'] as Tab[]).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {TAB_CONFIG[tab].icon} {TAB_CONFIG[tab].label}
            </Text>
            <Text style={[styles.tabCount, activeTab === tab && styles.tabCountActive]}>
              {byType(tab).length}問
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* 操作説明 */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>演習画面の上部ボタンについて</Text>
          <Text style={styles.infoLine}>📌 念のため保存 — 後で見返したい問題をここに保存します</Text>
          <Text style={styles.infoLine}>🔁 苦手リストに保存 — 苦手な問題をここに保存します（不正解の問題は自動で追加されます）</Text>
          <Text style={styles.infoLine}>次の問題 → — 次の問題に進みます</Text>
        </View>

        {questionList.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>{cfg.icon}</Text>
            <Text style={styles.emptyText}>{cfg.emptyText}</Text>
          </View>
        ) : (
          <>
            {/* Quiz all button */}
            <TouchableOpacity
              style={styles.quizAllButton}
              onPress={() => router.push({ pathname: '/quiz', params: { mode: cfg.quizMode } })}
            >
              <Text style={styles.quizAllText}>
                {cfg.icon} この{questionList.length}問をまとめて演習する
              </Text>
            </TouchableOpacity>

            {/* Question list */}
            {questionList.map(q => (
              <View key={q.id} style={styles.questionCard}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionSubject}>{q.category}</Text>
                  <TouchableOpacity onPress={() => confirmRemove(q.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Text style={styles.removeBtn}>✕</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.questionContent} numberOfLines={3}>{q.content}</Text>
                <View style={styles.questionFooter}>
                  <Text style={styles.questionId}>{q.id}</Text>
                  <Text style={styles.difficultyDot}>{'★'.repeat(q.difficulty)}</Text>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },

  tabBar: { flexDirection: 'row', backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  tab: {
    flex: 1, alignItems: 'center', paddingVertical: 12, gap: 2,
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive:      { borderBottomColor: '#E94560' },
  tabText:        { fontSize: 13, fontWeight: '600', color: '#888' },
  tabTextActive:  { color: '#E94560' },
  tabCount:       { fontSize: 11, color: '#BBB' },
  tabCountActive: { color: '#E94560' },

  scroll:        { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  infoBox: {
    backgroundColor: '#FFF', borderRadius: 10, padding: 14, marginBottom: 16,
    borderWidth: 1, borderColor: '#EEE',
  },
  infoTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', marginBottom: 6 },
  infoLine:  { fontSize: 12, color: '#666', lineHeight: 19, marginBottom: 2 },

  emptyState: { alignItems: 'center', paddingTop: 80 },
  emptyIcon:  { fontSize: 48, marginBottom: 16 },
  emptyText:  { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 22 },

  quizAllButton: {
    backgroundColor: '#E94560', padding: 14, borderRadius: 8,
    alignItems: 'center', marginBottom: 16,
  },
  quizAllText: { color: '#FFF', fontWeight: '700', fontSize: 15 },

  questionCard: {
    backgroundColor: '#FFF', borderRadius: 10, padding: 14, marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  questionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  questionSubject: { fontSize: 11, color: '#E94560', fontWeight: '600' },
  removeBtn:       { fontSize: 14, color: '#CCC', fontWeight: '700', paddingLeft: 8 },
  questionContent: { fontSize: 14, color: '#333', lineHeight: 20 },
  questionFooter:  { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  questionId:      { fontSize: 11, color: '#CCC' },
  difficultyDot:   { fontSize: 11, color: '#FFC107' },
});
