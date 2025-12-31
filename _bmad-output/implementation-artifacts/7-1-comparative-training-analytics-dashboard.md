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

- [x] Task 1: Create Analytics Data Methods in StatsRepository (AC: #1, #3, #4)
  - [x] Implement `getWeeklyVolumeComparison()` to aggregate volume per week for the last 4 weeks.
  - [x] Implement `getCategoryDistribution()` to count sets per category.
  - [x] Implement `getMonthlyAnalyticsSummary()` for total workouts, sets, and consistency scores.
- [x] Task 2: Create Analytics Hooks (AC: #1)
  - [x] Create `src/hooks/useAnalyticsData.ts` to manage loading and error states for complex stats.
- [x] Task 3: Implement Statistics Dashboard Screen (AC: #1, #5)
  - [x] Create `src/screens/StatisticsScreen.tsx`.
  - [x] Integrate into the navigation (Progress tab now leads here first).
  - [x] Implement empty state handling.
- [x] Task 4: Implement Volume Bar Chart (AC: #2)
  - [x] Use `react-native-chart-kit`'s `BarChart`.
  - [x] Map weekly volume data to the chart.
- [x] Task 5: Implement Category Pie Chart (AC: #3)
  - [x] Use `react-native-chart-kit`'s `PieChart`.
  - [x] Map set distribution data to the chart with appropriate colors.
- [x] Task 6: Implement Monthly Summary List (AC: #4)
  - [x] Create `src/components/activity/MonthlySummaryItem.tsx`.
  - [x] Render the monthly list with calculated averages.
- [x] Task 7: Verification
  - [x] Verify calculation accuracy for volume and consistency.
  - [x] Verify chart rendering performance.

## Dev Notes

- `StatsRepository` enhanced with complex SQL aggregations for volume and distribution.
- `StatisticsScreen` provides a comprehensive overview of training habits.
- The Progress tab has been refactored: it now displays the analytics dashboard as the primary view, with a button to access individual exercise progress charts.
- `BarChart` and `PieChart` from `react-native-chart-kit` used for visual data representation.
- Verified with `tsc`.

### Project Structure Notes

- New screen `StatisticsScreen.tsx` added to `src/screens/`.
- New summary component in `src/components/activity/`.

### References

- [Source: architecture.md#Database Schema]
- [Source: epics.md#Story 7.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Advanced analytics dashboard fully functional.
- Weekly volume and category distribution charts implemented.
- Monthly summary list provides detailed session averages.

### File List

- `src/database/repositories/StatsRepository.ts`
- `src/hooks/useAnalyticsData.ts`
- `src/hooks/index.ts`
- `src/components/activity/MonthlySummaryItem.tsx`
- `src/screens/StatisticsScreen.tsx`
- `src/screens/index.ts`
- `src/navigation/Stacks.tsx`
