# Story 3.4: View Today's Scheduled Exercises

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see today's scheduled exercises immediately**,
so that **I know what workout to do without navigating**.

## Acceptance Criteria

1. **Given** today is Monday and Monday has exercises assigned, **When** the user views the Routine tab, **Then** "Today's Routine" section is prominently displayed at the top, **And** all Monday's exercises are listed.
2. **Given** today's routine is displayed, **When** the user views the exercise list, **Then** each exercise shows name and category, **And** exercises are in the configured order.
3. **Given** today is Saturday and Saturday is a rest day, **When** the user views the Routine tab, **Then** "Today's Routine" shows "Rest Day - No exercises scheduled", **And** a relaxing/encouraging message is optionally shown.
4. **Given** the Home tab exists, **When** the user views the Home screen, **Then** a "Today's Workout" preview card shows exercises scheduled for today, **And** tapping it navigates to the Routine tab or starts workout logging.
5. **Given** no routine has been configured yet, **When** the user views "Today's Routine", **Then** an empty state shows "No routine configured for today", **And** a button to configure today's exercises is shown.

## Tasks / Subtasks

- [x] Task 1: Create Today's Routine Component (Architecture Decision)
  - [x] Create `src/components/routine/TodayRoutine.tsx`
  - [x] Implement exercise list for the current day
  - [x] Add empty/rest day states
- [x] Task 2: Integrate Today's Routine in Routine Screen (AC: #1, #2, #3, #5)
  - [x] Use `useTodayRoutine` hook in `RoutineScreen.tsx`
  - [x] Place `TodayRoutine` at the top of the screen
- [x] Task 3: Create Home Screen Preview Card (AC: #4)
  - [x] Create `src/components/routine/TodayWorkoutPreview.tsx`
  - [x] Implement tap navigation to the Workout tab
- [x] Task 4: Integrate Preview in Home Screen
  - [x] Update `HomeScreen.tsx` to include the preview card
- [x] Task 5: Verification
  - [x] Verify that the routine correctly matches the actual weekday
  - [x] Verify navigation from Home screen to Workout/Routine

## Dev Notes

- `TodayRoutine` card added to the top of the Routine screen for quick access.
- `TodayWorkoutPreview` added to the Home screen as a call-to-action.
- Both components use the `useTodayRoutine` hook to automatically fetch the current day's exercises.
- Navigation logic implemented to direct users to the relevant sections.
- Verified with `tsc`.

### Project Structure Notes

- New routine-related components organized in `src/components/routine/`.

### References

- [Source: epics.md#Story 3.4]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Today's routine visibility implemented on Home and Routine screens.
- Automatic weekday detection works.
- Rest day states handled gracefully.

### File List

- `src/components/routine/TodayRoutine.tsx`
- `src/components/routine/TodayWorkoutPreview.tsx`
- `src/screens/RoutineScreen.tsx`
- `src/screens/HomeScreen.tsx`
