import { useState, useEffect, useCallback } from 'react';
import { RoutineDayWithExercise, DayOfWeek } from '../types';
import { RoutineRepository } from '../database/repositories/RoutineRepository';

/**
 * Hook to manage today's routine exercises
 */
export function useTodayRoutine() {
  const [exercises, setExercises] = useState<RoutineDayWithExercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTodayRoutine = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const today = new Date().getDay() as DayOfWeek;
      const repo = new RoutineRepository();
      const data = await repo.getByDay(today);
      setExercises(data);
    } catch (e) {
      console.error('[useTodayRoutine] Failed to load:', e);
      setError(e instanceof Error ? e : new Error('Unknown error loading today routine'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTodayRoutine();
  }, [loadTodayRoutine]);

  return {
    exercises,
    loading,
    error,
    refresh: loadTodayRoutine,
  };
}
