import React, { useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useProgressExercises } from '../hooks/useProgressExercises';
import { ProgressListItem } from '../components/progress/ProgressListItem';
import { EmptyState } from '../components/ui';

export default function ProgressScreen() {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation<any>();
  const { exercises, loading, refresh } = useProgressExercises();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  if (loading && exercises.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProgressListItem 
            exercise={item} 
            onPress={() => navigation.navigate('ProgressChart', { exerciseId: item.id, exerciseName: item.name })} 
          />
        )}
        ListHeaderComponent={
          <View style={{ padding: spacing.md }}>
            <Text style={[typography.h2, { color: colors.text }]}>Progress</Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>Track your strength evolution</Text>
          </View>
        }
        ListEmptyComponent={
          <EmptyState 
            message="No workout data yet. Start logging to track your progress!" 
            ctaLabel="Start Your First Workout"
            onCtaPress={() => navigation.navigate('Workout')}
          />
        }
        contentContainerStyle={exercises.length === 0 ? styles.emptyContent : styles.content}
        onRefresh={refresh}
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