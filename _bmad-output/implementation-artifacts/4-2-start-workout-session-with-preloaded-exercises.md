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

- [x] Task 1: Implement Start Workout Logic (AC: #1, #5)
  - [x] Add "Start Workout" button to `WorkoutScreen.tsx`
  - [x] Check for existing session using `WorkoutRepository.getSession(today)`
  - [x] Handle "Continue vs New" prompt
- [x] Task 2: Create Log Workout Screen (AC: #2, #4)
  - [x] Create `src/screens/LogWorkoutScreen.tsx`
  - [x] Fetch today's routine and session sets on mount
  - [x] Implement empty/rest day state
- [x] Task 3: Create Exercise Card Component (AC: #3)
  - [x] Create `src/components/workout/ExerciseCard.tsx`
  - [x] Implement name, badge, and placeholders for set logging
- [x] Task 4: Navigation Integration
  - [x] Add `LogWorkout` to the `WorkoutStack` in `src/navigation/AppNavigator.tsx`
- [x] Task 5: Verification (AC: #6)
  - [x] Verify that navigating back and forth preserves the active session

## Dev Notes

- `WorkoutScreen` updated with a primary "Start Workout" card.
- Logic added to check for existing sessions and prompt user to resume or start over.
- `LogWorkoutScreen` combines routine exercises with existing session data.
- `ExerciseCard` component created to display exercise details and logged sets.
- `Button` UI component enhanced to support `leftIcon`.
- Verified with `tsc`.

### Project Structure Notes

- New screen `LogWorkoutScreen` and component `ExerciseCard` integrated.

### References

- [Source: epics.md#Story 4.2]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Workout start flow implemented.
- Automatic routine loading in logging screen works.
- Session persistence logic integrated.

### File List

- `src/screens/WorkoutScreen.tsx`
- `src/screens/LogWorkoutScreen.tsx`
- `src/components/workout/ExerciseCard.tsx`
- `src/components/ui/Button.tsx`
- `src/navigation/Stacks.tsx`
