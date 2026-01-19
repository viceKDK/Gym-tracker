import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useExercises } from '../hooks/useExercises';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { DayOfWeek, Exercise, RoutineDayWithExercise, ExerciseCategory, MuscleGroup } from '../types';
import { ExerciseItem } from '../components/exercise/ExerciseItem';
import { RoutineRepository } from '../database/repositories/RoutineRepository';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchBar } from '../components/exercise/SearchBar';
import { CategoryFilter } from '../components/exercise/CategoryFilter';
import { EmptyState } from '../components/ui';

type RootStackParamList = {
  DayConfig: { day: DayOfWeek };
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MUSCLE_GROUPS: MuscleGroup[] = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms',
  'abs', 'obliques', 'lowerBack', 'quads', 'hamstrings', 'glutes',
  'calves', 'fullBody', 'cardio'
];

export default function DayConfigScreen() {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'DayConfig'>>();
  const day = route.params.day;

  const { exercises, loading: loadingExercises } = useExercises();
  const [assignedExercises, setAssignedExercises] = useState<RoutineDayWithExercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | 'all'>('all');

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

  const filteredExercises = useMemo(() => {
    return exercises.filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (e.muscle_group && e.muscle_group.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
      const matchesMuscle = selectedMuscleGroup === 'all' || e.muscle_group === selectedMuscleGroup;
      
      return matchesSearch && matchesCategory && matchesMuscle;
    });
  }, [exercises, searchQuery, selectedCategory, selectedMuscleGroup]);

  const sections = useMemo(() => {
    const categories: ExerciseCategory[] = ['gym', 'cardio', 'abs', 'calisthenics'];
    const result = categories.map(cat => ({
      title: cat.charAt(0).toUpperCase() + cat.slice(1),
      data: filteredExercises.filter(e => e.category === cat)
    })).filter(s => s.data.length > 0);
    
    return result;
  }, [filteredExercises]);

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
          exercise_muscle_group: exercise.muscle_group,
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

      <SearchBar 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
        onClear={() => setSearchQuery('')} 
      />
      <View>
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.muscleFilterContainer}
        >
          <TouchableOpacity
            style={[
              styles.muscleChip, 
              { 
                backgroundColor: selectedMuscleGroup === 'all' ? colors.primary : colors.surface,
                borderColor: selectedMuscleGroup === 'all' ? colors.primary : colors.border,
                borderRadius: borderRadius.full
              }
            ]}
            onPress={() => setSelectedMuscleGroup('all')}
          >
            <Text style={[typography.small, { color: selectedMuscleGroup === 'all' ? colors.textInverse : colors.textSecondary }]}>All</Text>
          </TouchableOpacity>
          {MUSCLE_GROUPS.map(mg => (
            <TouchableOpacity
              key={mg}
              style={[
                styles.muscleChip, 
                { 
                  backgroundColor: selectedMuscleGroup === mg ? colors.primary : colors.surface,
                  borderColor: selectedMuscleGroup === mg ? colors.primary : colors.border,
                  borderRadius: borderRadius.full
                }
              ]}
              onPress={() => setSelectedMuscleGroup(mg)}
            >
              <Text style={[typography.small, { color: selectedMuscleGroup === mg ? colors.textInverse : colors.textSecondary }]}>
                {mg.charAt(0).toUpperCase() + mg.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
        ListEmptyComponent={
          <EmptyState 
            message="No exercises found." 
            ctaLabel="Clear Filters"
            onCtaPress={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedMuscleGroup('all');
            }}
          />
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
  },
  headerInfo: {
    padding: 16,
    paddingBottom: 8,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
  muscleFilterContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  muscleChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    marginRight: 8,
  },
});