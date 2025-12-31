import { BaseRepository } from './BaseRepository';
import { RoutineDay, RoutineDayWithExercise, NewRoutineDay, DayOfWeek } from '../../types';

export class RoutineRepository extends BaseRepository {
  /**
   * Get all exercises for a specific day of the week
   */
  async getByDay(day: DayOfWeek): Promise<RoutineDayWithExercise[]> {
    return await this.getAllAsync<RoutineDayWithExercise>(
      `SELECT rd.*, e.name as exercise_name, e.category as exercise_category 
       FROM routine_days rd 
       JOIN exercises e ON rd.exercise_id = e.id 
       WHERE rd.day_of_week = ? 
       ORDER BY rd.order_index ASC`,
      [day]
    );
  }

  /**
   * Get an overview of the weekly routine (count and names of exercises per day)
   */
  async getWeeklyOverview(): Promise<{ day_of_week: DayOfWeek; exercise_count: number; exercise_names: string[] }[]> {
    const results = await this.getAllAsync<{ day_of_week: DayOfWeek; exercise_id: number; exercise_name: string }>(
      `SELECT rd.day_of_week, rd.exercise_id, e.name as exercise_name 
       FROM routine_days rd 
       JOIN exercises e ON rd.exercise_id = e.id 
       ORDER BY rd.day_of_week, rd.order_index ASC`
    );

    const overview = Array.from({ length: 7 }, (_, i) => {
      const day = i as DayOfWeek;
      const dayExercises = results.filter(r => r.day_of_week === day);
      return {
        day_of_week: day,
        exercise_count: dayExercises.length,
        exercise_names: dayExercises.map(e => e.exercise_name),
      };
    });

    return overview;
  }

  /**
   * Assign an exercise to a day
   */
  async assignExercise(exerciseId: number, dayOfWeek: DayOfWeek, orderIndex: number = 0): Promise<RoutineDay> {
    const result = await this.db.runAsync(
      'INSERT INTO routine_days (exercise_id, day_of_week, order_index) VALUES (?, ?, ?)',
      [exerciseId, dayOfWeek, orderIndex]
    );

    return {
      id: result.lastInsertRowId,
      exercise_id: exerciseId,
      day_of_week: dayOfWeek,
      order_index: orderIndex,
    };
  }

  /**
   * Remove an exercise assignment
   */
  async removeExercise(routineDayId: number): Promise<void> {
    await this.runAsync('DELETE FROM routine_days WHERE id = ?', [routineDayId]);
  }

  /**
   * Clear all assignments for a specific day
   */
  async clearDay(dayOfWeek: DayOfWeek): Promise<void> {
    await this.runAsync('DELETE FROM routine_days WHERE day_of_week = ?', [dayOfWeek]);
  }

  /**
   * Update the order of exercises for a day
   */
  async updateOrder(assignments: { id: number; order_index: number }[]): Promise<void> {
    for (const assignment of assignments) {
      await this.runAsync(
        'UPDATE routine_days SET order_index = ? WHERE id = ?',
        [assignment.order_index, assignment.id]
      );
    }
  }
}
