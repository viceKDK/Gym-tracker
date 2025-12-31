import { useState, useEffect, useCallback } from 'react';
import { ActivityData } from '../types';
import { StatsRepository } from '../database/repositories/StatsRepository';
import { format, subDays } from 'date-fns';

/**
 * Hook to manage activity graph data
 * @param days Number of days to fetch (default 365)
 */
export function useActivityData(days: number = 365) {
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadActivity = useCallback(async () => {
    try {
      setLoading(true);
      const repo = new StatsRepository();
      const endDate = format(new Date(), 'yyyy-MM-dd');
      const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');
      const result = await repo.getActivityData(startDate, endDate);
      setData(result);
    } catch (e) {
      console.error('[useActivityData] Failed to load activity:', e);
    } finally {
      setLoading(false);
    }
  }, [days]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  return {
    data,
    loading,
    refresh: loadActivity,
  };
}
