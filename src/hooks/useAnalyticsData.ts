import { useState, useEffect, useCallback } from 'react';
import { StatsRepository } from '../database/repositories/StatsRepository';

export interface AnalyticsData {
  weeklyVolume: { week_start: string; total_volume: number }[];
  categoryDistribution: { category: string; set_count: number }[];
  monthlySummary: { month: string; workout_count: number; total_sets: number }[];
}

/**
 * Hook to manage advanced analytics data
 */
export function useAnalyticsData() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const repo = new StatsRepository();
      
      const [weeklyVolume, categoryDistribution, monthlySummary] = await Promise.all([
        repo.getWeeklyVolumeComparison(),
        repo.getCategoryDistribution(),
        repo.getMonthlyAnalyticsSummary(),
      ]);

      setData({
        weeklyVolume,
        categoryDistribution,
        monthlySummary,
      });
    } catch (e) {
      console.error('[useAnalyticsData] Failed to load analytics:', e);
      setError(e instanceof Error ? e : new Error('Unknown error loading analytics'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    data,
    loading,
    error,
    refresh: loadAnalytics,
  };
}
