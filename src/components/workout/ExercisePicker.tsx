import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, SectionList, TouchableOpacity, Modal, SafeAreaView } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Exercise, ExerciseCategory } from '../../types';
import { useExercises } from '../../hooks/useExercises';
import { SearchBar } from '../exercise/SearchBar';
import { CategoryBadge } from '../exercise/CategoryBadge';
import { MaterialIcons } from '@expo/vector-icons';

interface ExercisePickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
}

export const ExercisePicker = ({ visible, onClose, onSelect }: ExercisePickerProps) => {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const { exercises, loading } = useExercises();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExercises = useMemo(() => {
    return exercises.filter(e => 
      e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [exercises, searchQuery]);

  const sections = useMemo(() => [
    { title: 'Gym', data: filteredExercises.filter(e => e.category === 'gym') },
    { title: 'Cardio', data: filteredExercises.filter(e => e.category === 'cardio') },
    { title: 'Abs', data: filteredExercises.filter(e => e.category === 'abs') },
  ].filter(s => s.data.length > 0), [filteredExercises]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[typography.h2, { color: colors.text }]}>Add Exercise</Text>
          <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
            <MaterialIcons name="close" size={28} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          onClear={() => setSearchQuery('')} 
        />

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.item, { backgroundColor: colors.surface, padding: spacing.md, marginHorizontal: spacing.md, marginBottom: 2, borderRadius: 8 }]}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={[typography.bodyBold, { color: colors.text }]}>{item.name}</Text>
              <CategoryBadge category={item.category} />
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={[styles.sectionHeader, { backgroundColor: colors.background, paddingHorizontal: spacing.md }]}>
              <Text style={[typography.small, { color: colors.textSecondary, fontWeight: '600' }]}>{title.toUpperCase()}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionHeader: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
