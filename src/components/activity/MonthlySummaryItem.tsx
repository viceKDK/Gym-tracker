import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { format, parseISO } from 'date-fns';

interface MonthlySummaryItemProps {
  month: string;
  workoutCount: number;
  totalSets: number;
}

export const MonthlySummaryItem = ({ month, workoutCount, totalSets }: MonthlySummaryItemProps) => {
  const { colors, spacing, typography, borderRadius } = useTheme();

  const date = parseISO(month + '-01');

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm }]}>
      <View style={styles.row}>
        <Text style={[typography.bodyBold, { color: colors.text }]}>
          {format(date, 'MMMM yyyy')}
        </Text>
        <Text style={[typography.bodyBold, { color: colors.primary }]}>
          {workoutCount} sessions
        </Text>
      </View>
      <View style={[styles.row, { marginTop: spacing.xs }]}>
        <Text style={[typography.small, { color: colors.textSecondary }]}>
          Total sets: {totalSets}
        </Text>
        <Text style={[typography.small, { color: colors.secondary }]}>
          Avg: {(totalSets / (workoutCount || 1)).toFixed(1)} sets/session
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
