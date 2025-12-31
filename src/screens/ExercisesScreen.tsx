import React, { useMemo, useCallback, useState } from 'react';
import { StyleSheet, SectionList, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useExercises } from '../hooks/useExercises';
import { ExerciseItem } from '../components/exercise/ExerciseItem';
import { SearchBar } from '../components/exercise/SearchBar';
import { CategoryFilter } from '../components/exercise/CategoryFilter';
import { EmptyState } from '../components/ui';
import { Exercise, ExerciseCategory } from '../types';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ExercisesScreen() {
  const { colors, spacing, typography } = useTheme();
  const { exercises, loading, error, refresh } = useExercises();
  const navigation = useNavigation<any>();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');

  const filteredExercises = useMemo(() => {
    return exercises.filter(e => {
      const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [exercises, searchQuery, selectedCategory]);

  const sections = useMemo(() => [
    { title: 'Gym', data: filteredExercises.filter(e => e.category === 'gym') },
    { title: 'Cardio', data: filteredExercises.filter(e => e.category === 'cardio') },
    { title: 'Abs', data: filteredExercises.filter(e => e.category === 'abs') },
  ].filter(s => s.data.length > 0), [filteredExercises]);

  const handleAddPress = useCallback(() => {
    navigation.navigate('ExerciseForm');
  }, [navigation]);

  const handleExercisePress = useCallback((exercise: Exercise) => {
    navigation.navigate('ExerciseForm', { 
      exerciseId: exercise.id,
      initialData: { name: exercise.name, category: exercise.category }
    });
  }, [navigation]);

  const handleReset = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
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
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onSelect={setSelectedCategory} 
      />
      
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
});