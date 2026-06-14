import React, { useState, useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet,
} from 'react-native';
import TopTabBar from '../components/TopTabBar';
import { GLOSSARY } from '../data/glossary';
import { SUBJECT_LABELS } from '../types';
import type { SubjectKey } from '../types';
import { getExamIdForSubject, getSubjectsForExam, getSubjectMeta } from '../data/examSubjects';
import { EXAMS } from '../data/roles';

const SUBJECT_COLORS: Record<SubjectKey, string> = {
  financial_analysis:  '#E94560',
  securities_analysis: '#1565C0',
  market_economics:    '#2E7D32',
};

// Round16-B: GlossaryTerm.subjectがCMAのSubjectKey以外（G検定・危険物等の科目キー）も
// 受け入れるようになったため、SUBJECT_COLORS/SUBJECT_LABELS（CMA専用・Record<SubjectKey,...>）
// に存在しないキーはdata/examSubjects.tsのgetSubjectMeta()からテーマ色・科目ラベルを取得する。
function getTermColor(subjectKey: string): string {
  if (subjectKey in SUBJECT_COLORS) return SUBJECT_COLORS[subjectKey as SubjectKey];
  return getSubjectMeta(subjectKey)?.theme.accent ?? '#666666';
}

function getTermSubjectLabel(subjectKey: string): string {
  if (subjectKey in SUBJECT_LABELS) return SUBJECT_LABELS[subjectKey as SubjectKey];
  return getSubjectMeta(subjectKey)?.label ?? subjectKey;
}

// Round15論点K: 資格(examId)フィルタ。GLOSSARYに実際にエントリが存在する資格のみ、
// EXAMS配列順に動的生成する（YAGNI: 存在しない資格のフィルタは表示しない）。
const EXAM_FILTERS: Array<{ key: string; label: string }> = [
  { key: 'all', label: '全資格' },
  ...EXAMS
    .filter(exam => GLOSSARY.some(t => (getExamIdForSubject(t.subject) ?? 'cma') === exam.id))
    .map(exam => ({ key: exam.id, label: exam.shortName })),
];

export default function GlossaryScreen() {
  const [query, setQuery]         = useState('');
  const [filter, setFilter]       = useState<string>('all');
  const [expanded, setExpanded]   = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter(t => {
      if (filter !== 'all' && (getExamIdForSubject(t.subject) ?? 'cma') !== filter) return false;
      if (!q) return true;
      return (
        t.term.toLowerCase().includes(q) ||
        t.reading.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  // Round15論点K: 資格(examId)ごとにグループ化。
  // 表示順はdata/roles.tsのEXAMS配列順、該当用語が1件以上ある資格のみ表示。
  const groups = EXAMS
    .map(exam => ({
      exam,
      terms: filtered.filter(t => (getExamIdForSubject(t.subject) ?? 'cma') === exam.id),
    }))
    .filter(g => g.terms.length > 0);

  function toggleExpand(id: string) {
    setExpanded(e => ({ ...e, [id]: !e[id] }));
  }

  return (
    <View style={styles.container}>
      <TopTabBar />
      {/* Search bar */}
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="用語・読み方・定義を検索..."
          placeholderTextColor="#AAA"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Exam filter（Round15論点K: 資格別フィルタ） */}
      <View style={styles.filterRow}>
        {EXAM_FILTERS.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterBtn, filter === f.key && styles.filterBtnActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.resultCount}>{filtered.length}件</Text>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📖</Text>
            <Text style={styles.emptyText}>「{query}」に一致する用語が見つかりません</Text>
          </View>
        ) : (
          groups.map(({ exam, terms }) => {
            const groupIcon = getSubjectsForExam(exam.id)[0]?.icon ?? '📘';
            return (
              <View key={exam.id} style={styles.groupSection}>
                <View style={styles.groupHeader}>
                  <Text style={styles.groupHeaderText}>
                    {groupIcon} {exam.shortName}（{terms.length}件）
                  </Text>
                </View>

                {terms.map(term => {
                  const isOpen = expanded[term.id] ?? false;
                  const color  = getTermColor(term.subject);
                  return (
                    <TouchableOpacity
                      key={term.id}
                      style={styles.termCard}
                      onPress={() => toggleExpand(term.id)}
                      activeOpacity={0.85}
                    >
                      <View style={styles.termHeader}>
                        <View style={styles.termHeaderLeft}>
                          <View style={[styles.subjectPill, { backgroundColor: color + '18', borderColor: color + '40' }]}>
                            <Text style={[styles.subjectPillText, { color }]}>
                              {getTermSubjectLabel(term.subject).split('・')[0]}
                            </Text>
                          </View>
                          <Text style={styles.categoryText}>{term.category}</Text>
                        </View>
                        <Text style={styles.chevron}>{isOpen ? '▲' : '▼'}</Text>
                      </View>

                      <Text style={styles.termText}>{term.term}</Text>
                      <Text style={styles.readingText}>{term.reading}</Text>

                      {isOpen && (
                        <Text style={styles.definitionText}>{term.definition}</Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },

  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FFF', marginHorizontal: 16, marginTop: 12, marginBottom: 8,
    borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8,
    borderWidth: 1, borderColor: '#E0E0E0',
  },
  searchIcon:  { fontSize: 14 },
  searchInput: { flex: 1, fontSize: 14, color: '#333', paddingVertical: 2 },

  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, marginBottom: 6 },
  filterBtn: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD',
  },
  filterBtnActive:  { backgroundColor: '#E94560', borderColor: '#E94560' },
  filterText:       { fontSize: 12, color: '#666', fontWeight: '600' },
  filterTextActive: { color: '#FFF' },

  resultCount: { fontSize: 11, color: '#AAA', paddingHorizontal: 16, marginBottom: 6 },

  scroll:        { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },

  emptyState: { alignItems: 'center', paddingTop: 60 },
  emptyIcon:  { fontSize: 40, marginBottom: 12 },
  emptyText:  { fontSize: 14, color: '#888', textAlign: 'center' },

  groupSection: { marginBottom: 16 },
  groupHeader: { marginBottom: 8 },
  groupHeaderText: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },

  termCard: {
    backgroundColor: '#FFF', borderRadius: 10, padding: 14, marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  termHeader:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  termHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subjectPill: {
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, borderWidth: 1,
  },
  subjectPillText: { fontSize: 10, fontWeight: '700' },
  categoryText:    { fontSize: 11, color: '#888' },
  chevron:         { fontSize: 11, color: '#AAA' },
  termText:        { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 2 },
  readingText:     { fontSize: 12, color: '#888', marginBottom: 0 },
  definitionText:  { fontSize: 13, color: '#444', lineHeight: 21, marginTop: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 10 },
});
