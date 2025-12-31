import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { ExerciseCategory } from '../../types';

interface CategoryFilterProps {
  selectedCategory: ExerciseCategory | 'all';
  onSelect: (category: ExerciseCategory | 'all') => void;
}

const CATEGORIES: { id: ExerciseCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'gym', label: 'Gym' },
  { id: 'cardio', label: 'Cardio' },
  { id: 'abs', label: 'Abs' },
];

export const CategoryFilter = ({ selectedCategory, onSelect }: CategoryFilterProps) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  return (
    <View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.md, paddingBottom: spacing.sm }}
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.7}
              style={[
                styles.chip,
                { 
                  backgroundColor: isSelected ? colors.secondary : colors.surface,
                  borderColor: isSelected ? colors.secondary : colors.border,
                  borderRadius: borderRadius.full,
                  paddingHorizontal: spacing.md,
                  marginRight: spacing.sm,
                }
              ]}
              onPress={() => onSelect(cat.id)}
            >
              <Text style={[typography.small, { color: isSelected ? colors.textInverse : colors.textSecondary, fontWeight: '600' }]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
