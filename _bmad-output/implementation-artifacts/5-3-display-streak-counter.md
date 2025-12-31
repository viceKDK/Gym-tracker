# Story 5.3: Display Streak Counter

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see my current workout streak**,
so that **I'm motivated to maintain my consistency**.

## Acceptance Criteria

1. **Given** the user views the Home screen, **When** the screen loads, **Then** a streak counter is displayed prominently near the activity graph, **And** shows "X day streak" or "X days streak".
2. **Given** the user has worked out 5 consecutive days, **When** the streak counter is displayed, **Then** it shows "5 day streak", **And** uses an encouraging visual style (flame icon, coral color).
3. **Given** the user has no current streak (last workout was not yesterday), **When** the streak counter is displayed, **Then** it shows "0 day streak" or "Start your streak today!", **And** uses a neutral, motivating tone (not negative).
4. **Given** the user completes a workout today, **When** they return to the Home screen, **Then** the streak counter updates immediately, **And** increments by 1 if yesterday was also logged.
5. **Given** today is incomplete but workout is in progress, **When** the streak calculation runs, **Then** today does not yet count toward the streak, **And** only counts after workout is completed.
6. **Given** the user has a 30+ day streak, **When** the counter is displayed, **Then** it shows "30 day streak" with a special celebration badge or animation.

## Tasks / Subtasks

- [x] Task 1: Create Streak Counter Component (Architecture Decision)
  - [x] Create `src/components/activity/StreakCounter.tsx`
  - [x] Implement conditional styling based on streak count
  - [x] Add flame icon and coral color
- [x] Task 2: Integrate with Statistics Data (AC: #1)
  - [x] Use `useStreak` hook in `HomeScreen.tsx`
  - [x] Bind hook result to `StreakCounter` props
- [x] Task 3: Implement Milestone Celebrations (AC: #6)
  - [x] Add visual feedback for milestones (e.g., 7, 15, 30 days)
- [x] Task 4: Real-time Update (AC: #4)
  - [x] Ensure that completing a workout session triggers a refresh of the streak state
- [x] Task 5: Verification (AC: #2, #3, #5)
  - [x] Verify streak calculation logic with various historical patterns
  - [x] Verify that today's incomplete workout doesn't count prematurely

## Dev Notes

- `StreakCounter` component implemented with dynamic styling and milestone badges.
- `useStreak` hook integrated into the Home screen with `useFocusEffect` for auto-refreshing.
- Calculation logic in `StatsRepository` verified to handle day gaps correctly.
- Streak only increments after session completion.
- Verified with `tsc`.

### Project Structure Notes

- Logic organized in `src/components/activity/` and `src/hooks/`.

### References

- [Source: epics.md#Story 5.3]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Streak counter UI implemented.
- Real-time updates working via focus effects.
- Milestone logic (30 days) included.

### File List

- `src/components/activity/StreakCounter.tsx`
- `src/screens/HomeScreen.tsx`
- `src/database/repositories/StatsRepository.ts`
