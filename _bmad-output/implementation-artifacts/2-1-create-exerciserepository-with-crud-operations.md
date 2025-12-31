# Story 2.1: Create ExerciseRepository with CRUD Operations

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a repository to manage exercise data in SQLite**,
so that **exercise CRUD operations are abstracted and reusable**.

## Acceptance Criteria

1. **Given** the `ExerciseRepository` class exists, **When** `getAll()` is called, **Then** it returns all exercises ordered by category, then by name, **And** the query completes in under 100ms (NFR6).
2. **Given** the `ExerciseRepository` class exists, **When** `getByCategory('gym')` is called, **Then** it returns only exercises with category 'gym'.
3. **Given** valid exercise data `{name: "Press Banca", category: "gym"}`, **When** `create()` is called with this data, **Then** a new exercise is inserted into the database, **And** the created exercise with id is returned.
4. **Given** an existing exercise with id 1, **When** `update(1, {name: "Bench Press"})` is called, **Then** the exercise name is updated in the database, **And** the updated exercise is returned.
5. **Given** an existing exercise with id 1, **When** `delete(1)` is called, **Then** the exercise is removed from the database, **And** any routine_days referencing this exercise are also deleted (CASCADE).
6. **Given** the `useExercises()` hook is used in a component, **When** the component mounts, **Then** exercises are loaded automatically, **And** loading, error, and refresh states are available.

## Tasks / Subtasks

- [x] Task 1: Implement BaseRepository (Architecture Decision)
  - [x] Create `src/database/repositories/BaseRepository.ts`
  - [x] Implement generic helper methods for `runAsync`, `getAllAsync`, and `getFirstAsync` using `getDatabase()`
- [x] Task 2: Implement ExerciseRepository (AC: #1, #2, #3, #4, #5)
  - [x] Create `src/database/repositories/ExerciseRepository.ts` extending `BaseRepository`
  - [x] Implement `getAll()` with sorting by category then name
  - [x] Implement `getByCategory(category)`
  - [x] Implement `create(data)`
  - [x] Implement `update(id, data)`
  - [x] Implement `delete(id)`
- [x] Task 3: Create Exercise Data Hook (AC: #6)
  - [x] Create `src/hooks/useExercises.ts`
  - [x] Implement state for exercises, loading, and error
  - [x] Use `useEffect` to fetch data on mount
  - [x] Provide `refresh` function to manually reload data
- [x] Task 4: Export Repositories and Hooks
  - [x] Update `src/database/repositories/index.ts` (if it exists or create it)
  - [x] Update `src/hooks/index.ts` (if it exists or create it)
- [x] Task 5: Verification
  - [x] Verify TypeScript compilation
  - [x] Ensure SQL queries align with schema defined in Story 1.3

## Dev Notes

- Implemented `BaseRepository` to abstract `expo-sqlite` synchronous calls.
- `ExerciseRepository` provides full CRUD for exercises with proper sorting.
- `useExercises` hook handles loading states and refresh logic.
- Type names corrected to match `src/types/database.ts` (e.g., `NewExercise`).
- Verified with `tsc --noEmit`.
- Jest unit test created but execution blocked by environment syntax issues in `node_modules`.

### Project Structure Notes

- Repositories located in `src/database/repositories/`.
- Hooks located in `src/hooks/`.

### References

- [Source: architecture.md#Repository Pattern Implementation]
- [Source: architecture.md#Custom Hooks Pattern]
- [Source: epics.md#Story 2.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Repository pattern implemented.
- CRUD operations for exercises ready.
- React Hook for exercises available.

### File List

- `src/database/repositories/BaseRepository.ts`
- `src/database/repositories/ExerciseRepository.ts`
- `src/database/repositories/index.ts`
- `src/hooks/useExercises.ts`
- `src/hooks/index.ts`
- `src/database/repositories/__tests__/ExerciseRepository.test.ts`
