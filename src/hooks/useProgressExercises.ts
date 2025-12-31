import { useState, useEffect, useCallback } from 'react';
import { Exercise } from '../types';
import { StatsRepository } from '../database/repositories/StatsRepository';

type ProgressExercise = Exercise & { last_date: string; last_weight: number };

/**
 * Hook to manage the list of exercises with history for progress tracking
 */
export function useProgressExercises() {
  const [exercises, setExercises] = useState<ProgressExercise[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExercises = useCallback(async () => {
    try {
      setLoading(true);
      const repo = new StatsRepository();
      const data = await repo.getExercisesWithHistory();
      setExercises(data);
    } catch (e) {
      console.error('[useProgressExercises] Failed to load:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  return {
    exercises,
    loading,
    refresh: loadExercises,
  };
}
