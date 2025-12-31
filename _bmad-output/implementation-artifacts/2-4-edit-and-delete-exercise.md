# Story 2.4: Edit and Delete Exercise

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to edit or delete existing exercises**,
so that **I can correct mistakes or remove exercises I no longer use**.

## Acceptance Criteria

1. **Given** the user is viewing the exercise list, **When** they tap on an exercise item, **Then** the `ExerciseFormScreen` opens in edit mode, **And** the name and category fields are pre-populated with existing values.
2. **Given** the user is editing an exercise, **When** they change the name and tap "Save", **Then** the exercise is updated in the database, **And** they return to the list showing the updated name.
3. **Given** the user is editing an exercise, **When** they tap "Delete" button, **Then** a confirmation dialog appears: "Delete this exercise? It will also be removed from your routines."
4. **Given** the confirmation dialog is displayed, **When** the user confirms deletion, **Then** the exercise is deleted from the database, **And** any routine_days referencing this exercise are deleted (CASCADE), **And** the user returns to the list without the deleted exercise.
5. **Given** the confirmation dialog is displayed, **When** the user cancels, **Then** the dialog closes and no deletion occurs.
6. **Given** an exercise is used in `workout_sets`, **When** the user deletes the exercise, **Then** historical workout data is preserved (workout_sets keep the exercise_id reference but exercise details may show "Deleted Exercise" or the exercise record remains if CASCADE is not applied to sets). *Correction: Schema uses ON DELETE CASCADE for workout_sets too.*

## Tasks / Subtasks

- [ ] Task 1: Update Exercise Form for Edit Mode (AC: #1)
  - [ ] Accept `exerciseId` as a navigation parameter
  - [ ] Fetch exercise details on mount if `exerciseId` is provided
  - [ ] Pre-populate form fields
- [ ] Task 2: Implement Update Logic (AC: #2)
  - [ ] Use `ExerciseRepository.update()` to save changes
  - [ ] Navigate back on success
- [ ] Task 3: Implement Delete Functionality (AC: #3, #4, #5)
  - [ ] Add "Delete" button to the form screen (only visible in edit mode)
  - [ ] Implement `Alert.alert` for confirmation
  - [ ] Use `ExerciseRepository.delete()` on confirmation
- [ ] Task 4: Handle Cascade Deletion Side Effects
  - [ ] Verify that deleting an exercise removes it from `routine_days` (SQL CASCADE)
- [ ] Task 5: Verification
  - [ ] Verify that editing updates the list immediately
  - [ ] Verify that deletion removes the item and closes the form

## Dev Notes

### CRUD logic
- Ensure `ExerciseRepository.delete(id)` is called correctly.
- The SQLite schema already has `ON DELETE CASCADE` for `routine_days` and `workout_sets`.

### Navigation
- Pass the full exercise object or just the ID to `ExerciseFormScreen`.

### References
- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 2.4]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
