import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Exercise } from '../../types';
import { CategoryBadge } from '../exercise/CategoryBadge';
import { PRBadge } from './PRBadge';
import { format, parseISO } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

interface ProgressListItemProps {
  exercise: Exercise & { last_date: string; last_weight: number };
  onPress: () => void;
}

export const ProgressListItem = ({ exercise, onPress }: ProgressListItemProps) => {
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
          borderRadius: borderRadius.md,
          ...shadows.sm
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleCol}>
          <Text style={[typography.bodyBold, { color: colors.text }]}>{exercise.name}</Text>
          <View style={styles.badgeRow}>
            <CategoryBadge category={exercise.category} />
            <View style={{ width: spacing.sm }} />
            <PRBadge weight={exercise.last_weight} showIcon={false} />
          </View>
        </View>
        
        <View style={styles.statsCol}>
          <Text style={[typography.bodyBold, { color: colors.primary }]}>
            Last: {exercise.last_weight} kg
          </Text>
          <Text style={[typography.small, { color: colors.textSecondary }]}>
            {format(parseISO(exercise.last_date), 'MMM d')}
          </Text>
        </View>
        
        <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 72,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCol: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statsCol: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
});
