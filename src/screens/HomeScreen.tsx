import React, { useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
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
  const { t } = useLanguage();
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

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: spacing.md, paddingVertical: spacing.sm }]}>
        <Text style={[typography.h2, { color: colors.text }]}>{t.screens.home}</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.lg }}>
        {/* Streak Counter */}
        <View style={{ marginTop: spacing.sm }}>
          <StreakCounter count={streak} />
        </View>

        {/* Today's Workout Preview */}
        <View style={{ marginTop: spacing.md }}>
          <TodayWorkoutPreview
            exercises={exercises}
            onPress={handleStartWorkout}
          />
        </View>

        {/* Activity Graph */}
        <View style={styles.activitySection}>
          <Text style={[typography.h3, { color: colors.text, marginLeft: spacing.md, marginBottom: spacing.sm }]}>
            {t.home.activityGraph}
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsButton: {
    padding: 8,
  },
  activitySection: {
    marginTop: 24,
  },
});
