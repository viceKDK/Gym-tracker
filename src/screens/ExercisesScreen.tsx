import React, { useMemo, useCallback, useState } from 'react';
import { StyleSheet, SectionList, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useExercises } from '../hooks/useExercises';
import { ExerciseItem } from '../components/exercise/ExerciseItem';
import { SearchBar } from '../components/exercise/SearchBar';
import { CategoryFilter } from '../components/exercise/CategoryFilter';
import { EmptyState } from '../components/ui';
import { Exercise, ExerciseCategory, MuscleGroup } from '../types';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const MUSCLE_GROUPS: MuscleGroup[] = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms',
  'abs', 'obliques', 'lowerBack', 'quads', 'hamstrings', 'glutes',
  'calves', 'fullBody', 'cardio'
];

export default function ExercisesScreen() {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const { exercises, loading, error, refresh } = useExercises();
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<MuscleGroup | 'all'>('all');

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

  const handleAddPress = useCallback(() => {
    navigation.navigate('ExerciseForm');
  }, [navigation]);

  const handleExercisePress = useCallback((exercise: Exercise) => {
    navigation.navigate('ExerciseForm', { 
      exerciseId: exercise.id,
      initialData: { 
        name: exercise.name, 
        category: exercise.category,
        muscle_group: exercise.muscle_group,
        image_url: exercise.image_url,
        video_url: exercise.video_url
      }
    });
  }, [navigation]);

  const handleReset = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMuscleGroup('all');
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleAddPress} style={{ padding: 8 }}>
          <MaterialIcons name="add" size={28} color={colors.primary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleAddPress, colors.primary]);

  if (loading && exercises.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
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
          <ExerciseItem exercise={item} onPress={handleExercisePress} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.headerContainer, { backgroundColor: colors.background, paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm }]}>
            <Text style={[typography.h3, { color: colors.textSecondary }]}>{title}</Text>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          exercises.length === 0 ? (
            <EmptyState 
              message="No exercises yet. Build your personal library!" 
              ctaLabel="Add First Exercise"
              onCtaPress={handleAddPress}
            />
          ) : (
            <EmptyState 
              message="No exercises found matching your search." 
              ctaLabel="Clear Filters"
              onCtaPress={handleReset}
            />
          )
        }
        contentContainerStyle={filteredExercises.length === 0 ? styles.emptyContent : styles.content}
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