import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Exercise } from '../../types';
import { CategoryBadge } from './CategoryBadge';

import { MaterialIcons } from '@expo/vector-icons';

interface ExerciseItemProps {
  exercise: Exercise;
  selected?: boolean;
  onPress?: (exercise: Exercise) => void;
}

export const ExerciseItem = React.memo(({ exercise, selected, onPress }: ExerciseItemProps) => {
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
          borderWidth: selected ? 2 : 0,
          borderColor: colors.secondary,
          ...shadows.sm
        }
      ]}
      onPress={() => onPress?.(exercise)}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={[typography.bodyBold, { color: colors.text }]}>
            {exercise.name}
          </Text>
          <CategoryBadge category={exercise.category} />
        </View>
        {selected && (
          <MaterialIcons name="check-circle" size={24} color={colors.secondary} />
        )}
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
  leftContent: {
    flex: 1,
  },
});
