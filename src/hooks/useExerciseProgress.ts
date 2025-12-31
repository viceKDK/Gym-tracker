import { useState, useEffect, useCallback } from 'react';
import { StatsRepository } from '../database/repositories/StatsRepository';

/**
 * Hook to fetch historical progress for a specific exercise
 */
export function useExerciseProgress(exerciseId: number) {
  const [data, setData] = useState<{ date: string; max_weight: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      const repo = new StatsRepository();
      const result = await repo.getExerciseProgress(exerciseId);
      setData(result);
    } catch (e) {
      console.error('[useExerciseProgress] Failed to load:', e);
    } finally {
      setLoading(false);
    }
  }, [exerciseId]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  return { data, loading, refresh: loadProgress };
}
