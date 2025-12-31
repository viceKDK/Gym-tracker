import { BaseRepository } from './BaseRepository';
import { Exercise, NewExercise, ExerciseCategory } from '../../types';

export class ExerciseRepository extends BaseRepository {
  /**
   * Get all exercises ordered by category, then by name
   */
  async getAll(): Promise<Exercise[]> {
    return await this.getAllAsync<Exercise>(
      'SELECT * FROM exercises ORDER BY category, name'
    );
  }

  /**
   * Get exercises by category
   */
  async getByCategory(category: ExerciseCategory): Promise<Exercise[]> {
    return await this.getAllAsync<Exercise>(
      'SELECT * FROM exercises WHERE category = ? ORDER BY name',
      [category]
    );
  }

  /**
   * Create a new exercise
   */
  async create(exercise: NewExercise): Promise<Exercise> {
    const result = await this.db.runAsync(
      'INSERT INTO exercises (name, category) VALUES (?, ?)',
      [exercise.name, exercise.category]
    );
    
    return {
      id: result.lastInsertRowId,
      name: exercise.name,
      category: exercise.category,
      created_at: new Date().toISOString(),
    };
  }

  /**
   * Update an existing exercise
   */
  async update(id: number, data: Partial<NewExercise>): Promise<Exercise> {
    const fields = Object.keys(data);
    if (fields.length === 0) {
      const existing = await this.getFirstAsync<Exercise>('SELECT * FROM exercises WHERE id = ?', [id]);
      if (!existing) throw new Error(`Exercise with id ${id} not found`);
      return existing;
    }

    const setClause = fields.map(f => `${f} = ?`).join(', ');
    const params = [...Object.values(data), id];

    await this.runAsync(`UPDATE exercises SET ${setClause} WHERE id = ?`, params);

    const updated = await this.getFirstAsync<Exercise>('SELECT * FROM exercises WHERE id = ?', [id]);
    if (!updated) throw new Error(`Exercise with id ${id} not found after update`);
    return updated;
  }

  /**
   * Delete an exercise (CASCADE handles routine_days and workout_sets)
   */
  async delete(id: number): Promise<void> {
    await this.runAsync('DELETE FROM exercises WHERE id = ?', [id]);
  }
}
