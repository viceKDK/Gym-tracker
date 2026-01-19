import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ExerciseCategory, MuscleGroup } from '../../types';

interface CategoryBadgeProps {
  category: ExerciseCategory;
  muscleGroup?: MuscleGroup | null;
}

export const CategoryBadge = React.memo(({ category, muscleGroup }: CategoryBadgeProps) => {
  const { colors, borderRadius } = useTheme();
  const { t } = useLanguage();

  const getCategoryStyles = () => {
    switch (category) {
      case 'gym':
        return {
          backgroundColor: '#DBEAFE',
          textColor: '#1E40AF',
          label: t.categories.gym,
        };
      case 'cardio':
        return {
          backgroundColor: '#DCFCE7',
          textColor: '#166534',
          label: t.categories.cardio,
        };
      case 'abs':
        return {
          backgroundColor: '#F3E8FF',
          textColor: '#7C3AED',
          label: t.categories.abs,
        };
      case 'calisthenics':
        return {
          backgroundColor: '#FFEDD5',
          textColor: '#C2410C',
          label: t.categories.calisthenics,
        };
      default:
        return {
          backgroundColor: colors.border,
          textColor: colors.textSecondary,
          label: category,
        };
    }
  };

  const { backgroundColor, textColor, label } = getCategoryStyles();
  
  // Format muscle group label (capitalize first letter)
  const muscleLabel = muscleGroup 
    ? muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1).replace(/([A-Z])/g, ' $1').trim()
    : null;

  return (
    <View style={styles.container}>
      <View style={[styles.badge, { backgroundColor, borderRadius: borderRadius.sm }]}>
        <Text style={[styles.text, { color: textColor }]}>
          {label}
        </Text>
      </View>
      
      {muscleLabel && (
        <View style={[styles.badge, { backgroundColor: colors.surfaceVariant, borderRadius: borderRadius.sm, marginLeft: 4 }]}>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            {muscleLabel}
          </Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  badge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
