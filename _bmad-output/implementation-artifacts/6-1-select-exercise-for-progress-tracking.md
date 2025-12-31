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

- [ ] Task 1: Create Progress List Item Component (Architecture Decision)
  - [ ] Create `src/components/progress/ProgressListItem.tsx`
  - [ ] Implement display for last weight, last date, and trend
- [ ] Task 2: Implement Progress Exercise Selection Screen (AC: #1, #3, #4, #6)
  - [ ] Update `src/screens/ProgressScreen.tsx` to fetch only exercises with history
  - [ ] Implement sorting by `last_logged_date DESC`
  - [ ] Implement `FlatList` with `ListEmptyComponent`
- [ ] Task 3: Implement Navigation (AC: #5)
  - [ ] Add `ProgressChart` to `ProgressStack` in `src/navigation/AppNavigator.tsx`
  - [ ] Wire tap to `ProgressChartScreen` (to be created in Story 6.2)
- [ ] Task 4: Verification
  - [ ] Verify that only exercises with actual workout data appear in this list
  - [ ] Verify sorting and scrolling performance

## Dev Notes

### SQL Logic
- Use a query that filters exercises based on the existence of records in `workout_sets`.
- `SELECT e.*, MAX(wst.created_at) as last_date, MAX(wst.weight) as last_weight FROM exercises e JOIN workout_sets wst ON e.id = wst.exercise_id GROUP BY e.id ORDER BY last_date DESC`

### References
- [Source: epics.md#Story 6.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
