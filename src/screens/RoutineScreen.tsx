import React, { useCallback } from 'react';
import { StyleSheet, ScrollView, Text, View, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useWeeklyRoutine } from '../hooks/useWeeklyRoutine';
import { DayCard } from '../components/routine/DayCard';
import { TodayRoutine } from '../components/routine/TodayRoutine';
import { useTodayRoutine } from '../hooks/useTodayRoutine';
import { useNavigation } from '@react-navigation/native';
import { DayOfWeek } from '../types';

export default function RoutineScreen() {
  const { colors, spacing, typography } = useTheme();
  const { overview, loading: loadingWeekly, refresh: refreshWeekly } = useWeeklyRoutine();
  const { exercises: todayExercises, loading: loadingToday, refresh: refreshToday } = useTodayRoutine();
  const navigation = useNavigation<any>();

  const today = new Date().getDay() as DayOfWeek;

  const handleRefresh = useCallback(() => {
    refreshWeekly();
    refreshToday();
  }, [refreshWeekly, refreshToday]);

  const handleDayPress = (day: DayOfWeek) => {
    navigation.navigate('DayConfig', { day });
  };

  // Reorder overview to start from Monday (1) to Sunday (0)
  const orderedOverview = [...overview.slice(1), overview[0]];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={{ paddingVertical: spacing.md }}
        refreshControl={
          <RefreshControl refreshing={loadingWeekly || loadingToday} onRefresh={handleRefresh} colors={[colors.primary]} />
        }
      >
        <TodayRoutine exercises={todayExercises} loading={loadingToday} />

        <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.md, marginTop: spacing.lg }}>
          <Text style={[typography.h2, { color: colors.text }]}>Weekly Routine</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            Configure your training schedule
          </Text>
        </View>

        {overview.length === 0 && loadingWeekly ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          orderedOverview.map((dayData) => (
            <DayCard
              key={dayData.day_of_week}
              dayOfWeek={dayData.day_of_week}
              exerciseNames={dayData.exercise_names}
              isToday={dayData.day_of_week === today}
              onPress={() => handleDayPress(dayData.day_of_week)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});