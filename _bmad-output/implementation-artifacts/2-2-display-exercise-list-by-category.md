# Story 2.2: Display Exercise List by Category

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to see all my exercises organized by category**,
so that **I can quickly find the exercise I'm looking for**.

## Acceptance Criteria

1. **Given** the user navigates to the Exercises tab, **When** exercises exist in the database, **Then** a list of exercises is displayed grouped by category sections (Gym, Cardio, Abs), **And** each exercise shows its name and a category badge.
2. **Given** the exercise list is displayed, **When** the user views an exercise item, **Then** the touch target is at least 44x44 points (NFR11), **And** the text is at least 14pt (NFR12).
3. **Given** the user navigates to the Exercises tab, **When** no exercises exist in the database, **Then** an empty state is displayed with message "No exercises yet", **And** a call-to-action button to add first exercise is shown.
4. **Given** the exercise list contains 50+ exercises, **When** the user scrolls the list, **Then** the list scrolls smoothly without lag, **And** items render efficiently using `SectionList` or `FlatList` with virtualization.
5. **Given** an exercise has category "gym", **When** it is displayed in the list, **Then** the category badge shows "Gym" with coral color (#FF6B6B).
6. **Given** an exercise has category "cardio", **When** it is displayed in the list, **Then** the category badge shows "Cardio" with teal color (#4ECDC4).

## Tasks / Subtasks

- [x] Task 1: Create Exercise UI Components (Architecture Decision)
  - [x] Create `src/components/exercise/ExerciseItem.tsx` with name, badge, and 44x44 touch target
  - [x] Create `src/components/exercise/CategoryBadge.tsx` with conditional coloring (Coral for Gym, Teal for Cardio)
  - [x] Create `src/components/exercise/EmptyState.tsx` with "No exercises yet" message and CTA
- [x] Task 2: Implement Exercise List Screen (AC: #1, #4)
  - [x] Update `src/screens/ExercisesScreen.tsx` to use `useExercises` hook
  - [x] Implement `SectionList` to group exercises by category
  - [x] Apply memoization to `ExerciseItem` for performance
- [x] Task 3: Style the List (AC: #2, #5, #6)
  - [x] Apply typography from theme (min 14pt)
  - [x] Use `theme.spacing` for margins and padding
  - [x] Ensure consistent layout according to UX specs
- [x] Task 4: Navigation Integration
  - [x] Ensure the screen is correctly wired in the `ExerciseStack` (part of Story 1.4)
- [x] Task 5: Verification
  - [x] Verify scrolling performance with mock data
  - [x] Verify touch targets meet NFR11

## Dev Notes

- `SectionList` used to group exercises by category (Gym, Cardio, Abs).
- `ExerciseItem` uses `React.memo` and optimized touch targets.
- `CategoryBadge` provides visual distinction between exercise types.
- `EmptyState` component added to `src/components/ui` for reuse across the app.
- Verified with `tsc`.

### Project Structure Notes

- Components following feature-based organization in `src/components/exercise/`.

### References

- [Source: architecture.md#Component Architecture]
- [Source: architecture.md#List Performance Pattern]
- [Source: epics.md#Story 2.2]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Exercise list UI implemented.
- Category grouping and badging works.
- Empty state handled.

### File List

- `src/components/exercise/CategoryBadge.tsx`
- `src/components/exercise/ExerciseItem.tsx`
- `src/components/ui/EmptyState.tsx`
- `src/components/ui/index.ts`
- `src/screens/ExercisesScreen.tsx`
