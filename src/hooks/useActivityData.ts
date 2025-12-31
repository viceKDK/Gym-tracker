import { useState, useEffect, useCallback } from 'react';
import { ActivityData } from '../types';
import { StatsRepository } from '../database/repositories/StatsRepository';
import { format, subDays } from 'date-fns';

/**
 * Hook to manage activity graph data
 * @param initialDays Number of days to fetch (default 365)
 */
export function useActivityData(initialDays: number = 365) {
  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [endDate, setEndDate] = useState(new Date());

  const loadActivity = useCallback(async () => {
    try {
      setLoading(true);
      const repo = new StatsRepository();
      const endStr = format(endDate, 'yyyy-MM-dd');
      const startStr = format(subDays(endDate, initialDays), 'yyyy-MM-dd');
      const result = await repo.getActivityData(startStr, endStr);
      setData(result);
    } catch (e) {
      console.error('[useActivityData] Failed to load activity:', e);
    } finally {
      setLoading(false);
    }
  }, [initialDays, endDate]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  return {
    data,
    loading,
    endDate,
    setEndDate,
    refresh: loadActivity,
  };
}
