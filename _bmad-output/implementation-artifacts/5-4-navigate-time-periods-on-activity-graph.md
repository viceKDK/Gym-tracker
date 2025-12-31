# Story 5.4: Navigate Time Periods on Activity Graph

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to view different time periods on the activity graph**,
so that **I can review my past consistency over weeks and months**.

## Acceptance Criteria

1. **Given** the activity graph is displayed, **When** navigation controls are shown, **Then** left/right arrows or swipe gestures allow navigating to previous/next periods.
2. **Given** the user is viewing the current period (default), **When** they tap the left arrow or swipe left, **Then** the graph shifts to show the previous 365-day period, **And** the transition is smooth (under 300ms).
3. **Given** the user has navigated to a past period, **When** they tap the right arrow or swipe right, **Then** the graph shifts forward to the next period, **And** cannot navigate beyond today.
4. **Given** the user is viewing a past period, **When** they tap "Today" or home button, **Then** the graph jumps back to the current period showing today, **And** today's square is highlighted.
5. **Given** the graph is showing data, **When** the period changes, **Then** the data loads and renders efficiently, **And** the user experiences no lag or delay.
6. **Given** the user is viewing months/years ago, **When** the graph is displayed, **Then** a date indicator shows which period is being viewed (e.g., "Jan - Dec 2024").

## Tasks / Subtasks

- [ ] Task 1: Add Navigation Controls to Activity Graph (AC: #1)
  - [ ] Implement arrow buttons or a slider/segment control
  - [ ] Add touch/swipe gesture support if feasible
- [ ] Task 2: Implement Period Shift Logic (AC: #2, #3)
  - [ ] Update `useActivityData` hook to support dynamic date ranges
  - [ ] Implement `shiftPeriod(direction)` function
- [ ] Task 3: Create Period Indicator (AC: #6)
  - [ ] Display the current range (Start Date - End Date) above or below the graph
- [ ] Task 4: Implement "Today" Reset Action (AC: #4)
  - [ ] Add a shortcut button to return to the current year
- [ ] Task 5: Verification (AC: #5)
  - [ ] Verify scrolling performance and data loading times
  - [ ] Verify boundary constraints (no future dates)

## Dev Notes

### UI/UX
- Swipe gestures make the app feel more native. Consider using `react-native-gesture-handler`.
- The date range should be clearly visible so the user doesn't get lost in time.

### References
- [Source: epics.md#Story 5.4]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
