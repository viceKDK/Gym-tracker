import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { G } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';
import { ActivityData } from '../../types';
import { ActivitySquare } from './ActivitySquare';
import { 
  subDays, 
  format, 
  eachDayOfInterval, 
  getDay, 
  startOfWeek, 
  isSameDay,
  parseISO
} from 'date-fns';

interface ActivityGraphProps {
  data: ActivityData[];
  days?: number;
}

const SQUARE_SIZE = 12;
const SQUARE_GAP = 4;
const WEEK_HEIGHT = (SQUARE_SIZE + SQUARE_GAP) * 7;

export const ActivityGraph = ({ data, days = 365 }: ActivityGraphProps) => {
  const { colors, spacing, typography } = useTheme();

  const gridData = useMemo(() => {
    const end = new Date();
    const start = subDays(end, days);
    const interval = eachDayOfInterval({ start, end });

    // We want weeks as columns. 
    // Calculate the start of the first week to align the grid correctly
    const firstDay = interval[0];
    const firstDayOfWeek = getDay(firstDay); // 0 (Sun) to 6 (Sat)
    
    return interval.map((date, index) => {
      const dateStr = format(date, 'yyyy-MM-dd');
      const activity = data.find(d => d.date === dateStr);
      
      // Calculate position
      const dayIndex = index + firstDayOfWeek;
      const weekIndex = Math.floor(dayIndex / 7);
      const dayInWeek = dayIndex % 7;

      return {
        date,
        level: activity?.activity_level || 0,
        x: weekIndex * (SQUARE_SIZE + SQUARE_GAP),
        y: dayInWeek * (SQUARE_SIZE + SQUARE_GAP),
      };
    });
  }, [data, days]);

  const totalWidth = Math.ceil((days + 7) / 7) * (SQUARE_SIZE + SQUARE_GAP);

  return (
    <View style={[styles.container, { padding: spacing.md }]}>
      <View style={styles.header}>
        <Text style={[typography.small, { color: colors.textSecondary }]}>Last {days} days</Text>
      </View>
      
      <View style={styles.graphWrapper}>
        <Svg width="100%" height={WEEK_HEIGHT}>
          <G>
            {gridData.map((day, index) => (
              <ActivitySquare
                key={index}
                x={day.x}
                y={day.y}
                size={SQUARE_SIZE}
                level={day.level as any}
              />
            ))}
          </G>
        </Svg>
      </View>

      <View style={styles.legend}>
        <Text style={[typography.small, { color: colors.textSecondary, marginRight: spacing.xs }]}>Less</Text>
        {[0, 1, 2, 3, 4].map((level) => (
          <View 
            key={level} 
            style={[
              styles.legendSquare, 
              { 
                backgroundColor: colors.activityLevels[level as any],
                marginRight: 2
              }
            ]} 
          />
        ))}
        <Text style={[typography.small, { color: colors.textSecondary, marginLeft: spacing.xs }]}>More</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    marginBottom: 8,
  },
  graphWrapper: {
    flexDirection: 'row',
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  legendSquare: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});
