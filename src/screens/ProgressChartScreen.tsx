import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useExerciseProgress } from '../hooks/useExerciseProgress';
import { ProgressChart } from '../components/progress/ProgressChart';

type RootStackParamList = {
  ProgressChart: { exerciseId: number; exerciseName: string };
};

export default function ProgressChartScreen() {
  const { colors, typography, spacing } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'ProgressChart'>>();
  const { exerciseId, exerciseName } = route.params;

  const { data, loading } = useExerciseProgress(exerciseId);

  if (loading && data.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingVertical: spacing.md }}>
        <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
          <Text style={[typography.h2, { color: colors.text }]}>{exerciseName}</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>Strength Evolution</Text>
        </View>

        <ProgressChart data={data} />

        {data.length === 0 && (
          <View style={styles.center}>
            <Text style={[typography.body, { color: colors.textSecondary }]}>No progress data found for this exercise.</Text>
          </View>
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
