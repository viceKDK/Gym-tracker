# Story 7.1: Comparative Training Analytics Dashboard

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to compare my training stats across different time periods (weeks and months)**,
so that **I can understand if my performance and consistency are improving**.

## Acceptance Criteria

1. **Given** the user navigates to the Statistics section, **When** the screen loads, **Then** a bar chart comparing total workout volume (weight x reps) for the last 4 weeks is displayed, **And** a pie chart showing the distribution of exercises by category (Gym, Cardio, Abs) is displayed.
2. **Given** the volume comparison chart, **When** the user views the weeks, **Then** each bar represents one week, labeled with the start date or week number, **And** the chart uses the primary coral color (#FF6B6B).
3. **Given** the category distribution chart, **When** workouts have been logged, **Then** the chart displays the percentage of sets dedicated to each category, **And** uses theme colors (Coral for Gym, Teal for Cardio, Purple for Abs).
4. **Given** the monthly summary, **When** the user scrolls down, **Then** a list or grid shows total workouts and total sets per month for the current year, **And** provides a "consistency score" (percentage of planned routine days completed).
5. **Given** no data is available, **When** the statistics screen is viewed, **Then** helpful empty states are shown encouraging the user to log more workouts to generate insights.

## Tasks / Subtasks

- [ ] Task 1: Create Analytics Data Methods in StatsRepository (AC: #1, #3, #4)
  - [ ] Implement `getWeeklyVolumeComparison()` to aggregate volume per week for the last 4 weeks.
  - [ ] Implement `getCategoryDistribution()` to count sets per category.
  - [ ] Implement `getMonthlyAnalyticsSummary()` for total workouts, sets, and consistency scores.
- [ ] Task 2: Create Analytics Hooks (AC: #1)
  - [ ] Create `src/hooks/useAnalyticsData.ts` to manage loading and error states for complex stats.
- [ ] Task 3: Implement Statistics Dashboard Screen (AC: #1, #5)
  - [ ] Create `src/screens/StatisticsScreen.tsx`.
  - [ ] Integrate into the navigation (e.g., as a sub-tab or entry from Home/Progress).
  - [ ] Implement empty state handling.
- [ ] Task 4: Implement Volume Bar Chart (AC: #2)
  - [ ] Use `react-native-chart-kit`'s `BarChart`.
  - [ ] Map weekly volume data to the chart.
- [ ] Task 5: Implement Category Pie Chart (AC: #3)
  - [ ] Use `react-native-chart-kit`'s `PieChart`.
  - [ ] Map set distribution data to the chart with appropriate colors.
- [ ] Task 6: Implement Monthly Summary List (AC: #4)
  - [ ] Create `src/components/activity/MonthlySummaryItem.tsx`.
  - [ ] Render the monthly list/grid with calculated consistency scores.
- [ ] Task 7: Verification
  - [ ] Verify calculation accuracy for volume and consistency.
  - [ ] Verify chart rendering performance.

## Dev Notes

- **Volume Calculation:** Sum of `weight * reps` for all sets in the specified period.
- **Consistency Score:** (Total Workouts / (Number of non-rest days in routine * weeks)) * 100.
- **Library:** Use `react-native-chart-kit` as established in the architecture.
- **Styling:** Primary color `#FF6B6B`, Secondary `#4ECDC4`, Abs color `#A29BFE`.

### Project Structure Notes

- New screen `StatisticsScreen.tsx` in `src/screens/`.
- New component `MonthlySummaryItem.tsx` in `src/components/activity/`.

### References

- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 7.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
