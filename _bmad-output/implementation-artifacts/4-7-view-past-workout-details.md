# Story 4.7: View Past Workout Details

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see the details of a past workout**,
so that **I can review what I did on a specific day**.

## Acceptance Criteria

1. **Given** the user taps on a workout in the history, **When** `WorkoutDetailScreen` loads, **Then** the workout date is displayed in the header.
2. **Given** the workout detail screen is displayed, **When** viewing the content, **Then** all exercises from that session are shown, **And** each exercise displays all its sets with weight and reps.
3. **Given** an exercise has multiple sets, **When** displayed in the detail view, **Then** sets are shown as "Set 1: 80kg x 8, Set 2: 80kg x 7, Set 3: 75kg x 8", **And** each set is clearly readable.
4. **Given** the workout included ad-hoc exercises, **When** viewing the detail, **Then** all exercises (routine + ad-hoc) are displayed, **And** grouped or labeled appropriately.
5. **Given** the user is viewing a past workout, **When** they tap the back button, **Then** they return to the workout history list.
6. **Given** the detail screen is read-only (for now), **When** the user views it, **Then** no edit buttons are shown, **And** data is displayed for review only.

## Tasks / Subtasks

- [ ] Task 1: Create Workout Detail Screen (AC: #1, #6)
  - [ ] Create `src/screens/WorkoutDetailScreen.tsx`
  - [ ] Accept `sessionId` as a navigation parameter
  - [ ] Fetch exercises and sets using `WorkoutRepository.getSetsForSession()`
- [ ] Task 2: Create Detail Exercise Item Component (AC: #2, #3, #4)
  - [ ] Create `src/components/workout/DetailExerciseItem.tsx`
  - [ ] Display name and sets in a readable list/text block
- [ ] Task 3: Navigation Integration
  - [ ] Add `WorkoutDetail` to `WorkoutStack`
- [ ] Task 4: Verification (AC: #5)
  - [ ] Verify back navigation
  - [ ] Verify that all logged data is accurately displayed

## Dev Notes

### UI/UX
- The detail screen should look similar to the log screen but without input fields.
- Group sets by exercise using `reduce` or similar on the results array.

### References
- [Source: epics.md#Story 4.7]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
