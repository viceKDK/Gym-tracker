import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Exercise } from '../../types';
import { CategoryBadge } from './CategoryBadge';

interface ExerciseItemProps {
  exercise: Exercise;
  onPress?: (exercise: Exercise) => void;
}

export const ExerciseItem = React.memo(({ exercise, onPress }: ExerciseItemProps) => {
  const { colors, spacing, typography, shadows } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        { 
          backgroundColor: colors.surface, 
          padding: spacing.md,
          marginBottom: spacing.sm,
          marginHorizontal: spacing.md,
          borderRadius: 12,
          ...shadows.sm
        }
      ]}
      onPress={() => onPress?.(exercise)}
    >
      <View style={styles.content}>
        <Text style={[typography.bodyBold, { color: colors.text }]}>
          {exercise.name}
        </Text>
        <CategoryBadge category={exercise.category} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    minHeight: 56, // Ensure 44x44 minimum touch target
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
