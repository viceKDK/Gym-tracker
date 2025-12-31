import { BaseRepository } from './BaseRepository';
import { 
  WorkoutSession, 
  WorkoutSet, 
  WorkoutSetWithExercise, 
  WorkoutSessionSummary,
  NewWorkoutSession,
  NewWorkoutSet
} from '../../types';

export class WorkoutRepository extends BaseRepository {
  /**
   * Create a new workout session for a date
   */
  async createSession(date: string): Promise<number> {
    const result = await this.db.runAsync(
      'INSERT INTO workout_sessions (date) VALUES (?)',
      [date]
    );
    return result.lastInsertRowId;
  }

  /**
   * Get session by date
   */
  async getSession(date: string): Promise<WorkoutSession | null> {
    return await this.getFirstAsync<WorkoutSession>(
      'SELECT * FROM workout_sessions WHERE date = ?',
      [date]
    );
  }

  /**
   * Complete a session
   */
  async completeSession(sessionId: number): Promise<void> {
    await this.runAsync(
      'UPDATE workout_sessions SET completed_at = CURRENT_TIMESTAMP WHERE id = ?',
      [sessionId]
    );
  }

  /**
   * Add a set to a session
   */
  async addSet(set: NewWorkoutSet): Promise<number> {
    const result = await this.db.runAsync(
      'INSERT INTO workout_sets (session_id, exercise_id, set_number, weight, reps) VALUES (?, ?, ?, ?, ?)',
      [set.session_id, set.exercise_id, set.set_number, set.weight ?? null, set.reps ?? null]
    );
    return result.lastInsertRowId;
  }

  /**
   * Get all sets for a session with exercise details
   */
  async getSetsForSession(sessionId: number): Promise<WorkoutSetWithExercise[]> {
    return await this.getAllAsync<WorkoutSetWithExercise>(
      `SELECT wst.*, e.name as exercise_name, e.category as exercise_category 
       FROM workout_sets wst 
       JOIN exercises e ON wst.exercise_id = e.id 
       WHERE wst.session_id = ? 
       ORDER BY wst.exercise_id, wst.set_number ASC`,
      [sessionId]
    );
  }

  /**
   * Get full workout history with summaries
   */
  async getWorkoutHistory(): Promise<WorkoutSessionSummary[]> {
    return await this.getAllAsync<WorkoutSessionSummary>(
      `SELECT ws.*, 
              COUNT(DISTINCT wst.exercise_id) as exercise_count, 
              COUNT(wst.id) as total_sets 
       FROM workout_sessions ws 
       LEFT JOIN workout_sets wst ON ws.id = wst.session_id 
       WHERE ws.completed_at IS NOT NULL
       GROUP BY ws.id 
       ORDER BY ws.date DESC`
    );
  }

  /**
   * Delete a set
   */
  async deleteSet(setId: number): Promise<void> {
    await this.runAsync('DELETE FROM workout_sets WHERE id = ?', [setId]);
  }

  /**
   * Update a set
   */
  async updateSet(setId: number, data: Partial<WorkoutSet>): Promise<void> {
    const fields = Object.keys(data).filter(k => k !== 'id' && k !== 'session_id' && k !== 'exercise_id');
    if (fields.length === 0) return;

    const setClause = fields.map(f => `${f} = ?`).join(', ');
    const params = [...fields.map(f => (data as any)[f]), setId];

    await this.runAsync(`UPDATE workout_sets SET ${setClause} WHERE id = ?`, params);
  }
}
