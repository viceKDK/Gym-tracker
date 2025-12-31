import React from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { TodayWorkoutPreview } from '../components/routine/TodayWorkoutPreview';
import { ActivityGraph } from '../components/activity/ActivityGraph';
import { useTodayRoutine } from '../hooks/useTodayRoutine';
import { useActivityData } from '../hooks/useActivityData';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { colors, typography, spacing } = useTheme();
  const { exercises } = useTodayRoutine();
  const { data: activityData, loading: loadingActivity } = useActivityData();
  const navigation = useNavigation<any>();

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

        <TodayWorkoutPreview 
          exercises={exercises} 
          onPress={handleStartWorkout} 
        />

        <View style={styles.activitySection}>
          <Text style={[typography.h3, { color: colors.text, marginLeft: spacing.md, marginBottom: spacing.sm }]}>Activity</Text>
          <ActivityGraph data={activityData} />
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
