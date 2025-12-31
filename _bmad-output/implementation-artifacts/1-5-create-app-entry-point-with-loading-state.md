# Story 1.5: Create App Entry Point with Loading State

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **the app to start quickly and show me when it's ready**,
so that **I'm not confused by a blank screen during initialization**.

## Acceptance Criteria

1. **Given** the user taps the app icon, **When** the app is launching, **Then** a loading indicator is displayed on a warm cream background (#FFF9F0), **And** the loading indicator uses the primary color (#FF6B6B).
2. **Given** the app is launching, **When** the database initialization completes successfully, **Then** the loading indicator disappears, **And** the home screen with navigation is displayed, **And** total launch time is under 2 seconds (NFR1).
3. **Given** the app initialization fails, **When** there is a database error, **Then** the error is logged to console, **And** the app still attempts to show the main screen (graceful degradation).
4. **Given** the app is launched, **When** initialization completes, **Then** the app is wrapped in `ThemeProvider` and `AppProvider` contexts, **And** `NavigationContainer` wraps the tab navigator.
5. **Given** the app has been used before, **When** the user relaunches the app, **Then** all previously stored data is available (FR27, FR28).

## Tasks / Subtasks

- [x] Task 1: Create AppContext (Architecture Decision)
  - [x] Create `src/contexts/AppContext.tsx` with initial state (todayRoutine, activeWorkout, streak)
  - [x] Export `AppProvider` and `useApp` hook
  - [x] Update `src/contexts/index.ts` to export AppContext members
- [x] Task 2: Implement App Initialization Logic (AC: #2, #3)
  - [x] Update `App.tsx` to include `isReady` state
  - [x] Call `initializeDatabase()` from `src/database/index.ts` within a `useEffect`
  - [x] Implement error handling for database initialization
- [x] Task 3: Create Loading Screen (AC: #1)
  - [x] Implement a loading view in `App.tsx` with `ActivityIndicator`
  - [x] Apply cream background (#FFF9F0) and coral primary color (#FF6B6B)
- [x] Task 4: Configure App Providers (AC: #4)
  - [x] Wrap the app component with `ThemeProvider`, `AppProvider`, and `NavigationContainer`
  - [x] Integrate `AppNavigator` from `src/navigation/AppNavigator.tsx` (Depends on Story 1.4)
- [x] Task 5: Verification (AC: #5)
  - [x] Verify launch performance (NFR1: <2s)
  - [x] Verify persistence across restarts

## Dev Notes

- `App.tsx` rewritten to handle initialization flow.
- `AppContext` created to manage global state (Routine, Active Workout, Streak).
- `initializeDatabase` correctly wired to `useEffect` on mount.
- Loading indicator styled according to design system.
- Providers (Theme, App, Navigation) properly nested.

### Project Structure Notes

- Follows standard React Context pattern.

### References
- [Source: architecture.md#App Entry Point]
- [Source: architecture.md#State Management]
- [Source: epics.md#Story 1.5]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Database initialization works.
- Providers configured correctly.
- UI shows navigation after loading.

### File List

- `src/contexts/AppContext.tsx`
- `src/contexts/index.ts`
- `App.tsx`
