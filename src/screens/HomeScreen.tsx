import React, { useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { TodayWorkoutPreview } from '../components/routine/TodayWorkoutPreview';
import { ActivityGraph } from '../components/activity/ActivityGraph';
import { StreakCounter } from '../components/activity/StreakCounter';
import { useTodayRoutine } from '../hooks/useTodayRoutine';
import { useActivityData } from '../hooks/useActivityData';
import { useStreak } from '../hooks/useStreak';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { addDays, subDays } from 'date-fns';

export default function HomeScreen() {
  const { colors, typography, spacing } = useTheme();
  const { exercises } = useTodayRoutine();
  const { data: activityData, endDate, setEndDate, refresh: refreshActivity } = useActivityData();
  const { streak, refresh: refreshStreak } = useStreak();
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      refreshActivity();
      refreshStreak();
    }, [refreshActivity, refreshStreak])
  );

  const handlePrevPeriod = () => {
    setEndDate(prev => subDays(prev, 30));
  };

  const handleNextPeriod = () => {
    setEndDate(prev => {
      const next = addDays(prev, 30);
      return next > new Date() ? new Date() : next;
    });
  };

  const handleToday = () => {
    setEndDate(new Date());
  };

  const handleStartWorkout = () => {
    navigation.navigate('Workout');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingVertical: spacing.md }}>
        <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
          <Text style={[typography.h2, { color: colors.text }]}>Welcome back!</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>Ready for your training?</Text>
        </View>

        <StreakCounter count={streak} />

        <TodayWorkoutPreview 
          exercises={exercises} 
          onPress={handleStartWorkout} 
        />

        <View style={styles.activitySection}>
          <Text style={[typography.h3, { color: colors.text, marginLeft: spacing.md, marginBottom: spacing.sm }]}>Activity</Text>
          <ActivityGraph 
            data={activityData} 
            endDate={endDate}
            onPrev={handlePrevPeriod}
            onNext={handleNextPeriod}
            onToday={handleToday}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activitySection: {
    marginTop: 16,
  },
});
