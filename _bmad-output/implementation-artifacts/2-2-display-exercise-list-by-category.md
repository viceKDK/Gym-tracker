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

- [ ] Task 1: Create Exercise UI Components (Architecture Decision)
  - [ ] Create `src/components/exercise/ExerciseItem.tsx` with name, badge, and 44x44 touch target
  - [ ] Create `src/components/exercise/CategoryBadge.tsx` with conditional coloring (Coral for Gym, Teal for Cardio)
  - [ ] Create `src/components/exercise/EmptyState.tsx` with "No exercises yet" message and CTA
- [ ] Task 2: Implement Exercise List Screen (AC: #1, #4)
  - [ ] Update `src/screens/ExercisesScreen.tsx` to use `useExercises` hook
  - [ ] Implement `SectionList` to group exercises by category
  - [ ] Apply memoization to `ExerciseItem` for performance
- [ ] Task 3: Style the List (AC: #2, #5, #6)
  - [ ] Apply typography from theme (min 14pt)
  - [ ] Use `theme.spacing` for margins and padding
  - [ ] Ensure consistent layout according to UX specs
- [ ] Task 4: Navigation Integration
  - [ ] Ensure the screen is correctly wired in the `ExerciseStack` (part of Story 1.4)
- [ ] Task 5: Verification
  - [ ] Verify scrolling performance with mock data
  - [ ] Verify touch targets meet NFR11

## Dev Notes

### SectionList Pattern (from Architecture.md)

```typescript
// src/screens/ExercisesScreen.tsx
const sections = useMemo(() => [
  { title: 'Gym', data: exercises.filter(e => e.category === 'gym') },
  { title: 'Cardio', data: exercises.filter(e => e.category === 'cardio') },
  { title: 'Abs', data: exercises.filter(e => e.category === 'abs') },
].filter(s => s.data.length > 0), [exercises]);

return (
  <SectionList
    sections={sections}
    renderItem={({ item }) => <ExerciseItem exercise={item} />}
    renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.header}>{title}</Text>
    )}
    keyExtractor={(item) => item.id.toString()}
    ListEmptyComponent={<EmptyState />}
  />
);
```

### performance Guardrails
- Use `React.memo` for `ExerciseItem`.
- NFR11: Touch target min 44x44.
- NFR12: Body text min 14pt.

### References
- [Source: architecture.md#Component Architecture]
- [Source: architecture.md#List Performance Pattern]
- [Source: epics.md#Story 2.2]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
