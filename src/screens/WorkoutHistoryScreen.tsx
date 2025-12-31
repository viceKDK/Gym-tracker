import React, { useState, useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { WorkoutRepository } from '../database/repositories/WorkoutRepository';
import { WorkoutSessionSummary } from '../types';
import { HistoryItem } from '../components/workout/HistoryItem';
import { EmptyState } from '../components/ui';

export default function WorkoutHistoryScreen() {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation<any>();
  const [history, setHistory] = useState<WorkoutSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    try {
      setLoading(true);
      const repo = new WorkoutRepository();
      const data = await repo.getWorkoutHistory();
      setHistory(data);
    } catch (error) {
      console.error('[WorkoutHistory] Failed to load:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  if (loading && history.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HistoryItem 
            session={item} 
            onPress={() => navigation.navigate('WorkoutDetail', { sessionId: item.id, date: item.date })} 
          />
        )}
        ListHeaderComponent={
          <View style={{ padding: spacing.md }}>
            <Text style={[typography.h2, { color: colors.text }]}>History</Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>Your past training sessions</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState 
            message="No workouts yet. Start your first one!" 
            ctaLabel="Start Workout"
            onCtaPress={() => navigation.navigate('WorkoutIndex')}
          />
        }
        contentContainerStyle={history.length === 0 ? styles.emptyContent : styles.content}
        onRefresh={loadHistory}
        refreshing={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 8,
  },
  emptyContent: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
