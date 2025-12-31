import { useState, useEffect, useCallback } from 'react';
import { StatsRepository } from '../database/repositories/StatsRepository';

/**
 * Hook to manage current workout streak
 */
export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadStreak = useCallback(async () => {
    try {
      setLoading(true);
      const repo = new StatsRepository();
      const result = await repo.getCurrentStreak();
      setStreak(result);
    } catch (e) {
      console.error('[useStreak] Failed to load streak:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStreak();
  }, [loadStreak]);

  return {
    streak,
    loading,
    refresh: loadStreak,
  };
}
