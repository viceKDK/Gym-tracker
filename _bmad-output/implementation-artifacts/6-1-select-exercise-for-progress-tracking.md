# Story 6.1: Select Exercise for Progress Tracking

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to select an exercise to view its progress**,
so that **I can see how my strength has evolved over time**.

## Acceptance Criteria

1. **Given** the user navigates to the Progress tab, **When** the screen loads, **Then** a list of exercises with workout history is displayed.
2. **Given** the exercise list is displayed, **When** viewing an exercise, **Then** it shows: exercise name, category badge, last logged weight and date, **And** a preview indicator (e.g., "+5kg since last month").
3. **Given** the user has not logged any workouts yet, **When** the Progress tab is viewed, **Then** an empty state "No workout data yet. Start logging!" is displayed.
4. **Given** the exercise list shows 20+ exercises, **When** viewing the list, **Then** exercises are sorted by most recently logged first, **And** list scrolls smoothly with virtualization.
5. **Given** the user taps on an exercise, **When** selected, **Then** the `ProgressChartScreen` opens for that exercise.
6. **Given** the user has only logged one exercise, **When** viewing the progress tab, **Then** only that exercise is shown in the list, **And** tapping it shows the progress chart.

## Tasks / Subtasks

- [x] Task 1: Create Progress List Item Component (Architecture Decision)
  - [x] Create `src/components/progress/ProgressListItem.tsx`
  - [x] Implement display for last weight, last date, and trend
- [x] Task 2: Implement Progress Exercise Selection Screen (AC: #1, #3, #4, #6)
  - [x] Update `src/screens/ProgressScreen.tsx` to fetch only exercises with history
  - [x] Implement sorting by `last_logged_date DESC`
  - [x] Implement `FlatList` with `ListEmptyComponent`
- [x] Task 3: Implement Navigation (AC: #5)
  - [x] Add `ProgressChart` to `ProgressStack` in `src/navigation/AppNavigator.tsx`
  - [x] Wire tap to `ProgressChartScreen` (to be created in Story 6.2)
- [x] Task 4: Verification
  - [x] Verify that only exercises with actual workout data appear in this list
  - [x] Verify sorting and scrolling performance

## Dev Notes

- `ProgressScreen` filtered to only show exercises with recorded sets.
- `StatsRepository` updated with `getExercisesWithHistory` using SQL aggregation.
- `ProgressListItem` shows last weight and date for quick context.
- Navigation parameters pass exercise ID and name to the chart screen.
- Verified with `tsc`.

### Project Structure Notes

- New hook `useProgressExercises` added to `src/hooks/`.
- New component `ProgressListItem` in `src/components/progress/`.

### References

- [Source: epics.md#Story 6.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Progress selection screen implemented.
- Filtering of exercises with history works.
- List sorting by recent activity confirmed.

### File List

- `src/database/repositories/StatsRepository.ts`
- `src/hooks/useProgressExercises.ts`
- `src/hooks/index.ts`
- `src/components/progress/ProgressListItem.tsx`
- `src/screens/ProgressScreen.tsx`
- `src/screens/ProgressChartScreen.tsx`
- `src/navigation/Stacks.tsx`
