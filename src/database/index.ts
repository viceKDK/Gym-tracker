/**
 * Database initialization and schema management for gym-TRAKER
 * Uses expo-sqlite with synchronous API (SDK 54+)
 */

import * as SQLite from 'expo-sqlite';

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
    category TEXT NOT NULL CHECK (category IN ('gym', 'cardio', 'abs')),
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
 * Initialize the database schema
 * Creates all tables and indexes if they don't exist
 * Safe to call multiple times (idempotent)
 */
export function initializeDatabase(): void {
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
