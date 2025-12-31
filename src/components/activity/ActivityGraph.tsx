import React, { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { G } from 'react-native-svg';
import { useTheme } from '../../contexts/ThemeContext';
import { ActivityData } from '../../types';
import { ActivitySquare } from './ActivitySquare';
import {
  subDays,
  addDays,
  format,
  eachDayOfInterval,
  getDay,
  startOfWeek,
  isSameDay,
  parseISO,
  isAfter,
  startOfToday
} from 'date-fns';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ActivityGraphProps {
  data: ActivityData[];
  days?: number;
  endDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const SQUARE_SIZE = 12;
const SQUARE_GAP = 4;
const WEEK_HEIGHT = (SQUARE_SIZE + SQUARE_GAP) * 7;

export const ActivityGraph = ({ data, days = 365, endDate, onPrev, onNext, onToday }: ActivityGraphProps) => {
  const { colors, spacing, typography } = useTheme();

  const gridData = useMemo(() => {
    const end = endDate;
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
  }, [data, days, endDate]);

  const startDate = subDays(endDate, days);
  const isAtToday = isSameDay(endDate, startOfToday());

  return (
    <View style={[styles.container, { padding: spacing.md }]}>
      <View style={styles.header}>
        <View style={styles.dateRange}>
          <Text style={[typography.small, { color: colors.text, fontWeight: 'bold' }]}>
            {format(startDate, 'MMM yyyy')} - {format(endDate, 'MMM yyyy')}
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={onPrev} style={styles.controlBtn}>
            <MaterialIcons name="chevron-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={onNext} 
            disabled={isAtToday}
            style={[styles.controlBtn, isAtToday && { opacity: 0.3 }]}
          >
            <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
          </TouchableOpacity>
          {!isAtToday && (
            <TouchableOpacity onPress={onToday} style={[styles.todayBtn, { backgroundColor: colors.primary + '20', borderRadius: 4 }]}>
              <Text style={[typography.small, { color: colors.primary, fontWeight: 'bold' }]}>TODAY</Text>
            </TouchableOpacity>
          )}
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateRange: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlBtn: {
    padding: 4,
  },
  todayBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
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
