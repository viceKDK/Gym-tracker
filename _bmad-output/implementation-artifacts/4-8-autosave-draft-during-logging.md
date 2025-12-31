# Story 4.8: Auto-Save Draft During Logging

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **my workout progress saved automatically**,
so that **I don't lose data if the app crashes or I close it accidentally**.

## Acceptance Criteria

1. **Given** the user is logging a workout, **When** 30 seconds pass, **Then** the current session state is auto-saved (UX-8), **And** saved to `AppContext` or `AsyncStorage`.
2. **Given** the user closes the app mid-workout, **When** they reopen the app, **Then** a "Resume workout from [time]" prompt is displayed on Home or Workout tab.
3. **Given** the user sees the resume prompt, **When** they tap "Resume", **Then** `LogWorkoutScreen` loads with all previously logged sets, **And** they can continue adding sets.
4. **Given** the user sees the resume prompt, **When** they tap "Discard", **Then** the draft is deleted, **And** they can start a fresh workout.
5. **Given** a draft exists from yesterday, **When** the user opens the app today, **Then** the draft is automatically cleared (only same-day drafts are kept), **And** no resume prompt is shown.
6. **Given** the app crashes during workout logging, **When** the user restarts the app, **Then** the auto-saved draft is recovered, **And** no data loss occurs (NFR7, NFR8).
7. **Given** the user completes a workout successfully, **When** the session is marked complete, **Then** any auto-saved draft is deleted, **And** only the completed session remains in history.

## Tasks / Subtasks

- [x] Task 1: Implement Auto-Save Timer (AC: #1)
  - [x] Update `useWorkoutSession` hook to include a persistence mechanism
  - [x] Implement a `useEffect` with `setInterval` (30s) to save session state to `AsyncStorage`
- [x] Task 2: Implement Draft Recovery Logic (AC: #2, #5, #6)
  - [x] Implement a check on app launch for existing draft data
  - [x] Validate draft date matches today's date
- [x] Task 3: Create Resume Prompt UI (AC: #2)
  - [x] Create `src/components/workout/ResumeWorkoutPrompt.tsx`
  - [x] Implement "Resume" and "Discard" actions
- [x] Task 4: Integrate Resume Action (AC: #3, #4, #7)
  - [x] Implement logic to reload state from draft
  - [x] Implement logic to clear draft on completion or discard
- [x] Task 5: Verification
  - [x] Simulate app kill and verify data recovery
  - [x] Verify cleanup after completion

## Dev Notes

- `@react-native-async-storage/async-storage` installed for draft persistence.
- `useWorkoutSession` hook updated with an auto-save effect that runs every 30 seconds.
- `useDraftRecovery` hook created to manage the recovery lifecycle on the Home/Workout screens.
- `ResumeWorkoutPrompt` provides a clear UI for users to recover their work.
- Drafts are automatically scoped to the current day.
- Verified with `tsc`.

### Project Structure Notes

- New hook `useDraftRecovery` added to `src/hooks/`.
- New UI component `ResumeWorkoutPrompt` added to `src/components/workout/`.

### References

- [Source: architecture.md#Error Handling Strategy]
- [Source: epics.md#Story 4.8]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Auto-save timer works correctly.
- Draft recovery UI integrated into the Workout screen.
- Cleanup on completion verified.

### File List

- `src/hooks/useWorkoutSession.ts`
- `src/hooks/useDraftRecovery.ts`
- `src/hooks/index.ts`
- `src/components/workout/ResumeWorkoutPrompt.tsx`
- `src/screens/WorkoutScreen.tsx`
- `src/components/ui/Card.tsx`
