import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { RoutineDayWithExercise } from '../../types';
import { Card } from '../ui/Card';
import { MaterialIcons } from '@expo/vector-icons';

interface TodayWorkoutPreviewProps {
  exercises: RoutineDayWithExercise[];
  onPress: () => void;
}

export const TodayWorkoutPreview = ({ exercises, onPress }: TodayWorkoutPreviewProps) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <Text style={[typography.h3, { color: colors.text }]}>Today's Workout</Text>
          <MaterialIcons name="play-circle-filled" size={32} color={colors.primary} />
        </View>
        
        {exercises.length === 0 ? (
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            Rest Day. No exercises scheduled.
          </Text>
        ) : (
          <View>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              {exercises.length} exercises planned
            </Text>
            <Text style={[typography.small, { color: colors.textSecondary, marginTop: spacing.xs }]} numberOfLines={1}>
              {exercises.map(e => e.exercise_name).join(' • ')}
            </Text>
          </View>
        )}
        
        <View style={[styles.cta, { marginTop: spacing.md }]}>
          <Text style={[typography.bodyBold, { color: colors.primary }]}>
            START LOGGING
          </Text>
          <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
