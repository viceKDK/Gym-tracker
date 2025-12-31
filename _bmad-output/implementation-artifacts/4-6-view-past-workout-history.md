# Story 4.6: View Past Workout History

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see a list of all my past workouts**,
so that **I can review my training history**.

## Acceptance Criteria

1. **Given** the user navigates to the Workout tab, **When** they tap "History" or "Past Workouts", **Then** `WorkoutHistoryScreen` is displayed with a list of all completed sessions.
2. **Given** the workout history is displayed, **When** viewing the list, **Then** sessions are ordered by date descending (most recent first), **And** each entry shows: date, day of week, exercise count, total sets.
3. **Given** multiple workouts exist, **When** the user scrolls the history, **Then** the list scrolls smoothly, **And** uses virtualization for performance with many records.
4. **Given** no workout history exists yet, **When** the user views the history screen, **Then** an empty state "No workouts yet. Start your first one!" is shown.
5. **Given** the user taps on a workout entry, **When** selected, **Then** `WorkoutDetailScreen` opens showing full workout details (see Story 4.7).
6. **Given** workout history has 100+ sessions, **When** loading the history screen, **Then** it loads in under 2 seconds (NFR1), **And** queries complete in under 100ms (NFR6).

## Tasks / Subtasks

- [x] Task 1: Create Workout History Screen (AC: #1, #2, #4)
  - [x] Create `src/screens/WorkoutHistoryScreen.tsx`
  - [x] Fetch history using `WorkoutRepository.getWorkoutHistory()`
  - [x] Implement `FlatList` with virtualization
- [x] Task 2: Create History Item Component (Architecture Decision)
  - [x] Create `src/components/workout/HistoryItem.tsx`
  - [x] Implement date formatting and summary display
- [x] Task 3: Implement Navigation (AC: #5)
  - [x] Add `WorkoutHistory` to `WorkoutStack`
  - [x] Wire tap to `WorkoutDetailScreen` (to be created in Story 4.7)
- [x] Task 4: Verification (AC: #3, #6)
  - [x] Verify loading performance with mock history
  - [x] Verify date sorting

## Dev Notes

- `WorkoutHistoryScreen` provides a scrollable list of all completed sessions.
- `HistoryItem` displays a concise summary (date, exercise count, sets).
- Virtualization enabled via `FlatList` for efficient rendering of long histories.
- `useFocusEffect` ensures the list is refreshed when the user navigates back to it.
- Verified with `tsc`.

### Project Structure Notes

- New screen and component integrated into existing patterns.

### References

- [Source: epics.md#Story 4.6]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- History list UI implemented.
- Automatic refreshing on screen focus works.
- SQL aggregation query verified for summaries.

### File List

- `src/screens/WorkoutHistoryScreen.tsx`
- `src/components/workout/HistoryItem.tsx`
- `src/screens/index.ts`
- `src/navigation/Stacks.tsx`
