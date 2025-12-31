import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { RoutineDayWithExercise } from '../../types';
import { CategoryBadge } from '../exercise/CategoryBadge';
import { Card } from '../ui/Card';

interface TodayRoutineProps {
  exercises: RoutineDayWithExercise[];
  loading: boolean;
}

export const TodayRoutine = ({ exercises, loading }: TodayRoutineProps) => {
  const { colors, spacing, typography } = useTheme();

  if (loading && exercises.length === 0) return null;

  const renderItem = ({ item }: { item: RoutineDayWithExercise }) => (
    <View style={[styles.item, { paddingVertical: spacing.sm }]}>
      <View style={styles.itemLeft}>
        <Text style={[typography.bodyBold, { color: colors.text }]}>{item.exercise_name}</Text>
        <CategoryBadge category={item.exercise_category} />
      </View>
    </View>
  );

  return (
    <Card style={styles.container}>
      <Text style={[typography.h3, { color: colors.primary, marginBottom: spacing.md }]}>
        Today's Routine
      </Text>
      
      {exercises.length === 0 ? (
        <Text style={[typography.body, { color: colors.textSecondary, fontStyle: 'italic' }]}>
          Rest Day - Enjoy your recovery! 🧘
        </Text>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.border }]} />}
        />
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    height: 1,
    width: '100%',
  },
});
