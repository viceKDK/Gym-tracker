# Story 4.3: Log Sets with Weight and Reps

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to quickly log weight and reps for each set**,
so that **I can record my workout in under 60 seconds**.

## Acceptance Criteria

1. **Given** the user is on `LogWorkoutScreen` with exercises loaded, **When** they tap on an exercise card, **Then** the card expands to show set input fields.
2. **Given** set input fields are displayed, **When** the user taps the weight field, **Then** a numeric keyboard appears, **And** they can enter decimal values (e.g., 82.5).
3. **Given** set input fields are displayed, **When** the user taps the reps field, **Then** a numeric keyboard appears, **And** they can enter integer values (e.g., 8).
4. **Given** the user enters weight and reps, **When** they tap "Add Set" or press Enter, **Then** the set is saved to `workout_sets` table, **And** input response time is under 100ms (NFR3), **And** a visual confirmation (checkmark) appears.
5. **Given** a set has been logged, **When** the set is displayed, **Then** it shows "Set 1: 80kg x 8 reps" with a checkmark.
6. **Given** the user wants to log another set, **When** they tap "Add Set" again, **Then** fields are cleared and ready for Set 2, **And** previous sets remain visible above.
7. **Given** the user logs multiple sets, **When** viewing the exercise card, **Then** all sets are displayed (Set 1, Set 2, Set 3, etc.), **And** each set is independently editable or deletable.
8. **Given** the user enters 0 or leaves weight empty, **When** they add the set, **Then** it's allowed (for bodyweight exercises), **And** displays as "0kg x 8 reps" or "Bodyweight x 8 reps".

## Tasks / Subtasks

- [ ] Task 1: Create Set Input Component (Architecture Decision)
  - [ ] Create `src/components/workout/SetInput.tsx`
  - [ ] Implement weight and reps fields using `NumericInput`
  - [ ] Implement "Add Set" button
- [ ] Task 2: Implement Expansion Logic in Exercise Card (AC: #1)
  - [ ] Update `ExerciseCard.tsx` to handle expanded state
  - [ ] Integrate `SetInput` in the expanded view
- [ ] Task 3: Implement Logging Logic (AC: #4, #6, #8)
  - [ ] Wire `SetInput` to `useWorkoutSession.addSet()`
  - [ ] Handle numeric input conversion and validation
- [ ] Task 4: Create Set List Display (AC: #5, #7)
  - [ ] Create `src/components/workout/LoggedSetItem.tsx`
  - [ ] Display logged sets within `ExerciseCard`
  - [ ] Implement delete/edit actions for individual sets
- [ ] Task 5: Verification (AC: #2, #3)
  - [ ] Verify keyboard types (numeric/decimal)
  - [ ] Verify NFR3 (<100ms response)

## Dev Notes

### UI/UX
- The expansion should be smooth (use `LayoutAnimation` if possible).
- Use `keyboardType="decimal-pad"` for weight and `keyboardType="number-pad"` for reps.

### NFR Compliance
- NFR3: Workout logging action < 100ms response

### References
- [Source: epics.md#Story 4.3]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
