# Story 1.4: Implement 5-Tab Navigation Structure

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to navigate between different sections of the app easily**,
so that **I can access exercises, routines, workouts, and progress with one tap**.

## Acceptance Criteria

1. **Given** the app is launched, **When** the home screen loads, **Then** a bottom tab bar is visible with 5 tabs: Home, Workout, Routine, Exercises, Progress.
2. **Given** the tab bar is displayed, **When** the user views the tabs, **Then** each tab has an appropriate icon and label, **And** the active tab is highlighted with the primary color (#FF6B6B), **And** inactive tabs use textSecondary color (#636E72).
3. **Given** the user is on any tab, **When** they tap a different tab, **Then** the screen transitions to the selected tab in under 300ms (NFR2), **And** the tab bar remains visible.
4. **Given** the tab navigator is configured, **When** each tab screen loads, **Then** a placeholder screen with an empty state message is displayed (e.g., "No exercises yet" for Exercises tab).
5. **Given** the navigation is implemented, **When** the app launches, **Then** the Home tab is selected by default.

## Tasks / Subtasks

- [x] Task 1: Create Placeholder Screens (AC: #4)
  - [x] Create `src/screens/HomeScreen.tsx` with "No activity yet"
  - [x] Create `src/screens/WorkoutScreen.tsx` with "Start your first workout"
  - [x] Create `src/screens/RoutineScreen.tsx` with "No routine configured"
  - [x] Create `src/screens/ExercisesScreen.tsx` with "No exercises yet"
  - [x] Create `src/screens/ProgressScreen.tsx` with "No progress data yet"
- [x] Task 2: Configure Tab Stack Navigators (Architecture Decision)
  - [x] Create stack navigators for each tab in `src/navigation/` (e.g., `HomeStack`, `WorkoutStack`, etc.)
- [x] Task 3: Implement Main Tab Navigator (AC: #1, #2, #5)
  - [x] Create `src/navigation/AppNavigator.tsx`
  - [x] Configure `createBottomTabNavigator` with 5 tabs
  - [x] Set `Home` as the initial route
  - [x] Apply theme colors (#FF6B6B for active, #636E72 for inactive)
- [x] Task 4: Add Tab Icons and Labels (AC: #2)
  - [x] Select appropriate icons for each tab (e.g., Home: 'home', Workout: 'fitness-center', Routine: 'calendar-today', Exercises: 'list', Progress: 'show-chart')
  - [x] Ensure labels match: Home, Workout, Routine, Exercises, Progress
- [x] Task 5: Integration and Verification (AC: #3)
  - [x] Ensure `NavigationContainer` wraps `AppNavigator` in `App.tsx` (to be completed in Story 1.5, but verify here)
  - [x] Verify tab transitions and performance (NFR2: <300ms)

## Dev Notes

- Implemented 5-tab navigation using `@react-navigation/bottom-tabs`.
- Each tab has its own stack navigator for future expansion.
- Placeholder screens created with theme integration.
- Icons added using `@expo/vector-icons` (MaterialIcons).
- TypeScript verified (`tsc --noEmit` passes).
- Jest setup initiated but encountered issues with React 19/RN 0.81 syntax in `node_modules`.

### Project Structure Notes

- Matches feature-based navigation structure defined in architecture.

### References

- [Source: architecture.md#Navigation Architecture]
- [Source: epics.md#Story 1.4]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- All placeholder screens created and styled.
- Navigation structure fully implemented and type-checked.
- Icons and colors match design system.

### File List

- `src/screens/HomeScreen.tsx`
- `src/screens/WorkoutScreen.tsx`
- `src/screens/RoutineScreen.tsx`
- `src/screens/ExercisesScreen.tsx`
- `src/screens/ProgressScreen.tsx`
- `src/screens/index.ts`
- `src/navigation/Stacks.tsx`
- `src/navigation/AppNavigator.tsx`
- `App.tsx`
