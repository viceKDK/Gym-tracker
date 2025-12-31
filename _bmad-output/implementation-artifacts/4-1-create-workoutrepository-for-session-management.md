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

- [x] Task 1: Implement WorkoutRepository (AC: #1, #2, #3, #4, #5, #6)
  - [x] Create `src/database/repositories/WorkoutRepository.ts`
  - [x] Implement `createSession`, `getSession`, and `completeSession`
  - [x] Implement `addSet` and `getSetsForSession` (with JOIN to exercises)
  - [x] Implement `getWorkoutHistory` with aggregation for exercise and set counts
- [x] Task 2: Create Workout Session Hook (AC: #7)
  - [x] Create `src/hooks/useWorkoutSession.ts`
  - [x] Implement state for current session and sets
  - [x] Provide methods for adding sets and finishing the workout
- [x] Task 3: Export Repository and Hook
  - [x] Update `src/database/repositories/index.ts`
  - [x] Update `src/hooks/index.ts`
- [x] Task 4: Verification
  - [x] Verify SQL aggregation queries for history
  - [x] Verify sorting of sets and history sessions

## Dev Notes

- `WorkoutRepository` handles session lifecycle and set logging.
- `getWorkoutHistory` uses SQL aggregation to provide exercise and set counts in a single query.
- `useWorkoutSession` hook automatically handles today's session creation if it doesn't exist.
- Verified with `tsc`.

### Project Structure Notes

- New repository and hook integrated into established index exports.

### References

- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 4.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Workout persistence layer implemented.
- Session management hook ready for UI integration.

### File List

- `src/database/repositories/WorkoutRepository.ts`
- `src/database/repositories/index.ts`
- `src/hooks/useWorkoutSession.ts`
- `src/hooks/index.ts`
