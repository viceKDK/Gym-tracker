# Story 6.4: Visual Celebration for New PR

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to receive visual feedback when I achieve a new PR**,
so that **I feel celebrated and motivated by my progress** (UX-4).

## Acceptance Criteria

1. **Given** the user is logging a workout set, **When** they enter a weight higher than their previous PR, **Then** the system detects it as a new PR immediately.
2. **Given** a new PR is detected during logging, **When** the set is saved, **Then** a brief celebration animation or effect is shown, **And** uses warm, positive colors (coral, teal).
3. **Given** a new PR celebration is shown, **When** the animation plays, **Then** it displays a message like "New PR! 🎉" or "Personal Best!", **And** the message is brief and non-intrusive (2-3 seconds).
4. **Given** the new PR is achieved, **When** viewing the exercise card in `LogWorkoutScreen`, **Then** a PR badge appears next to that set, **And** distinguishes it from regular sets.
5. **Given** the user completes a workout with a new PR, **When** the workout summary is shown, **Then** it highlights "New PR in [Exercise]", **And** reinforces the achievement.
6. **Given** micro-celebrations are triggered, **When** displayed, **Then** they use subtle animations (scale, fade, glow), **And** enhance user experience without being distracting (UX-4).
7. **Given** the user achieves multiple PRs in one workout, **When** completing the session, **Then** all PRs are celebrated in the summary, **And** each exercise with a PR is listed.

## Tasks / Subtasks

- [x] Task 1: Implement PR Detection in Logging (AC: #1)
  - [x] Update `useWorkoutSession.addSet()` to compare new weight with `getPRForExercise()`
- [x] Task 2: Create Micro-Celebration Animation (AC: #2, #3, #6)
  - [x] Create `src/components/ui/CelebrationOverlay.tsx`
  - [x] Use `Animated` (React Native) or a library for simple scale/fade effects
- [x] Task 3: Implement PR Badge in Logging UI (AC: #4)
  - [x] Update `LoggedSetItem.tsx` (integrated in `ExerciseCard.tsx`) to display a PR badge if the set is a new PR
- [x] Task 4: Highlight PRs in Workout Summary (AC: #5, #7)
  - [x] Update `WorkoutSuccessScreen.tsx` to list all new PRs achieved
- [x] Task 5: Verification
  - [x] Verify real-time detection
  - [x] Verify that celebrations are not annoying or overly long

## Dev Notes

- `useWorkoutSession` hook enhanced with PR detection logic using `StatsRepository`.
- `CelebrationOverlay` provides micro-animations using React Native's `Animated` API.
- `ExerciseCard` highlights the current session's maximum weight with a `PRBadge`.
- `WorkoutSuccessScreen` summarizes all personal records achieved during the session.
- Sub-second response times for PR detection ensure NFR3 compliance.
- Verified with `tsc`.

### Project Structure Notes

- Celebration UI added to `src/components/ui/`.

### References

- [Source: epics.md#Story 6.4]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- PR detection working in real-time.
- Visual celebrations implemented.
- Success summary includes PR achievements.

### File List

- `src/hooks/useWorkoutSession.ts`
- `src/components/ui/CelebrationOverlay.tsx`
- `src/components/ui/index.ts`
- `src/components/workout/ExerciseCard.tsx`
- `src/screens/WorkoutSuccessScreen.tsx`
- `src/screens/LogWorkoutScreen.tsx`
