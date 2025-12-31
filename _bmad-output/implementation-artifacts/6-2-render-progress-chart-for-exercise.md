# Story 6.2: Render Progress Chart for Exercise

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see a line chart of my weight progress for an exercise**,
so that **I can visually understand my strength gains over time**.

## Acceptance Criteria

1. **Given** the user selects an exercise from the progress list, **When** `ProgressChartScreen` loads, **Then** a line chart is displayed showing weight evolution over time.
2. **Given** the chart is rendered, **When** viewing the data, **Then** the X-axis shows dates (e.g., "Jan 5", "Jan 12", "Jan 19"), **And** the Y-axis shows weight values in kg, **And** the line connects all logged max weights per session.
3. **Given** an exercise has been logged 20 times over 3 months, **When** the chart renders, **Then** it displays in under 1 second (NFR5), **And** shows the full timeline.
4. **Given** the chart shows data, **When** the user views it, **Then** the current PR (highest weight) is visually highlighted on the chart, **And** uses coral color (#FF6B6B) for the line.
5. **Given** an exercise has only been logged once, **When** the chart is displayed, **Then** a single point is shown with appropriate messaging, **And** encourages logging more to see progress.
6. **Given** the user wants more detail, **When** they tap on a data point, **Then** a tooltip shows: date, weight, reps (optional enhancement).
7. **Given** the chart needs to display many data points, **When** rendering, **Then** the library (`react-native-chart-kit`) handles the data efficiently, **And** the chart is responsive and doesn't lag.

## Tasks / Subtasks

- [ ] Task 1: Create Progress Chart Component (Architecture Decision)
  - [ ] Create `src/components/progress/ProgressChart.tsx`
  - [ ] Integrate `react-native-chart-kit`
  - [ ] Apply theme colors (Coral #FF6B6B) and styles
- [ ] Task 2: Implement Progress Chart Screen (AC: #1, #2, #5)
  - [ ] Create `src/screens/ProgressChartScreen.tsx`
  - [ ] Fetch historical max weights for the selected exercise ID using `useExerciseProgress` hook
- [ ] Task 3: Implement Tooltip and Interactions (AC: #6)
  - [ ] Add basic tooltip display on data point tap
- [ ] Task 4: Performance and UX Polishing (AC: #3, #4, #7)
  - [ ] Highlight the PR point on the line
  - [ ] Optimize data transformation for the chart library
- [ ] Task 5: Verification
  - [ ] Verify chart rendering with full history
  - [ ] Verify NFR5 (<1s render)

## Dev Notes

### UI/UX
- Use `LineChart` from `react-native-chart-kit`.
- Ensure labels are formatted cleanly using `date-fns` (e.g., "MMM d").

### References
- [Source: architecture.md#Implementation Guidance - charts]
- [Source: epics.md#Story 6.2]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
