# Story 1.3: Initialize SQLite Database with Schema

Status: in-progress

## Story

As a **user**,
I want **my workout data stored locally on my device**,
So that **my data persists between sessions and never requires internet**.

## Acceptance Criteria

**Given** the app launches for the first time
**When** the database initialization runs
**Then** a SQLite database named "gym-traker.db" is created
**And** foreign keys are enabled via PRAGMA

**Given** the database is initialized
**When** the schema creation runs
**Then** the `exercises` table exists with columns: id (INTEGER PRIMARY KEY), name (TEXT NOT NULL), category (TEXT with CHECK constraint for 'gym'/'cardio'/'abs'), created_at (TEXT DEFAULT CURRENT_TIMESTAMP)

**Given** the database is initialized
**When** the schema creation runs
**Then** the `routine_days` table exists with columns: id, day_of_week (INTEGER 0-6), exercise_id (FK to exercises), order_index
**And** ON DELETE CASCADE is configured for exercise_id

**Given** the database is initialized
**When** the schema creation runs
**Then** the `workout_sessions` table exists with columns: id, date (TEXT NOT NULL UNIQUE), completed_at, notes

**Given** the database is initialized
**When** the schema creation runs
**Then** the `workout_sets` table exists with columns: id, session_id (FK), exercise_id (FK), set_number, weight (REAL), reps (INTEGER), created_at
**And** ON DELETE CASCADE is configured for both foreign keys

**Given** the database is initialized
**When** querying the database
**Then** indexes exist: idx_sessions_date, idx_sets_session, idx_sets_exercise, idx_routine_day

**Given** the app is closed and reopened
**When** the database initialization runs again
**Then** existing data is preserved (tables use IF NOT EXISTS)

## Tasks / Subtasks

- [ ] Task 1: Create Database Initialization Module (AC: #1)
  - [ ] Create src/database/index.ts with database initialization
  - [ ] Configure expo-sqlite with "gym-traker.db"
  - [ ] Enable foreign keys via PRAGMA
  - [ ] Export database instance and initialization function

- [ ] Task 2: Create Exercises Table (AC: #2)
  - [ ] Define exercises table schema with all columns
  - [ ] Add CHECK constraint for category values
  - [ ] Use IF NOT EXISTS for idempotent creation

- [ ] Task 3: Create Routine Days Table (AC: #3)
  - [ ] Define routine_days table schema
  - [ ] Configure FK to exercises with ON DELETE CASCADE
  - [ ] Add constraint for day_of_week (0-6)

- [ ] Task 4: Create Workout Sessions Table (AC: #4)
  - [ ] Define workout_sessions table schema
  - [ ] Add UNIQUE constraint on date column
  - [ ] Configure nullable completed_at and notes

- [ ] Task 5: Create Workout Sets Table (AC: #5)
  - [ ] Define workout_sets table schema
  - [ ] Configure FK to workout_sessions with CASCADE
  - [ ] Configure FK to exercises with CASCADE
  - [ ] Add weight as REAL, reps as INTEGER

- [ ] Task 6: Create Performance Indexes (AC: #6)
  - [ ] Create idx_sessions_date on workout_sessions(date)
  - [ ] Create idx_sets_session on workout_sets(session_id)
  - [ ] Create idx_sets_exercise on workout_sets(exercise_id)
  - [ ] Create idx_routine_day on routine_days(day_of_week)

- [ ] Task 7: Verify Database Initialization
  - [ ] Run TypeScript compilation check
  - [ ] Create types for database entities

## Dev Notes

### Database Schema (from Architecture)

```sql
-- exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('gym', 'cardio', 'abs')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- routine_days table
CREATE TABLE IF NOT EXISTS routine_days (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  exercise_id INTEGER NOT NULL,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- workout_sessions table
CREATE TABLE IF NOT EXISTS workout_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL UNIQUE,
  completed_at TEXT,
  notes TEXT
);

-- workout_sets table
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
```

### Indexes for Performance

```sql
CREATE INDEX IF NOT EXISTS idx_sessions_date ON workout_sessions(date);
CREATE INDEX IF NOT EXISTS idx_sets_session ON workout_sets(session_id);
CREATE INDEX IF NOT EXISTS idx_sets_exercise ON workout_sets(exercise_id);
CREATE INDEX IF NOT EXISTS idx_routine_day ON routine_days(day_of_week);
```

### expo-sqlite Usage (SDK 54)

The new expo-sqlite API uses synchronous operations:

```typescript
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('gym-traker.db');

// Enable foreign keys
db.execSync('PRAGMA foreign_keys = ON;');

// Execute statements
db.execSync(`CREATE TABLE IF NOT EXISTS ...`);
```

[Source: architecture.md - Section "Database Schema"]

### NFR Compliance

- NFR6: SQLite queries complete < 100ms for typical operations
- NFR7: No data loss under any normal usage scenario
- NFR9: Data persists correctly across app updates

### References

- [Source: architecture.md#Database Schema] - Complete schema definition
- [Source: architecture.md#Data Access Pattern] - Repository pattern
- [Source: epics.md#Story 1.3] - Story definition

## Dev Agent Record

### Agent Model Used

_To be filled by dev agent_

### Completion Notes List

_To be filled by dev agent:_
- Database initialization created: [ ]
- Exercises table created: [ ]
- Routine days table created: [ ]
- Workout sessions table created: [ ]
- Workout sets table created: [ ]
- Indexes created: [ ]
- TypeScript compiles: [ ]

### File List

_To be filled by dev agent_
