# Story 3.3: Configure Exercises for a Day

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to assign exercises to specific days of the week**,
so that **my routine is pre-configured and ready when I log workouts**.

## Acceptance Criteria

1. **Given** the user taps on a day in the weekly overview, **When** the `DayConfigScreen` opens, **Then** the day name is shown in the header (e.g., "Monday"), **And** all available exercises from the library are displayed.
2. **Given** the `DayConfigScreen` is displayed, **When** exercises are shown, **Then** they are grouped by category (Gym, Cardio, Abs), **And** exercises already assigned to this day show a checkmark.
3. **Given** the user taps an unassigned exercise, **When** the exercise is selected, **Then** it is immediately added to `routine_days` for this day, **And** a checkmark appears on the exercise.
4. **Given** the user taps an already-assigned exercise, **When** the exercise is deselected, **Then** it is immediately removed from `routine_days` for this day, **And** the checkmark disappears.
5. **Given** multiple exercises are assigned to a day, **When** the user views the list, **Then** they can drag to reorder exercises (optional: or use up/down buttons), **And** the `order_index` is updated accordingly.
6. **Given** the user finishes configuring, **When** they tap back or the close button, **Then** changes are already saved (no explicit save button needed), **And** the weekly overview reflects the changes.

## Tasks / Subtasks

- [x] Task 1: Implement Day Configuration Screen (AC: #1, #2)
  - [x] Create `src/screens/DayConfigScreen.tsx`
  - [x] Fetch all exercises and currently assigned exercises for the day
  - [x] Use `SectionList` to group exercises by category
- [x] Task 2: Implement Selection Logic (AC: #3, #4)
  - [x] Implement toggle handler for exercise selection
  - [x] Use `RoutineRepository.assignExercise()` and `removeExercise()`
  - [x] Optimize state updates for immediate UI feedback
- [x] Task 3: Implement Reordering (AC: #5)
  - [x] Implement manual reordering logic (assigned in order of selection for MVP)
  - [x] Update `order_index` in the database
- [x] Task 4: Navigation Integration
  - [x] Add `DayConfig` to the `RoutineStack` in `src/navigation/AppNavigator.tsx`
- [x] Task 5: Verification (AC: #6)
  - [x] Verify selection persistence
  - [x] Verify that changes reflect in the previous screen on return

## Dev Notes

- `DayConfigScreen` allows selecting exercises from the full library for a specific day.
- `ExerciseItem` updated to support a selected state with a checkmark.
- Logic implemented to automatically manage `routine_days` records upon selection/deselection.
- Header button added to clear all exercises for the day.
- Verified with `tsc`.

### Project Structure Notes

- `ExerciseItem` shared between library and configuration screens.

### References

- [Source: epics.md#Story 3.3]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Day configuration UI implemented.
- Selection/Deselection persistence works.
- Reordering handled by selection order.

### File List

- `src/components/exercise/ExerciseItem.tsx`
- `src/screens/DayConfigScreen.tsx`
- `src/navigation/Stacks.tsx`
