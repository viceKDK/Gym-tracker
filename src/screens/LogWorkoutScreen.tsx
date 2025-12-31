import React, { useMemo, useCallback, useState } from 'react';
import { StyleSheet, FlatList, View, Text, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useTodayRoutine } from '../hooks/useTodayRoutine';
import { useWorkoutSession } from '../hooks/useWorkoutSession';
import { ExerciseCard } from '../components/workout/ExerciseCard';
import { ExercisePicker } from '../components/workout/ExercisePicker';
import { Button } from '../components/ui';
import { Exercise } from '../types';
import { MaterialIcons } from '@expo/vector-icons';

export default function LogWorkoutScreen() {
  const { colors, spacing, typography } = useTheme();
  const { exercises: routineExercises, loading: loadingRoutine } = useTodayRoutine();
  const { session, sets, loading: loadingSession, addSet } = useWorkoutSession();
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [adHocExercises, setAdHocExercises] = useState<Exercise[]>([]);

  // Combine routine exercises with any ad-hoc exercises
  const workoutExercises = useMemo(() => {
    const routineIds = routineExercises.map(e => e.exercise_id);
    
    // Get unique ad-hoc exercises from sets
    const existingAdHocInSets = sets.filter(s => !routineIds.includes(s.exercise_id)).reduce((acc: Exercise[], curr) => {
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

    // Combine with newly added ad-hoc exercises in this session
    const allAdHoc = [...existingAdHocInSets];
    adHocExercises.forEach(ae => {
      if (!allAdHoc.find(e => e.id === ae.id)) {
        allAdHoc.push(ae);
      }
    });

    return [
      ...routineExercises.map(re => ({
        id: re.exercise_id,
        name: re.exercise_name,
        category: re.exercise_category,
        created_at: new Date().toISOString(), // Mocked
        isAdHoc: false
      })),
      ...allAdHoc.map(ae => ({
        ...ae,
        isAdHoc: true
      }))
    ];
  }, [routineExercises, sets, adHocExercises]);

  const handleAddSet = async (exerciseId: number, weight: number | null, reps: number | null) => {
    try {
      await addSet(exerciseId, weight, reps);
    } catch (error) {
      console.error('[LogWorkout] Failed to add set:', error);
    }
  };

  const handleSelectAdHoc = (exercise: Exercise) => {
    setAdHocExercises(prev => [...prev, exercise]);
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
            onAddSet={(weight, reps) => handleAddSet(item.id, weight, reps)}
          />
        )}
        ListHeaderComponent={
          <View style={{ padding: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={[typography.h2, { color: colors.text }]}>Today's Session</Text>
              <Text style={[typography.body, { color: colors.textSecondary }]}>
                {workoutExercises.length} exercises to log
              </Text>
            </View>
            <TouchableOpacity 
              onPress={() => setIsPickerVisible(true)}
              style={[styles.addHeaderBtn, { backgroundColor: colors.secondary, borderRadius: 8 }]}
            >
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.md }]}>
              No exercises scheduled for today.
            </Text>
            <Button title="Add Ad-hoc Exercise" onPress={() => setIsPickerVisible(true)} variant="secondary" />
          </View>
        }
        ListFooterComponent={
          <View style={{ padding: spacing.md, paddingBottom: 40 }}>
            <Button title="Finish Workout" onPress={() => {}} variant="primary" />
          </View>
        }
      />

      <ExercisePicker 
        visible={isPickerVisible} 
        onClose={() => setIsPickerVisible(false)} 
        onSelect={handleSelectAdHoc} 
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
  addHeaderBtn: {
    padding: 8,
  },
});
