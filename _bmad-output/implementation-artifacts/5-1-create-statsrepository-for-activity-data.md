# Story 5.1: Create StatsRepository for Activity Data

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a repository to query activity and statistics data**,
so that **activity graph and streak calculations are efficient**.

## Acceptance Criteria

1. **Given** the `StatsRepository` class exists, **When** `getActivityData(startDate, endDate)` is called, **Then** it returns all workout days within the date range, **And** each day includes: date, exercise_count, total_sets, **And** the query completes in under 100ms (NFR6).
2. **Given** workout history exists with consecutive days, **When** `getCurrentStreak()` is called, **Then** it returns the number of consecutive workout days ending today or most recently, **And** calculation completes in under 100ms.
3. **Given** the user has workout data for multiple months, **When** `getWorkoutDaysByMonth(year, month)` is called, **Then** all workout days for that month are returned, **And** includes activity level (0-4) for color coding.
4. **Given** the activity graph needs to render 365 days, **When** querying activity data, **Then** the query uses proper indexes (`idx_sessions_date`), **And** returns results efficiently for fast rendering.

## Tasks / Subtasks

- [ ] Task 1: Implement StatsRepository (AC: #1, #2, #3)
  - [ ] Create `src/database/repositories/StatsRepository.ts`
  - [ ] Implement `getActivityData` with aggregation
  - [ ] Implement `getCurrentStreak` logic (can be SQL or JS post-processing)
  - [ ] Implement activity level calculation (0-4 based on exercise count)
- [ ] Task 2: Create Statistics Hooks (AC: #4)
  - [ ] Create `src/hooks/useActivityData.ts`
  - [ ] Create `src/hooks/useStreak.ts`
- [ ] Task 3: Export Repository and Hooks
  - [ ] Update `src/database/repositories/index.ts`
  - [ ] Update `src/hooks/index.ts`
- [ ] Task 4: Verification
  - [ ] Verify query performance with 365+ days of data
  - [ ] Verify streak calculation accuracy (including edge cases like today's workout in progress)

## Dev Notes

### SQL for Activity
- `SELECT date, COUNT(DISTINCT exercise_id) as exercise_count FROM workout_sessions ws JOIN workout_sets wst ON ws.id = wst.session_id WHERE date >= ? AND date <= ? GROUP BY date`

### Streak logic
- Use the query from `architecture.md#Database Schema` as a reference.

### References
- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 5.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
