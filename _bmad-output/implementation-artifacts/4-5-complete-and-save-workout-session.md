# Story 4.5: Complete and Save Workout Session

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to finish and save my workout session**,
so that **it's recorded in my history and the activity graph updates**.

## Acceptance Criteria

1. **Given** the user has logged at least one set, **When** they tap "Complete Workout" button, **Then** the session's `completed_at` field is set to current timestamp, **And** a success message or animation is shown.
2. **Given** the workout is completed, **When** the success screen is displayed, **Then** a summary is shown: date, exercises count, total sets, **And** a "View Activity" button to navigate to Home.
3. **Given** the workout is completed successfully, **When** the user navigates to the Home tab, **Then** today's square in the activity graph is filled with color, **And** the change is immediately visible (no delay).
4. **Given** the user tries to complete a workout with no sets logged, **When** they tap "Complete Workout", **Then** a confirmation dialog asks "No sets logged. Complete anyway?", **And** they can choose to complete or cancel.
5. **Given** the workout is completed, **When** the user navigates back to the Workout tab, **Then** the "Start Workout" button is available again, **And** no in-progress session is shown.
6. **Given** the user accidentally closes the app during workout, **When** they reopen and the workout was auto-saved, **Then** they can resume the workout (see Story 4.8).

## Tasks / Subtasks

- [ ] Task 1: Implement "Complete Workout" Logic (AC: #1, #4)
  - [ ] Add the button to `LogWorkoutScreen` (sticky at bottom)
  - [ ] Validate that sets are logged (or prompt)
  - [ ] Call `WorkoutRepository.completeSession()`
- [ ] Task 2: Create Workout Success Screen (AC: #2)
  - [ ] Create `src/screens/WorkoutSuccessScreen.tsx`
  - [ ] Display summary data
  - [ ] Add navigation to Home tab
- [ ] Task 3: Handle Session Cleanup (AC: #5)
  - [ ] Clear the active session state in `AppContext` upon completion
- [ ] Task 4: Verification (AC: #3)
  - [ ] Verify that activity graph updates immediately
  - [ ] Verify navigation and state cleanup

## Dev Notes

### UI/UX
- Use `theme.colors.success` for positive feedback.
- Consider a simple confetti or checkmark animation.

### References
- [Source: epics.md#Story 4.5]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
