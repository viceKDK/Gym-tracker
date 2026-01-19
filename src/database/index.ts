/**
 * Database initialization and schema management for gym-TRAKER
 * Uses expo-sqlite with synchronous API (SDK 54+)
 */

import * as SQLite from 'expo-sqlite';
import { getDefaultExercises } from './defaultExercises';
import { Language } from '../i18n/translations';

const DATABASE_NAME = 'gym-traker.db';

// Database instance (lazy initialization)
let db: SQLite.SQLiteDatabase | null = null;

/**
 * Get or create the database instance
 */
export function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) {
    db = SQLite.openDatabaseSync(DATABASE_NAME);
    // Enable foreign keys
    db.execSync('PRAGMA foreign_keys = ON;');
  }
  return db;
}

/**
 * SQL statements for table creation
 */
const CREATE_EXERCISES_TABLE = `
  CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    muscle_group TEXT,
    image_url TEXT,
    video_url TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`;

const CREATE_ROUTINE_DAYS_TABLE = `
  CREATE TABLE IF NOT EXISTS routine_days (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
    exercise_id INTEGER NOT NULL,
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
  );
`;

const CREATE_WORKOUT_SESSIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS workout_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    completed_at TEXT,
    notes TEXT
  );
`;

const CREATE_WORKOUT_SETS_TABLE = `
  CREATE TABLE IF NOT EXISTS workout_sets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id INTEGER NOT NULL,
    exercise_id INTEGER NOT NULL,
    set_number INTEGER NOT NULL,
    weight REAL,
    reps INTEGER,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
  );
`;

/**
 * SQL statements for index creation
 */
const CREATE_INDEXES = `
  CREATE INDEX IF NOT EXISTS idx_sessions_date ON workout_sessions(date);
  CREATE INDEX IF NOT EXISTS idx_sets_session ON workout_sets(session_id);
  CREATE INDEX IF NOT EXISTS idx_sets_exercise ON workout_sets(exercise_id);
  CREATE INDEX IF NOT EXISTS idx_routine_day ON routine_days(day_of_week);
`;

/**
 * Migrate existing database to add new columns
 */
function migrateDatabase(): void {
  const database = getDatabase();

  try {
    // Check if muscle_group column exists
    const columns = database.getAllSync<{ name: string }>(
      "PRAGMA table_info(exercises)"
    );

    const hasMuscleGroup = columns.some(col => col.name === 'muscle_group');
    const hasImageUrl = columns.some(col => col.name === 'image_url');
    const hasVideoUrl = columns.some(col => col.name === 'video_url');

    if (!hasMuscleGroup) {
      console.log('[Database] Adding muscle_group column...');
      database.execSync('ALTER TABLE exercises ADD COLUMN muscle_group TEXT');
    }

    if (!hasImageUrl) {
      console.log('[Database] Adding image_url column...');
      database.execSync('ALTER TABLE exercises ADD COLUMN image_url TEXT');
    }

    if (!hasVideoUrl) {
      console.log('[Database] Adding video_url column...');
      database.execSync('ALTER TABLE exercises ADD COLUMN video_url TEXT');
    }

    console.log('[Database] Migration completed');
  } catch (error) {
    console.error('[Database] Migration failed:', error);
    throw error;
  }
}

/**
 * Seed the database with default exercises if they don't exist
 */
function seedDefaultExercises(language: Language = 'es'): void {
  const database = getDatabase();

  try {
    console.log('[Database] Checking for missing default exercises...');
    const defaultExercises = getDefaultExercises(language);
    
    // Get existing exercise names to avoid duplicates
    const existing = database.getAllSync<{ name: string }>('SELECT name FROM exercises');
    const existingNames = new Set(existing.map(e => e.name.toLowerCase()));

    let addedCount = 0;
    const stmt = database.prepareSync(
      'INSERT INTO exercises (name, category, muscle_group) VALUES (?, ?, ?)'
    );

    for (const exercise of defaultExercises) {
      if (!existingNames.has(exercise.name.toLowerCase())) {
        stmt.executeSync([exercise.name, exercise.category, exercise.muscleGroup || null]);
        addedCount++;
      }
    }

    if (addedCount > 0) {
      console.log(`[Database] Seeded ${addedCount} new default exercises`);
    }
  } catch (error) {
    console.error('[Database] Failed to seed exercises:', error);
    throw error;
  }
}

/**
 * Initialize the database schema
 * Creates all tables and indexes if they don't exist
 * Safe to call multiple times (idempotent)
 */
export function initializeDatabase(language: Language = 'es'): void {
  const database = getDatabase();

  try {
    // Create tables
    database.execSync(CREATE_EXERCISES_TABLE);
    database.execSync(CREATE_ROUTINE_DAYS_TABLE);
    database.execSync(CREATE_WORKOUT_SESSIONS_TABLE);
    database.execSync(CREATE_WORKOUT_SETS_TABLE);

    // Create indexes
    database.execSync(CREATE_INDEXES);

    console.log('[Database] Schema initialized successfully');

    // Run migrations for existing databases
    migrateDatabase();

    // Seed default exercises
    seedDefaultExercises(language);
  } catch (error) {
    console.error('[Database] Failed to initialize schema:', error);
    throw error;
  }
}

/**
 * Close the database connection
 * Call this when the app is shutting down
 */
export function closeDatabase(): void {
  if (db) {
    db.closeSync();
    db = null;
    console.log('[Database] Connection closed');
  }
}

/**
 * Check if the database has been initialized with tables
 */
export function isDatabaseInitialized(): boolean {
  try {
    const database = getDatabase();
    const result = database.getFirstSync<{ count: number }>(
      "SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name IN ('exercises', 'routine_days', 'workout_sessions', 'workout_sets')"
    );
    return result?.count === 4;
  } catch {
    return false;
  }
}

export default {
  getDatabase,
  initializeDatabase,
  closeDatabase,
  isDatabaseInitialized,
};
