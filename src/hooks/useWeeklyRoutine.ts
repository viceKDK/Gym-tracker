import { useState, useEffect, useCallback } from 'react';
import { DayOfWeek } from '../types';
import { RoutineRepository } from '../database/repositories/RoutineRepository';

interface DayOverview {
  day_of_week: DayOfWeek;
  exercise_count: number;
}

/**
 * Hook to manage the weekly routine overview
 */
export function useWeeklyRoutine() {
  const [overview, setOverview] = useState<DayOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadOverview = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const repo = new RoutineRepository();
      const data = await repo.getWeeklyOverview();
      setOverview(data);
    } catch (e) {
      console.error('[useWeeklyRoutine] Failed to load:', e);
      setError(e instanceof Error ? e : new Error('Unknown error loading weekly overview'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  return {
    overview,
    loading,
    error,
    refresh: loadOverview,
  };
}
