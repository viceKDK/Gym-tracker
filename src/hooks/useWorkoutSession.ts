import { useState, useEffect, useCallback } from 'react';
import { WorkoutSession, WorkoutSetWithExercise, NewWorkoutSet } from '../types';
import { WorkoutRepository } from '../database/repositories/WorkoutRepository';
import { StatsRepository } from '../database/repositories/StatsRepository';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DRAFT_KEY = '@workout_draft';

/**
 * Hook to manage an active or past workout session
 * @param date ISO date string (YYYY-MM-DD)
 */
export function useWorkoutSession(date: string = format(new Date(), 'yyyy-MM-dd')) {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [sets, setSets] = useState<WorkoutSetWithExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastNewPR, setLastNewPR] = useState<{ exerciseId: number; weight: number } | null>(null);

  const loadSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const repo = new WorkoutRepository();
      
      let currentSession = await repo.getSession(date);
      
      if (!currentSession && date === format(new Date(), 'yyyy-MM-dd')) {
        // Create today's session if it doesn't exist
        await repo.createSession(date);
        currentSession = await repo.getSession(date);
      }

      if (currentSession) {
        setSession(currentSession);
        const sessionSets = await repo.getSetsForSession(currentSession.id);
        setSets(sessionSets);
      }
    } catch (e) {
      console.error('[useWorkoutSession] Failed to load session:', e);
      setError(e instanceof Error ? e : new Error('Unknown error loading session'));
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Auto-save logic
  useEffect(() => {
    if (!session || session.completed_at) return;

    const interval = setInterval(async () => {
      try {
        const draft = {
          date,
          sessionId: session.id,
          timestamp: new Date().getTime(),
        };
        await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        console.log('[useWorkoutSession] Draft auto-saved');
      } catch (e) {
        console.error('[useWorkoutSession] Auto-save failed:', e);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [session, date]);

  const addSet = async (exerciseId: number, weight: number | null, reps: number | null) => {
    if (!session) return;

    try {
      const repo = new WorkoutRepository();
      const statsRepo = new StatsRepository();
      
      // Check for new PR before adding
      if (weight !== null) {
        const currentPR = await statsRepo.getPRForExercise(exerciseId);
        if (!currentPR || weight > currentPR.max_weight) {
          setLastNewPR({ exerciseId, weight });
          // Clear PR notification after a delay
          setTimeout(() => setLastNewPR(null), 3000);
        }
      }

      // Calculate next set number for this exercise
      const exerciseSets = sets.filter(s => s.exercise_id === exerciseId);
      const setNumber = exerciseSets.length + 1;

      const newSet: NewWorkoutSet = {
        session_id: session.id,
        exercise_id: exerciseId,
        set_number: setNumber,
        weight,
        reps,
      };

      await repo.addSet(newSet);
      // Reload sets
      const updatedSets = await repo.getSetsForSession(session.id);
      setSets(updatedSets);
    } catch (e) {
      console.error('[useWorkoutSession] Failed to add set:', e);
      throw e;
    }
  };

  const completeSession = async () => {
    if (!session) return;
    try {
      const repo = new WorkoutRepository();
      await repo.completeSession(session.id);
      await AsyncStorage.removeItem(DRAFT_KEY);
      const updated = await repo.getSession(date);
      setSession(updated);
    } catch (e) {
      console.error('[useWorkoutSession] Failed to complete session:', e);
      throw e;
    }
  };

  return {
    session,
    sets,
    loading,
    error,
    lastNewPR,
    addSet,
    completeSession,
    refresh: loadSession,
  };
}
