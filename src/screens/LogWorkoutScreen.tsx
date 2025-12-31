import React, { useMemo, useCallback } from 'react';
import { StyleSheet, FlatList, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTodayRoutine } from '../hooks/useTodayRoutine';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { ExerciseCard } from '../components/workout/ExerciseCard';
import { Button } from '../components/ui';
import { Exercise } from '../types';

export default function LogWorkoutScreen() {
  const { colors, spacing, typography } = useTheme();
  const { exercises: routineExercises, loading: loadingRoutine } = useTodayRoutine();
  const { session, sets, loading: loadingSession, addSet } = useWorkoutSession();

  // Combine routine exercises with any ad-hoc exercises already in sets
  const workoutExercises = useMemo(() => {
    const routineIds = routineExercises.map(e => e.exercise_id);
    const adHocSets = sets.filter(s => !routineIds.includes(s.exercise_id));
    
    // Get unique ad-hoc exercises from sets
    const adHocExercises = adHocSets.reduce((acc: Exercise[], curr) => {
      if (!acc.find(e => e.id === curr.exercise_id)) {
        acc.push({
          id: curr.exercise_id,
          name: curr.exercise_name,
          category: curr.exercise_category,
          created_at: curr.created_at
        });
      }
      return acc;
    }, []);

    return [
      ...routineExercises.map(re => ({
        id: re.exercise_id,
        name: re.exercise_name,
        category: re.exercise_category,
        created_at: new Date().toISOString(), // Mocked created_at
        isAdHoc: false
      })),
      ...adHocExercises.map(ae => ({
        ...ae,
        isAdHoc: true
      }))
    ];
  }, [routineExercises, sets]);

  const handleAddSet = (exerciseId: number) => {
    // Input logic will be implemented in Story 4.3
    console.log('Add set for', exerciseId);
  };

  if (loadingRoutine || loadingSession) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={workoutExercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseCard
            exercise={item}
            isAdHoc={item.isAdHoc}
            sets={sets.filter(s => s.exercise_id === item.id)}
            onAddSet={() => handleAddSet(item.id)}
          />
        )}
        ListHeaderComponent={
          <View style={{ padding: spacing.md }}>
            <Text style={[typography.h2, { color: colors.text }]}>Today's Session</Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              {workoutExercises.length} exercises to log
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.md }]}>
              No exercises scheduled for today.
            </Text>
            <Button title="Add Ad-hoc Exercise" onPress={() => {}} variant="secondary" />
          </View>
        }
        ListFooterComponent={
          <View style={{ padding: spacing.md, paddingBottom: 40 }}>
            <Button title="Finish Workout" onPress={() => {}} variant="primary" />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
