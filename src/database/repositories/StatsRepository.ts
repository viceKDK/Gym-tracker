import { BaseRepository } from './BaseRepository';
import { ActivityData, Exercise } from '../../types';
import { differenceInDays, parseISO } from 'date-fns';

export class StatsRepository extends BaseRepository {
  /**
   * Get activity data for a date range
   */
  async getActivityData(startDate: string, endDate: string): Promise<ActivityData[]> {
    // We need to fetch data with a window function to compare with previous workout
    // SQLite window functions are supported in recent versions (Expo includes a recent one)
    const results = await this.getAllAsync<{ 
      date: string; 
      exercise_count: number; 
      total_sets: number;
      volume: number;
      prev_volume: number;
    }>(
      `WITH daily_stats AS (
         SELECT ws.date, 
                COUNT(DISTINCT wst.exercise_id) as exercise_count, 
                COUNT(wst.id) as total_sets,
                SUM(COALESCE(wst.weight, 1) * COALESCE(wst.reps, 0)) as volume
         FROM workout_sessions ws 
         JOIN workout_sets wst ON ws.id = wst.session_id 
         WHERE ws.completed_at IS NOT NULL
         GROUP BY ws.date
       ),
       compared_stats AS (
         SELECT date, exercise_count, total_sets, volume,
                LAG(volume, 1, 0) OVER (ORDER BY date) as prev_volume
         FROM daily_stats
       )
       SELECT * FROM compared_stats 
       WHERE date >= ? AND date <= ?`,
      [startDate, endDate]
    );

    return results.map(r => ({
      date: r.date,
      exercise_count: r.exercise_count,
      total_sets: r.total_sets,
      activity_level: this.calculateActivityLevel(r.total_sets, r.volume, r.prev_volume)
    }));
  }

  /**
   * Helper to map exercise count and volume progress to intensity level (0-4)
   */
  private calculateActivityLevel(sets: number, currentVolume: number, prevVolume: number): 0 | 1 | 2 | 3 | 4 {
    if (sets === 0) return 0;
    
    // Base level based on work done (sets)
    let level = 1;
    if (sets >= 4) level = 2;
    if (sets >= 8) level = 3; // High volume day base
    
    // Boost based on progress (User request: "if you did it with more weight it will look bluer")
    // comparison with last training day
    if (prevVolume > 0) {
      if (currentVolume > prevVolume) {
        level += 1; // Progress made
      }
      if (currentVolume > prevVolume * 1.1) {
        level += 1; // Significant progress (>10%)
      }
    } else {
       // First workout or no previous data, boost if meaningful work done
       if (sets >= 6) level += 1;
    }

    // Cap at 4
    return Math.min(level, 4) as 0 | 1 | 2 | 3 | 4;
  }
}
