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

- [ ] Task 1: Create Today's Routine Component (Architecture Decision)
  - [ ] Create `src/components/routine/TodayRoutine.tsx`
  - [ ] Implement exercise list for the current day
  - [ ] Add empty/rest day states
- [ ] Task 2: Integrate Today's Routine in Routine Screen (AC: #1, #2, #3, #5)
  - [ ] Use `useTodayRoutine` hook in `RoutineScreen.tsx`
  - [ ] Place `TodayRoutine` at the top of the screen
- [ ] Task 3: Create Home Screen Preview Card (AC: #4)
  - [ ] Create `src/components/routine/TodayWorkoutPreview.tsx`
  - [ ] Implement tap navigation to the Workout tab
- [ ] Task 4: Integrate Preview in Home Screen
  - [ ] Update `HomeScreen.tsx` to include the preview card
- [ ] Task 5: Verification
  - [ ] Verify that the routine correctly matches the actual weekday
  - [ ] Verify navigation from Home screen to Workout/Routine

## Dev Notes

### UI/UX
- The "Today's Routine" on the Routine tab should feel like a quick checklist.
- The preview on the Home screen should be a "hero" or "call to action" card.

### References
- [Source: epics.md#Story 3.4]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
