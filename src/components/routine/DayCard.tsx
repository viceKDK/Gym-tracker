import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { DayOfWeek } from '../../types';
import { MaterialIcons } from '@expo/vector-icons';

interface DayCardProps {
  dayOfWeek: DayOfWeek;
  exerciseNames: string[];
  isToday: boolean;
  onPress: () => void;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DayCard = ({ dayOfWeek, exerciseNames, isToday, onPress }: DayCardProps) => {
  const { colors, spacing, typography, shadows, borderRadius } = useTheme();

  const getExerciseSummary = () => {
    if (exerciseNames.length === 0) return 'Rest Day';
    
    const visible = exerciseNames.slice(0, 3);
    const summary = visible.join(', ');
    
    if (exerciseNames.length > 3) {
      return `${summary} +${exerciseNames.length - 3} more`;
    }
    return summary;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.card,
        { 
          backgroundColor: colors.surface,
          padding: spacing.md,
          marginBottom: spacing.md,
          borderRadius: borderRadius.xl,
          borderWidth: isToday ? 2 : 0,
          borderColor: colors.primary,
          ...shadows.md
        }
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[typography.h3, { color: isToday ? colors.primary : colors.text }]}>
            {DAY_NAMES[dayOfWeek]}
          </Text>
          {isToday && (
            <View style={[styles.todayBadge, { backgroundColor: colors.primary, borderRadius: borderRadius.sm }]}>
              <Text style={[typography.small, { color: colors.textInverse, fontWeight: 'bold' }]}>TODAY</Text>
            </View>
          )}
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
      
      <Text 
        style={[
          typography.body, 
          { 
            color: exerciseNames.length === 0 ? colors.textSecondary : colors.text,
            marginTop: spacing.xs,
            fontStyle: exerciseNames.length === 0 ? 'italic' : 'normal'
          }
        ]}
        numberOfLines={1}
      >
        {getExerciseSummary()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayBadge: {
    marginLeft: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
