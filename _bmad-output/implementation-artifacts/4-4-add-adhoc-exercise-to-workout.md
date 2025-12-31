# Story 4.4: Add Ad-Hoc Exercise to Workout

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to add exercises not in today's routine**,
so that **I can log extra exercises or substitute when needed**.

## Acceptance Criteria

1. **Given** the user is on `LogWorkoutScreen`, **When** they tap "Add Exercise" button, **Then** a modal/sheet with all exercises from the library is displayed.
2. **Given** the exercise picker is displayed, **When** the user views exercises, **Then** exercises are grouped by category (Gym, Cardio, Abs), **And** a search bar is available for quick filtering.
3. **Given** the user selects an exercise from the picker, **When** they tap it, **Then** the exercise is added to the current workout session, **And** the picker closes, **And** the exercise card appears in `LogWorkoutScreen` ready for set input.
4. **Given** an ad-hoc exercise has been added, **When** viewing the workout, **Then** it's visually distinguished or labeled "Added" vs routine exercises.
5. **Given** the user adds multiple ad-hoc exercises, **When** viewing the workout, **Then** both pre-loaded and ad-hoc exercises are displayed, **And** all can have sets logged equally.
6. **Given** the user searches for "press" in the exercise picker, **When** typing, **Then** only matching exercises are shown, **And** they can quickly add without scrolling.

## Tasks / Subtasks

- [x] Task 1: Create Exercise Picker Modal (Architecture Decision)
  - [x] Create `src/components/workout/ExercisePicker.tsx`
  - [x] Implement search functionality and category grouping
- [x] Task 2: Implement "Add Exercise" Action (AC: #1, #3)
  - [x] Add the action button to `LogWorkoutScreen`
  - [x] Implement the logic to add the selected exercise to the session state
- [x] Task 3: Visual Differentiation (AC: #4)
  - [x] Update `ExerciseCard.tsx` to handle an `isAdHoc` prop
  - [x] Add a subtle "Ad-Hoc" or "Added" badge/indicator
- [x] Task 4: Verification (AC: #2, #5, #6)
  - [x] Verify search performance within the picker
  - [x] Verify that ad-hoc exercises persist during the session

## Dev Notes

- `ExercisePicker` modal implemented with full library search and filtering.
- `LogWorkoutScreen` manages ad-hoc exercises in local state and merges them with the routine exercises.
- `ExerciseCard` visually distinguishes ad-hoc exercises with an "ADDED" badge.
- Ad-hoc exercises are correctly identified even if already present in the session's sets.
- Verified with `tsc`.

### Project Structure Notes

- New component `ExercisePicker` in `src/components/workout/`.

### References

- [Source: epics.md#Story 4.4]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Ad-hoc exercise addition works.
- Visual feedback for added exercises implemented.
- Search within picker is responsive.

### File List

- `src/components/workout/ExercisePicker.tsx`
- `src/screens/LogWorkoutScreen.tsx`
- `src/components/workout/ExerciseCard.tsx`
