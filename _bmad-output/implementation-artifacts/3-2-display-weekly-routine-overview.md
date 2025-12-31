# Story 3.2: Display Weekly Routine Overview

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see my weekly routine at a glance**,
so that **I know what exercises are planned for each day**.

## Acceptance Criteria

1. **Given** the user navigates to the Routine tab, **When** the screen loads, **Then** all 7 days of the week are displayed (Monday through Sunday), **And** each day shows the number of exercises assigned.
2. **Given** a day has exercises assigned, **When** the day card is displayed, **Then** exercise names are shown (up to 3, with "+N more" if more), **And** the day card is tappable to configure.
3. **Given** a day has no exercises assigned, **When** the day card is displayed, **Then** "No exercises" or "Rest Day" is shown, **And** the card is still tappable to add exercises.
4. **Given** today is Wednesday, **When** the weekly overview is displayed, **Then** Wednesday's card is visually highlighted (different border or background), **And** the label shows "Today" alongside the day name.
5. **Given** the routine has been configured, **When** the user views the weekly overview, **Then** they can see their entire week's training plan in one screen.

## Tasks / Subtasks

- [ ] Task 1: Create Day Card Component (Architecture Decision)
  - [ ] Create `src/components/routine/DayCard.tsx`
  - [ ] Implement exercise summary display (up to 3 items)
  - [ ] Add "Today" highlight styles
- [ ] Task 2: Implement Routine Screen (AC: #1, #5)
  - [ ] Update `src/screens/RoutineScreen.tsx` to use `useWeeklyRoutine` hook
  - [ ] Map through 7 days to render `DayCard` components
- [ ] Task 3: Implement Highlights and Labels (AC: #4)
  - [ ] Detect current weekday using `date-fns`
  - [ ] Apply highlighting to the current day's card
- [ ] Task 4: Content Logic (AC: #2, #3)
  - [ ] Handle empty states per day
  - [ ] Format exercise preview string (e.g., "Press, Squat, +2 more")
- [ ] Task 5: Navigation Integration
  - [ ] Wire tap action to navigate to `DayConfigScreen` (to be created in Story 3.3)
- [ ] Task 6: Verification
  - [ ] Verify that all 7 days are visible and correctly labeled

## Dev Notes

### Layout
- Use a `ScrollView` if the 7 cards don't fit on one screen, but aim for a compact layout.
- Order should be Monday to Sunday (standard for many regions, check if user preference is needed later).

### References
- [Source: epics.md#Story 3.2]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
