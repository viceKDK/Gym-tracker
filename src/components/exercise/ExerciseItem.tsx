import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
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
  const { colors, spacing, typography, shadows, borderRadius } = useTheme();

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
        {exercise.image_url ? (
          <Image 
            source={{ uri: exercise.image_url }} 
            style={[styles.thumbnail, { borderRadius: borderRadius.sm, marginRight: spacing.md }]} 
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: colors.border + '50', borderRadius: borderRadius.sm, marginRight: spacing.md }]}>
            <MaterialIcons name="fitness-center" size={20} color={colors.textSecondary} />
          </View>
        )}
        
        <View style={styles.leftContent}>
          <Text style={[typography.bodyBold, { color: colors.text, marginBottom: 4 }]}>
            {exercise.name}
          </Text>
          <CategoryBadge category={exercise.category} muscleGroup={exercise.muscle_group} />
        </View>

        <View style={styles.rightIcons}>
          {exercise.video_url && (
            <MaterialIcons name="play-circle-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
          )}
          {selected && (
            <MaterialIcons name="check-circle" size={24} color={colors.secondary} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 48,
    height: 48,
  },
  placeholder: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
