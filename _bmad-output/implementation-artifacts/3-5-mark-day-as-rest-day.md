# Story 3.5: Mark Day as Rest Day

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to explicitly mark a day as a rest day**,
so that **the app knows I'm intentionally resting, not missing a workout**.

## Acceptance Criteria

1. **Given** the user is on the `DayConfigScreen` for any day, **When** they tap "Mark as Rest Day" button, **Then** all exercises assigned to this day are removed, **And** the day is marked as a rest day.
2. **Given** a day is marked as rest day, **When** the weekly overview is displayed, **Then** the day card shows "Rest Day" with a distinct visual style (e.g., lighter background, rest icon).
3. **Given** a day is marked as rest day, **When** the user taps on the day card, **Then** the `DayConfigScreen` opens, **And** they can add exercises to convert it back to a workout day.
4. **Given** the user adds an exercise to a rest day, **When** the exercise is assigned, **Then** the day is no longer marked as rest day, **And** the weekly overview updates to show the exercise.
5. **Given** a rest day vs unconfigured day, **When** displayed in weekly overview, **Then** rest days show "Rest Day" explicitly, **And** unconfigured days show "No exercises" or similar.

## Tasks / Subtasks

- [ ] Task 1: Add "Mark as Rest Day" Button (AC: #1)
  - [ ] Update `DayConfigScreen.tsx` to include the button
  - [ ] Implement clear day logic using `RoutineRepository.clearDay()`
- [ ] Task 2: Implement Rest Day Visual Style (AC: #2, #5)
  - [ ] Update `DayCard.tsx` to handle rest day state
  - [ ] Use `theme.colors.background` or a muted style for rest days
- [ ] Task 3: Implement Toggle Logic (AC: #4)
  - [ ] Ensure that adding any exercise automatically removes the "Rest Day" status
- [ ] Task 4: Verification (AC: #3)
  - [ ] Verify that clearing a day marks it as rest
  - [ ] Verify that adding an exercise reverts the rest status

## Dev Notes

### Implementation Detail
- A "Rest Day" is technically a day with 0 entries in `routine_days`. 
- The UI should distinguish between "Not yet configured" and "Explicitly cleared as rest day" if possible, otherwise treat 0 exercises as Rest Day for simplicity.

### References
- [Source: epics.md#Story 3.5]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
