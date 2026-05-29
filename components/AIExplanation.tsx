import React from 'react';
import {
  View, Text, ActivityIndicator, TouchableOpacity, StyleSheet,
} from 'react-native';

interface Props {
  staticExplanation: string;
  aiExplanation: string | null;
  isLoading: boolean;
  error: string | null;
  isConfigured: boolean;
  onRequest: () => void;
}

export function AIExplanation({
  staticExplanation, aiExplanation, isLoading, error, isConfigured, onRequest,
}: Props) {
  return (
    <View style={styles.wrapper}>
      {/* 静的解説 — 常に表示 */}
      <View style={styles.staticBox}>
        <Text style={styles.staticLabel}>解説</Text>
        <Text style={styles.staticText}>{staticExplanation}</Text>
      </View>

      {/* AI解説セクション */}
      {isConfigured ? (
        isLoading ? (
          <View style={styles.aiBox}>
            <ActivityIndicator color="#E94560" />
            <Text style={styles.loadingText}>AI解説を生成中...</Text>
          </View>
        ) : error && error !== 'API_KEY_NOT_SET' ? (
          <View style={styles.aiBox}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRequest}>
              <Text style={styles.retryText}>再試行</Text>
            </TouchableOpacity>
          </View>
        ) : aiExplanation ? (
          <View style={styles.aiBox}>
            <Text style={styles.aiLabel}>✨ AI詳細解説</Text>
            <Text style={styles.aiText}>{aiExplanation}</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.aiButton} onPress={onRequest}>
            <Text style={styles.aiButtonText}>✨ AI詳細解説を見る</Text>
          </TouchableOpacity>
        )
      ) : (
        <View style={styles.noKeyBox}>
          <Text style={styles.noKeyText}>
            APIキーを設定するとAIによる詳細解説が利用できます
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginHorizontal: 16, marginTop: 4 },

  staticBox: {
    padding: 14, backgroundColor: '#EEF2FF', borderRadius: 8, marginBottom: 8,
  },
  staticLabel: { fontWeight: '700', fontSize: 13, color: '#4F46E5', marginBottom: 6 },
  staticText: { fontSize: 14, lineHeight: 22, color: '#1E293B' },

  aiBox: {
    padding: 14, backgroundColor: '#FFF7ED', borderRadius: 8,
    borderLeftWidth: 3, borderLeftColor: '#E94560',
  },
  aiLabel: { fontWeight: '700', fontSize: 13, color: '#E94560', marginBottom: 6 },
  aiText: { fontSize: 14, lineHeight: 22, color: '#1E293B' },
  loadingText: { textAlign: 'center', marginTop: 8, color: '#666', fontSize: 13 },
  errorText: { color: '#DC3545', fontSize: 13, marginBottom: 8 },
  retryButton: {
    alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: '#DC3545', borderRadius: 6,
  },
  retryText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  aiButton: {
    padding: 12, borderRadius: 8, alignItems: 'center',
    backgroundColor: '#1A1A2E', marginBottom: 4,
  },
  aiButtonText: { color: '#FFF', fontWeight: '600', fontSize: 14 },

  noKeyBox: {
    padding: 10, backgroundColor: '#F1F5F9', borderRadius: 8,
  },
  noKeyText: { fontSize: 12, color: '#94A3B8', textAlign: 'center' },
});
