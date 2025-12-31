import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useExercises } from '../hooks/useExercises';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { DayOfWeek, Exercise, RoutineDayWithExercise } from '../types';
import { ExerciseItem } from '../components/exercise/ExerciseItem';
import { RoutineRepository } from '../database/repositories/RoutineRepository';
import { MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  DayConfig: { day: DayOfWeek };
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DayConfigScreen() {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'DayConfig'>>();
  const day = route.params.day;

  const { exercises, loading: loadingExercises } = useExercises();
  const [assignedExercises, setAssignedExercises] = useState<RoutineDayWithExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAssignments = useCallback(async () => {
    try {
      const repo = new RoutineRepository();
      const data = await repo.getByDay(day);
      setAssignedExercises(data);
    } catch (error) {
      console.error('[DayConfig] Failed to load assignments:', error);
    } finally {
      setIsLoading(false);
    }
  }, [day]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  const sections = useMemo(() => [
    { title: 'Gym', data: exercises.filter(e => e.category === 'gym') },
    { title: 'Cardio', data: exercises.filter(e => e.category === 'cardio') },
    { title: 'Abs', data: exercises.filter(e => e.category === 'abs') },
  ].filter(s => s.data.length > 0), [exercises]);

  const isAssigned = (exerciseId: number) => {
    return assignedExercises.some(ae => ae.exercise_id === exerciseId);
  };

  const handleToggleExercise = async (exercise: Exercise) => {
    const repo = new RoutineRepository();
    const existing = assignedExercises.find(ae => ae.exercise_id === exercise.id);

    try {
      if (existing) {
        await repo.removeExercise(existing.id);
        setAssignedExercises(prev => prev.filter(ae => ae.id !== existing.id));
      } else {
        const nextOrder = assignedExercises.length;
        const result = await repo.assignExercise(exercise.id, day, nextOrder);
        const newAssignment: RoutineDayWithExercise = {
          ...result,
          exercise_name: exercise.name,
          exercise_category: exercise.category,
        };
        setAssignedExercises(prev => [...prev, newAssignment]);
      }
    } catch (error) {
      console.error('[DayConfig] Failed to toggle exercise:', error);
    }
  };

  const handleClearDay = async () => {
    Alert.alert(
      'Mark as Rest Day',
      'This will remove all exercises from this day. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Mark Rest Day', 
          onPress: async () => {
            try {
              const repo = new RoutineRepository();
              await repo.clearDay(day);
              setAssignedExercises([]);
            } catch (error) {
              console.error('[DayConfig] Failed to clear day:', error);
            }
          }
        }
      ]
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleClearDay} style={{ padding: 8, flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons name="event-busy" size={24} color={colors.error} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors.error, day]);

  if (isLoading || loadingExercises) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerInfo}>
        <Text style={[typography.h2, { color: colors.text }]}>{DAY_NAMES[day]}</Text>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          {assignedExercises.length} exercises selected
        </Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseItem 
            exercise={item} 
            selected={isAssigned(item.id)}
            onPress={handleToggleExercise} 
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.sectionHeader, { backgroundColor: colors.background, paddingHorizontal: spacing.md }]}>
            <Text style={[typography.h3, { color: colors.textSecondary }]}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
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
  },
  headerInfo: {
    padding: 16,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
});