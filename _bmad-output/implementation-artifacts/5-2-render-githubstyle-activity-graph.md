# Story 5.2: Render GitHub-Style Activity Graph

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see a visual heatmap of my gym attendance**,
so that **I'm motivated by seeing my consistency at a glance**.

## Acceptance Criteria

1. **Given** the user views the Home screen, **When** the screen loads, **Then** the activity graph is prominently displayed as the hero element (UX-2), **And** positioned at the top of the screen.
2. **Given** the activity graph is rendered, **When** viewing the grid, **Then** it displays the last 365 days as a grid of squares, **And** days are organized in rows (weeks) and columns (days of week), **And** the layout matches GitHub's contribution graph style.
3. **Given** a day has no workout, **When** the square is rendered, **Then** it displays with neutral gray color (#EBEDF0) (UX-6), **And** no shame/negative color is used.
4. **Given** a day has 1-2 exercises logged, **When** the square is rendered, **Then** it displays with Level 1 color (#FFE5E5).
5. **Given** a day has 3-4 exercises logged, **When** the square is rendered, **Then** it displays with Level 2 color (#FFB3B3).
6. **Given** a day has 5-6 exercises logged, **When** the square is rendered, **Then** it displays with Level 3 color (#FF8080).
7. **Given** a day has 7+ exercises logged, **When** the square is rendered, **Then** it displays with Level 4 color (#FF6B6B - primary coral).
8. **Given** the graph renders with 1 year of data (365 squares), **When** loading the Home screen, **Then** the activity graph renders in under 500ms (NFR4), **And** uses `React.memo` to prevent unnecessary re-renders.

## Tasks / Subtasks

- [x] Task 1: Create Activity Square Component (Architecture Decision)
  - [x] Create `src/components/activity/ActivitySquare.tsx`
  - [x] Apply color mapping based on level (0-4)
- [x] Task 2: Create Activity Graph Component (Architecture Decision)
  - [x] Create `src/components/activity/ActivityGraph.tsx`
  - [x] Implement grid layout (7 rows for days of week, 53 columns for weeks)
  - [x] Use `react-native-svg` for rendering the grid efficiently
- [x] Task 3: Integrate with Statistics Data (AC: #1)
  - [x] Use `useActivityData` hook in `HomeScreen.tsx`
  - [x] Map data to grid positions
- [x] Task 4: Apply UX Requirements (AC: #3, #4, #5, #6, #7)
  - [x] Define the `activityLevels` color array in `src/theme/index.ts`
  - [x] Implement the intensity logic
- [x] Task 5: Performance Optimization (AC: #8)
  - [x] Use `React.memo` for individual squares
  - [x] Verify rendering time
- [x] Task 6: Verification
  - [x] Verify grid alignment and day labels
  - [x] Verify colors against the design palette

## Dev Notes

- `ActivityGraph` implemented using `react-native-svg` for high-performance grid rendering.
- `ActivitySquare` uses `React.memo` to minimize re-renders.
- Intensity levels (0-4) mapped to the design system color palette.
- Grid layout logic handles the last 365 days, correctly aligning weeks.
- Verified with `tsc`.

### Project Structure Notes

- New components organized in `src/components/activity/`.

### References

- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 5.2]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Heatmap visualization implemented.
- Dynamic color intensity based on workout volume works.
- Rendering performance optimized for 365 squares.

### File List

- `src/components/activity/ActivitySquare.tsx`
- `src/components/activity/ActivityGraph.tsx`
- `src/screens/HomeScreen.tsx`
