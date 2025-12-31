# Story 4.1: Create WorkoutRepository for Session Management

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a repository to manage workout sessions and sets**,
so that **workout logging operations are abstracted and reusable**.

## Acceptance Criteria

1. **Given** the `WorkoutRepository` class exists, **When** `createSession(date)` is called with today's date, **Then** a new `workout_sessions` record is created, **And** the session id is returned.
2. **Given** a session exists for a specific date, **When** `getSession(date)` is called, **Then** it returns the session with id, date, completed_at, notes.
3. **Given** a session exists, **When** `completeSession(sessionId)` is called, **Then** the `completed_at` field is set to current timestamp.
4. **Given** a session exists, **When** `addSet(sessionId, exerciseId, setNumber, weight, reps)` is called, **Then** a new `workout_sets` record is created, **And** the set data is saved.
5. **Given** a session has sets logged, **When** `getSetsForSession(sessionId)` is called, **Then** all `workout_sets` for that session are returned with exercise details (JOIN), **And** sets are ordered by exercise, then `set_number`.
6. **Given** workout history exists, **When** `getWorkoutHistory()` is called, **Then** all `workout_sessions` are returned ordered by date DESC, **And** each includes exercise count and total sets count.
7. **Given** the `useWorkoutSession()` hook is used, **When** a component mounts, **Then** the current session state is available, **And** methods to add sets and complete session are provided.

## Tasks / Subtasks

- [ ] Task 1: Implement WorkoutRepository (AC: #1, #2, #3, #4, #5, #6)
  - [ ] Create `src/database/repositories/WorkoutRepository.ts`
  - [ ] Implement `createSession`, `getSession`, and `completeSession`
  - [ ] Implement `addSet` and `getSetsForSession` (with JOIN to exercises)
  - [ ] Implement `getWorkoutHistory` with aggregation for exercise and set counts
- [ ] Task 2: Create Workout Session Hook (AC: #7)
  - [ ] Create `src/hooks/useWorkoutSession.ts`
  - [ ] Implement state for current session and sets
  - [ ] Provide methods for adding sets and finishing the workout
- [ ] Task 3: Export Repository and Hook
  - [ ] Update `src/database/repositories/index.ts`
  - [ ] Update `src/hooks/index.ts`
- [ ] Task 4: Verification
  - [ ] Verify SQL aggregation queries for history
  - [ ] Verify sorting of sets and history sessions

## Dev Notes

### SQL Queries
- `getWorkoutHistory`: `SELECT ws.*, COUNT(DISTINCT wst.exercise_id) as exercise_count, COUNT(wst.id) as total_sets FROM workout_sessions ws LEFT JOIN workout_sets wst ON ws.id = wst.session_id GROUP BY ws.id ORDER BY ws.date DESC`

### references
- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 4.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
