import { BaseRepository } from './BaseRepository';
import { ActivityData, Exercise } from '../../types';
import { differenceInDays, parseISO } from 'date-fns';

export class StatsRepository extends BaseRepository {
  /**
   * Get activity data for a date range
   */
  async getActivityData(startDate: string, endDate: string): Promise<ActivityData[]> {
    const results = await this.getAllAsync<{ date: string; exercise_count: number; total_sets: number }>(
      `SELECT ws.date, 
              COUNT(DISTINCT wst.exercise_id) as exercise_count, 
              COUNT(wst.id) as total_sets 
       FROM workout_sessions ws 
       JOIN workout_sets wst ON ws.id = wst.session_id 
       WHERE ws.date >= ? AND ws.date <= ? 
       GROUP BY ws.date`,
      [startDate, endDate]
    );

    return results.map(r => ({
      ...r,
      activity_level: this.calculateActivityLevel(r.exercise_count)
    }));
  }

  /**
   * Get the current workout streak
   */
  async getCurrentStreak(): Promise<number> {
    const results = await this.getAllAsync<{ date: string }>(
      `SELECT DISTINCT date 
       FROM workout_sessions 
       WHERE completed_at IS NOT NULL
       ORDER BY date DESC`
    );

    if (results.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let lastDate = parseISO(results[0].date);
    lastDate.setHours(0, 0, 0, 0);

    // If the last workout was not today or yesterday, the streak is broken
    const diff = differenceInDays(today, lastDate);
    if (diff > 1) return 0;

    streak = 1;
    for (let i = 1; i < results.length; i++) {
      const current = parseISO(results[i].date);
      const prev = parseISO(results[i - 1].date);
      if (differenceInDays(prev, current) === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Get all exercises that have at least one workout set logged
   */
  async getExercisesWithHistory(): Promise<(Exercise & { last_date: string; last_weight: number })[]> {
    return await this.getAllAsync<Exercise & { last_date: string; last_weight: number }>(
      `SELECT e.*, MAX(wst.created_at) as last_date, MAX(wst.weight) as last_weight 
       FROM exercises e 
       JOIN workout_sets wst ON e.id = wst.exercise_id 
       GROUP BY e.id 
       ORDER BY last_date DESC`
    );
  }

  /**
   * Get historical progress for an exercise (max weight per session)
   */
  async getExerciseProgress(exerciseId: number): Promise<{ date: string; max_weight: number }[]> {
    return await this.getAllAsync<{ date: string; max_weight: number }>(
      `SELECT ws.date, MAX(wst.weight) as max_weight 
       FROM workout_sessions ws 
       JOIN workout_sets wst ON ws.id = wst.session_id 
       WHERE wst.exercise_id = ? 
       GROUP BY ws.date 
       ORDER BY ws.date ASC`,
      [exerciseId]
    );
  }

  /**
   * Get the personal record for an exercise (max weight)
   */
  async getPRForExercise(exerciseId: number): Promise<{ max_weight: number; achieved_at: string } | null> {
    return await this.getFirstAsync<{ max_weight: number; achieved_at: string }>(
      `SELECT weight as max_weight, created_at as achieved_at 
       FROM workout_sets 
       WHERE exercise_id = ? 
       ORDER BY weight DESC, created_at DESC 
       LIMIT 1`,
      [exerciseId]
    );
  }

  /**
   * Helper to map exercise count to intensity level (0-4)
   */
  private calculateActivityLevel(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    return 4;
  }
}
