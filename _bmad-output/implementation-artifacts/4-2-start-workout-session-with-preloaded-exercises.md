# Story 4.2: Start Workout Session with Pre-loaded Exercises

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to start a workout with my routine already loaded**,
so that **I can begin logging immediately without selecting exercises**.

## Acceptance Criteria

1. **Given** the user navigates to the Workout tab, **When** they tap "Start Workout" or "Log Today's Workout", **Then** a new workout session is created for today's date, **And** `LogWorkoutScreen` is displayed.
2. **Given** today has exercises in the routine (from Epic 3), **When** `LogWorkoutScreen` loads, **Then** all of today's exercises are displayed as cards, **And** exercises are in the configured order.
3. **Given** an exercise card is displayed, **When** the user views it, **Then** it shows exercise name, category badge, **And** a "+" button or input area to add sets.
4. **Given** today is a rest day (no exercises in routine), **When** the user starts a workout, **Then** an empty state with "No exercises scheduled for today" is shown, **And** an "Add Exercise" button is available.
5. **Given** a workout session already exists for today, **When** the user taps "Start Workout", **Then** they are asked "Continue existing workout or start new?", **And** can choose to continue or replace the existing session.
6. **Given** the user navigates away during workout, **When** they return to the Workout tab, **Then** the in-progress session is still displayed (not lost).

## Tasks / Subtasks

- [ ] Task 1: Implement Start Workout Logic (AC: #1, #5)
  - [ ] Add "Start Workout" button to `WorkoutScreen.tsx`
  - [ ] Check for existing session using `WorkoutRepository.getSession(today)`
  - [ ] Handle "Continue vs New" prompt
- [ ] Task 2: Create Log Workout Screen (AC: #2, #4)
  - [ ] Create `src/screens/LogWorkoutScreen.tsx`
  - [ ] Fetch today's routine and session sets on mount
  - [ ] Implement empty/rest day state
- [ ] Task 3: Create Exercise Card Component (AC: #3)
  - [ ] Create `src/components/workout/ExerciseCard.tsx`
  - [ ] Implement name, badge, and placeholders for set logging
- [ ] Task 4: Navigation Integration
  - [ ] Add `LogWorkout` to the `WorkoutStack` in `src/navigation/AppNavigator.tsx`
- [ ] Task 5: Verification (AC: #6)
  - [ ] Verify that navigating back and forth preserves the active session

## Dev Notes

### UI/UX
- Use `theme.colors.surface` for exercise cards with `theme.borderRadius.xl`.
- The list of exercises should be a `FlatList` for performance.

### References
- [Source: epics.md#Story 4.2]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
