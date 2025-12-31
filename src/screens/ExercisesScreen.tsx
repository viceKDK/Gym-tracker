import React, { useMemo, useCallback } from 'react';
import { StyleSheet, SectionList, Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useExercises } from '../hooks/useExercises';
import { ExerciseItem } from '../components/exercise/ExerciseItem';
import { EmptyState } from '../components/ui';
import { Exercise } from '../types';
import { useNavigation } from '@react-navigation/native';

export default function ExercisesScreen() {
  const { colors, spacing, typography } = useTheme();
  const { exercises, loading, error, refresh } = useExercises();
  const navigation = useNavigation();

  const sections = useMemo(() => [
    { title: 'Gym', data: exercises.filter(e => e.category === 'gym') },
    { title: 'Cardio', data: exercises.filter(e => e.category === 'cardio') },
    { title: 'Abs', data: exercises.filter(e => e.category === 'abs') },
  ].filter(s => s.data.length > 0), [exercises]);

  const handleAddPress = useCallback(() => {
    // Navigation to ExerciseForm will be implemented in Story 2.3
    console.log('Add Exercise');
  }, []);

  const handleExercisePress = useCallback((exercise: Exercise) => {
    // Navigation to Edit will be implemented in Story 2.4
    console.log('Edit Exercise', exercise.id);
  }, []);

  if (loading && exercises.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseItem exercise={item} onPress={handleExercisePress} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.headerContainer, { backgroundColor: colors.background, paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm }]}>
            <Text style={[typography.h3, { color: colors.textSecondary }]}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          <EmptyState 
            message="No exercises yet. Build your personal library!" 
            ctaLabel="Add First Exercise"
            onCtaPress={handleAddPress}
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
  headerContainer: {
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});