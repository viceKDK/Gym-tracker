import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { ExerciseCategory } from '../../types';

interface CategoryBadgeProps {
  category: ExerciseCategory;
}

export const CategoryBadge = React.memo(({ category }: CategoryBadgeProps) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  const getCategoryStyles = () => {
    switch (category) {
      case 'gym':
        return { backgroundColor: colors.primary, label: 'Gym' };
      case 'cardio':
        return { backgroundColor: colors.secondary, label: 'Cardio' };
      case 'abs':
        return { backgroundColor: '#A29BFE', label: 'Abs' }; // Purple for Abs
      default:
        return { backgroundColor: colors.textSecondary, label: category };
    }
  };

  const { backgroundColor, label } = getCategoryStyles();

  return (
    <View style={[styles.badge, { backgroundColor, borderRadius: borderRadius.full, paddingHorizontal: spacing.sm }]}>
      <Text style={[typography.small, { color: colors.textInverse, fontWeight: 'bold' }]}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
});
