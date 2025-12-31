import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { WorkoutSessionSummary } from '../../types';
import { format, parseISO } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';

interface HistoryItemProps {
  session: WorkoutSessionSummary;
  onPress: () => void;
}

export const HistoryItem = ({ session, onPress }: HistoryItemProps) => {
  const { colors, spacing, typography, shadows, borderRadius } = useTheme();

  const date = parseISO(session.date);

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
        <View>
          <Text style={[typography.bodyBold, { color: colors.text }]}>
            {format(date, 'EEEE, MMM do')}
          </Text>
          <Text style={[typography.small, { color: colors.textSecondary }]}>
            {session.exercise_count} exercises • {session.total_sets} sets
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
