import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Exercise, WorkoutSetWithExercise } from '../../types';
import { CategoryBadge } from '../exercise/CategoryBadge';
import { Card } from '../ui/Card';
import { MaterialIcons } from '@expo/vector-icons';

interface ExerciseCardProps {
  exercise: Exercise;
  sets: WorkoutSetWithExercise[];
  onAddSet: () => void;
  isAdHoc?: boolean;
}

export const ExerciseCard = ({ exercise, sets, onAddSet, isAdHoc }: ExerciseCardProps) => {
  const { colors, spacing, typography, borderRadius } = useTheme();

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContent}>
          <View style={styles.nameRow}>
            <Text style={[typography.bodyBold, { color: colors.text }]}>{exercise.name}</Text>
            {isAdHoc && (
              <View style={[styles.adHocBadge, { backgroundColor: colors.border, borderRadius: borderRadius.sm }]}>
                <Text style={typography.small}>ADDED</Text>
              </View>
            )}
          </View>
          <CategoryBadge category={exercise.category} />
        </View>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.secondary, borderRadius: borderRadius.full }]}
          onPress={onAddSet}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {sets.length > 0 && (
        <View style={[styles.setsContainer, { marginTop: spacing.md }]}>
          {sets.map((set, index) => (
            <View key={set.id || index} style={[styles.setRow, { paddingVertical: spacing.xs }]}>
              <Text style={[typography.body, { color: colors.textSecondary }]}>
                Set {set.set_number}: {set.weight}kg x {set.reps}
              </Text>
              <MaterialIcons name="check-circle" size={18} color={colors.success} />
            </View>
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContent: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  adHocBadge: {
    marginLeft: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  addButton: {
    padding: 8,
  },
  setsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
