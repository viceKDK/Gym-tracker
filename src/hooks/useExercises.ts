import { useState, useEffect, useCallback } from 'react';
import { Exercise, ExerciseCategory } from '../types';
import { ExerciseRepository } from '../database/repositories/ExerciseRepository';

/**
 * Hook to manage exercise data
 * @param category Optional filter by category
 */
export function useExercises(category?: ExerciseCategory) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadExercises = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const repo = new ExerciseRepository();
      const data = category
        ? await repo.getByCategory(category)
        : await repo.getAll();
      setExercises(data);
    } catch (e) {
      console.error('[useExercises] Failed to load exercises:', e);
      setError(e instanceof Error ? e : new Error('Unknown error loading exercises'));
    } finally {
      setLoading(false);
    }
  }, [category]);

  // Initial load
  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  return {
    exercises,
    loading,
    error,
    refresh: loadExercises,
  };
}
