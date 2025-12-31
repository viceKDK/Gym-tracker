import React, { useCallback } from 'react';
import { StyleSheet, ScrollView, Text, View, SafeAreaView, ActivityIndicator, RefreshControl } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useWeeklyRoutine } from '../hooks/useWeeklyRoutine';
import { DayCard } from '../components/routine/DayCard';
import { useNavigation } from '@react-navigation/native';
import { DayOfWeek } from '../types';

export default function RoutineScreen() {
  const { colors, spacing, typography } = useTheme();
  const { overview, loading, refresh } = useWeeklyRoutine();
  const navigation = useNavigation<any>();

  const today = new Date().getDay() as DayOfWeek;

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
          <RefreshControl refreshing={loading} onRefresh={refresh} colors={[colors.primary]} />
        }
      >
        <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
          <Text style={[typography.h2, { color: colors.text }]}>Weekly Routine</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            Configure your training schedule
          </Text>
        </View>

        {overview.length === 0 && loading ? (
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