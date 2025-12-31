import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WorkoutSetWithExercise } from '../../types';
import { CategoryBadge } from '../exercise/CategoryBadge';
import { Card } from '../ui/Card';

interface DetailExerciseItemProps {
  exerciseName: string;
  category: any;
  sets: WorkoutSetWithExercise[];
}

export const DetailExerciseItem = ({ exerciseName, category, sets }: DetailExerciseItemProps) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={[typography.bodyBold, { color: colors.text }]}>{exerciseName}</Text>
        <CategoryBadge category={category} />
      </View>
      
      <View style={[styles.setsContainer, { marginTop: spacing.md }]}>
        {sets.map((set, index) => (
          <View key={set.id || index} style={[styles.setRow, { paddingVertical: spacing.xs }]}>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              Set {set.set_number}: {set.weight}kg x {set.reps}
            </Text>
          </View>
        ))}
      </View>
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
