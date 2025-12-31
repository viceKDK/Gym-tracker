import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Text, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import { WorkoutRepository } from '../database/repositories/WorkoutRepository';
import { WorkoutSetWithExercise } from '../types';
import { DetailExerciseItem } from '../components/workout/DetailExerciseItem';
import { format, parseISO } from 'date-fns';

type RootStackParamList = {
  WorkoutDetail: { sessionId: number; date: string };
};

export default function WorkoutDetailScreen() {
  const { colors, spacing, typography } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkoutDetail'>>();
  const { sessionId, date } = route.params;

  const [sets, setSets] = useState<WorkoutSetWithExercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetails() {
      try {
        const repo = new WorkoutRepository();
        const data = await repo.getSetsForSession(sessionId);
        setSets(data);
      } catch (error) {
        console.error('[WorkoutDetail] Failed to load details:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [sessionId]);

  const groupedSets = useMemo(() => {
    return sets.reduce((acc: { [key: number]: { name: string; category: any; sets: WorkoutSetWithExercise[] } }, curr) => {
      if (!acc[curr.exercise_id]) {
        acc[curr.exercise_id] = {
          name: curr.exercise_name,
          category: curr.exercise_category,
          sets: []
        };
      }
      acc[curr.exercise_id].sets.push(curr);
      return acc;
    }, {});
  }, [sets]);

  const parsedDate = parseISO(date);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingVertical: spacing.md }}>
        <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.lg }}>
          <Text style={[typography.h2, { color: colors.text }]}>
            {format(parsedDate, 'EEEE, MMM do')}
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            Workout Summary
          </Text>
        </View>

        {Object.values(groupedSets).map((group, index) => (
          <DetailExerciseItem
            key={index}
            exerciseName={group.name}
            category={group.category}
            sets={group.sets}
          />
        ))}

        {sets.length === 0 && (
          <View style={styles.center}>
            <Text style={[typography.body, { color: colors.textSecondary }]}>No sets recorded for this session.</Text>
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
