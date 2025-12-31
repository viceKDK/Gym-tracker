import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Button } from '../components/ui';
import { WorkoutRepository } from '../database/repositories/WorkoutRepository';
import { format } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { useDraftRecovery } from '../hooks/useDraftRecovery';
import { ResumeWorkoutPrompt } from '../components/workout/ResumeWorkoutPrompt';

export default function WorkoutScreen() {
  const { colors, spacing, typography, borderRadius, shadows } = useTheme();
  const navigation = useNavigation<any>();
  const [hasTodaySession, setHasTodaySession] = useState(false);
  const { draft, discardDraft, refresh: refreshDraft } = useDraftRecovery();

  const checkTodaySession = useCallback(async () => {
    const repo = new WorkoutRepository();
    const today = format(new Date(), 'yyyy-MM-dd');
    const session = await repo.getSession(today);
    setHasTodaySession(!!session);
    refreshDraft();
  }, [refreshDraft]);

  useFocusEffect(
    useCallback(() => {
      checkTodaySession();
    }, [checkTodaySession])
  );

  const handleStartWorkout = () => {
    if (hasTodaySession) {
      navigation.navigate('LogWorkout');
    } else {
      navigation.navigate('LogWorkout');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ padding: spacing.md, flexGrow: 1 }}>
        <View style={styles.header}>
          <Text style={[typography.h2, { color: colors.text }]}>Workout</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            Log your training and track sets
          </Text>
        </View>

        <View style={styles.content}>
          {draft && (
            <ResumeWorkoutPrompt 
              timestamp={draft.timestamp} 
              onResume={() => navigation.navigate('LogWorkout')}
              onDiscard={discardDraft}
            />
          )}

          <TouchableOpacity 
            activeOpacity={0.8}
            onPress={handleStartWorkout}
            style={[
              styles.startCard, 
              { 
                backgroundColor: colors.primary, 
                borderRadius: borderRadius.xl,
                padding: spacing.xl,
                ...shadows.lg,
                marginTop: draft ? 0 : spacing.xl
              }
            ]}
          >
            <MaterialIcons name="play-circle-filled" size={64} color="white" />
            <Text style={[typography.h3, { color: 'white', marginTop: spacing.md }]}>
              {hasTodaySession ? 'RESUME WORKOUT' : 'START WORKOUT'}
            </Text>
            <Text style={[typography.small, { color: 'rgba(255,255,255,0.8)', marginTop: spacing.xs }]}>
              {format(new Date(), 'EEEE, MMMM do')}
            </Text>
          </TouchableOpacity>

          <View style={[styles.historyShortcut, { marginTop: spacing.xxl }]}>
            <Button 
              title="View Workout History" 
              onPress={() => navigation.navigate('WorkoutHistory')} 
              variant="secondary"
              leftIcon={<MaterialIcons name="history" size={20} color={colors.textSecondary} />}
            />
          </View>
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
    marginBottom: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startCard: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyShortcut: {
    width: '100%',
  },
});