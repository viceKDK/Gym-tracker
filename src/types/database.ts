/**
 * Database entity types for gym-TRAKER
 */

// Exercise categories
export type ExerciseCategory = 'gym' | 'cardio' | 'abs' | 'calisthenics';

// Muscle groups
export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'abs'
  | 'obliques'
  | 'lowerBack'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'fullBody'
  | 'cardio';

// Day of week (0 = Sunday, 6 = Saturday)
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Exercise entity
 */
export interface Exercise {
  id: number;
  name: string;
  category: ExerciseCategory;
  muscle_group: MuscleGroup | null;
  image_url: string | null;
  video_url: string | null;
  created_at: string;
}

/**
 * Exercise without ID (for creation)
 */
export interface NewExercise {
  name: string;
  category: ExerciseCategory;
  muscle_group?: MuscleGroup | null;
  image_url?: string | null;
  video_url?: string | null;
}

/**
 * Routine day assignment
 */
export interface RoutineDay {
  id: number;
  day_of_week: DayOfWeek;
  exercise_id: number;
  order_index: number;
}

/**
 * Routine day with exercise details (joined)
 */
export interface RoutineDayWithExercise extends RoutineDay {
  exercise_name: string;
  exercise_category: ExerciseCategory;
  exercise_muscle_group: MuscleGroup | null;
}

/**
 * New routine day assignment (for creation)
 */
export interface NewRoutineDay {
  day_of_week: DayOfWeek;
  exercise_id: number;
  order_index?: number;
}

/**
 * Workout session
 */
export interface WorkoutSession {
  id: number;
  date: string; // ISO date string YYYY-MM-DD
  completed_at: string | null;
  notes: string | null;
}

/**
 * New workout session (for creation)
 */
export interface NewWorkoutSession {
  date: string;
  notes?: string;
}

/**
 * Workout set
 */
export interface WorkoutSet {
  id: number;
  session_id: number;
  exercise_id: number;
  set_number: number;
  weight: number | null;
  reps: number | null;
  created_at: string;
}

/**
 * Workout set with exercise details (joined)
 */
export interface WorkoutSetWithExercise extends WorkoutSet {
  exercise_name: string;
  exercise_category: ExerciseCategory;
  exercise_muscle_group: MuscleGroup | null;
}

/**
 * New workout set (for creation)
 */
export interface NewWorkoutSet {
  session_id: number;
  exercise_id: number;
  set_number: number;
  weight?: number | null;
  reps?: number | null;
}

/**
 * Workout session with summary (for history list)
 */
export interface WorkoutSessionSummary extends WorkoutSession {
  exercise_count: number;
  total_sets: number;
}

/**
 * Activity data for activity graph
 */
export interface ActivityData {
  date: string;
  exercise_count: number;
  total_sets: number;
  activity_level: 0 | 1 | 2 | 3 | 4;
}

/**
 * Personal record for an exercise
 */
export interface PersonalRecord {
  exercise_id: number;
  max_weight: number;
  achieved_at: string;
}
