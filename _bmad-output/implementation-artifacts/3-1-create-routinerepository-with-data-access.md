# Story 3.1: Create RoutineRepository with Data Access

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a repository to manage weekly routine data**,
so that **routine configuration operations are abstracted and reusable**.

## Acceptance Criteria

1. **Given** the `RoutineRepository` class exists, **When** `getByDay(2)` is called (Tuesday), **Then** it returns all exercises assigned to Tuesday ordered by `order_index`, **And** includes exercise details (name, category) via JOIN.
2. **Given** the `RoutineRepository` class exists, **When** `getWeeklyOverview()` is called, **Then** it returns an array of 7 days (0-6) with their assigned exercises, **And** each day entry includes exercise count.
3. **Given** an `exercise_id` and `day_of_week`, **When** `assignExercise(exerciseId, dayOfWeek, orderIndex)` is called, **Then** a new `routine_days` record is created, **And** the exercise is assigned to that day.
4. **Given** an existing routine assignment, **When** `removeExercise(routineDayId)` is called, **Then** the assignment is deleted from `routine_days`.
5. **Given** a `day_of_week` value, **When** `clearDay(dayOfWeek)` is called, **Then** all `routine_days` records for that day are deleted.
6. **Given** the `useTodayRoutine()` hook is used, **When** the component mounts, **Then** today's exercises are loaded based on current weekday, **And** loading and error states are available.

## Tasks / Subtasks

- [ ] Task 1: Implement RoutineRepository (AC: #1, #2, #3, #4, #5)
  - [ ] Create `src/database/repositories/RoutineRepository.ts`
  - [ ] Implement `getByDay(day)` with SQL JOIN to exercises table
  - [ ] Implement `getWeeklyOverview()`
  - [ ] Implement `assignExercise()`, `removeExercise()`, and `clearDay()`
- [ ] Task 2: Create Routine Data Hooks (AC: #6)
  - [ ] Create `src/hooks/useTodayRoutine.ts`
  - [ ] Create `src/hooks/useWeeklyRoutine.ts`
- [ ] Task 3: Export Repositories and Hooks
  - [ ] Update `src/database/repositories/index.ts`
  - [ ] Update `src/hooks/index.ts`
- [ ] Task 4: Verification
  - [ ] Verify SQL JOIN queries
  - [ ] Verify sorting by `order_index`

## Dev Notes

### SQL Queries
- `getByDay`: `SELECT rd.*, e.name, e.category FROM routine_days rd JOIN exercises e ON rd.exercise_id = e.id WHERE rd.day_of_week = ? ORDER BY rd.order_index`

### Day Representation
- Use 0-6 (Sunday-Saturday) to align with JavaScript's `new Date().getDay()`.

### References
- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 3.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
