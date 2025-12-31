import React from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { TodayWorkoutPreview } from '../components/routine/TodayWorkoutPreview';
import { useTodayRoutine } from '../hooks/useTodayRoutine';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { colors, typography, spacing } = useTheme();
  const { exercises } = useTodayRoutine();
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

        <View style={styles.activityPlaceholder}>
          <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.sm }]}>Activity</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>Activity Graph will be here (Story 5.2)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityPlaceholder: {
    padding: 16,
    marginTop: 16,
  },
});
