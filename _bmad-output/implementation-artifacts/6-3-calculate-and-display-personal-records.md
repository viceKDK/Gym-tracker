# Story 6.3: Calculate and Display Personal Records

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see my personal record (PR) for each exercise**,
so that **I know what my best performance is**.

## Acceptance Criteria

1. **Given** the `StatsRepository` has PR calculation logic, **When** `getPRForExercise(exerciseId)` is called, **Then** it returns the maximum weight logged for that exercise, **And** includes the date when it was achieved.
2. **Given** an exercise has multiple sets across different sessions, **When** calculating the PR, **Then** the highest weight value is selected regardless of reps, **And** if tied, the most recent date is used.
3. **Given** the user views the `ProgressChartScreen`, **When** the PR is displayed, **Then** it shows "PR: 85kg on Jan 15" prominently, **And** uses a badge or special styling.
4. **Given** the user views the exercise list in Progress tab, **When** an exercise has a PR, **Then** the PR weight is shown as part of the preview, **And** helps user track their best across all exercises.
5. **Given** an exercise has never been logged, **When** checking for PR, **Then** returns `null`/`undefined` gracefully, **And** no PR badge is displayed.

## Tasks / Subtasks

- [ ] Task 1: Implement PR Calculation Logic (AC: #1, #2, #5)
  - [ ] Add `getPRForExercise` to `StatsRepository.ts`
  - [ ] Update repository to return PR data (weight, date)
- [ ] Task 2: Create PR Badge Component (Architecture Decision)
  - [ ] Create `src/components/progress/PRBadge.tsx`
  - [ ] Implement highlight styling (e.g., gold or coral accent)
- [ ] Task 3: Integrate PR in Progress Tab List (AC: #4)
  - [ ] Update `ProgressListItem.tsx` to display the PR weight
- [ ] Task 4: Integrate PR in Progress Chart Screen (AC: #3)
  - [ ] Display the PR prominently at the top of the chart screen
- [ ] Task 5: Verification
  - [ ] Verify PR calculation with mixed reps and weights
  - [ ] Verify graceful handling of exercises without data

## Dev Notes

### SQL for PR
- `SELECT weight, created_at FROM workout_sets WHERE exercise_id = ? ORDER BY weight DESC, created_at DESC LIMIT 1`

### References
- [Source: epics.md#Story 6.3]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
