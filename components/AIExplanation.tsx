import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface Props {
  explanation: string | null;
  isLoading: boolean;
  error: string | null;
  onRequest: () => void;
}

export function AIExplanation({ explanation, isLoading, error, onRequest }: Props) {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#E94560" />
        <Text style={styles.loadingText}>AI解説を生成中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.button} onPress={onRequest}>
          <Text style={styles.buttonText}>再試行</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!explanation) {
    return (
      <TouchableOpacity style={styles.button} onPress={onRequest}>
        <Text style={styles.buttonText}>✨ AI解説を見る</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>AI解説</Text>
      <ScrollView>
        <Text style={styles.explanationText}>{explanation}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, padding: 16, backgroundColor: '#F8F9FA', borderRadius: 8 },
  label: { fontWeight: '700', fontSize: 14, color: '#E94560', marginBottom: 8 },
  loadingText: { textAlign: 'center', marginTop: 8, color: '#666' },
  errorText: { color: '#DC3545', marginBottom: 8 },
  explanationText: { fontSize: 14, lineHeight: 22, color: '#333' },
  button: {
    backgroundColor: '#1A1A2E', padding: 12, borderRadius: 8,
    alignItems: 'center', marginTop: 12,
  },
  buttonText: { color: '#FFF', fontWeight: '600' },
});
