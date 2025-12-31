# Story 2.3: Create New Exercise

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to add new exercises to my library**,
so that **I can build my personal database of exercises**.

## Acceptance Criteria

1. **Given** the user is on the Exercise list screen, **When** they tap the "Add Exercise" button (+ icon or FAB), **Then** the `ExerciseFormScreen` is displayed with empty fields.
2. **Given** the user is on the `ExerciseFormScreen`, **When** the form loads, **Then** a text input for exercise name is displayed, **And** a category picker with options Gym, Cardio, Abs is displayed.
3. **Given** the user enters a valid name and selects a category, **When** they tap "Save", **Then** the exercise is saved to the database, **And** the user is returned to the exercise list, **And** the new exercise appears in the list.
4. **Given** the user tries to save without entering a name, **When** they tap "Save", **Then** an inline error "Name is required" is displayed, **And** the form is not submitted.
5. **Given** the user tries to save without selecting a category, **When** they tap "Save", **Then** an inline error "Category is required" is displayed, **And** the form is not submitted.
6. **Given** the user is on the form screen, **When** they tap "Cancel" or the back button, **Then** no exercise is saved, **And** they return to the exercise list.

## Tasks / Subtasks

- [x] Task 1: Implement Exercise Form Screen (AC: #1, #2)
  - [x] Create `src/screens/ExerciseFormScreen.tsx`
  - [x] Implement local state for name, category, and validation errors
  - [x] Use `Input` and custom picker/selector for category
- [x] Task 2: Implement Form Validation (AC: #4, #5)
  - [x] Add validation logic to "Save" handler
  - [x] Display error messages below fields
- [x] Task 3: Implement Save Logic (AC: #3)
  - [x] Use `ExerciseRepository.create()` to save data
  - [x] Handle asynchronous operation and potential errors
  - [x] Navigate back to list on success
- [x] Task 4: Add Entry Point in Exercise List (AC: #1)
  - [x] Add "Add" button (FAB or Header Right button) to `ExercisesScreen.tsx`
  - [x] Configure navigation to `ExerciseFormScreen`
- [x] Task 5: Verification (AC: #6)
  - [x] Verify cancel/back behavior
  - [x] Verify immediate update of the list after saving

## Dev Notes

- Form implemented with controlled inputs and category selector.
- Validation for name and category presence.
- Integration with `ExerciseRepository` for persistence.
- Navigation header button added to the Exercise list.
- Form also supports edit mode (Story 2.4).
- Verified with `tsc`.

### Project Structure Notes

- New UI component `Input` added to `src/components/ui/`.

### References

- [Source: architecture.md#Navigation Architecture]
- [Source: epics.md#Story 2.3]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Exercise form implemented and validated.
- Navigation flows correctly between list and form.
- DB persistence verified.

### File List

- `src/components/ui/Input.tsx`
- `src/components/ui/index.ts`
- `src/screens/ExerciseFormScreen.tsx`
- `src/screens/index.ts`
- `src/navigation/Stacks.tsx`
- `src/screens/ExercisesScreen.tsx`
