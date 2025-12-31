# Story 2.5: Search and Filter Exercises

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **user**,
I want **to search and filter my exercises**,
so that **I can quickly find specific exercises in a large library**.

## Acceptance Criteria

1. **Given** the user is on the exercise list screen, **When** they tap the search bar, **Then** the keyboard appears and they can type a search query.
2. **Given** the user types "press" in the search bar, **When** the search is executed, **Then** only exercises containing "press" in the name are displayed (case-insensitive), **And** exercises like "Press Banca", "Press Inclinado", "Press Militar" appear.
3. **Given** the user has typed a search query, **When** no exercises match the query, **Then** a "No exercises found" message is displayed.
4. **Given** the user clears the search bar, **When** the search query is empty, **Then** all exercises are displayed again.
5. **Given** category filter chips are displayed (All, Gym, Cardio, Abs), **When** the user taps "Gym", **Then** only exercises with category "gym" are displayed, **And** the "Gym" chip is visually selected.
6. **Given** both search query and category filter are active, **When** the user searches "press" with "Gym" filter, **Then** only gym exercises containing "press" are displayed.
7. **Given** the user is using search/filter, **When** they tap the clear/reset button, **Then** search query is cleared and filter is set to "All".

## Tasks / Subtasks

- [x] Task 1: Implement Search Bar Component (AC: #1)
  - [x] Create `src/components/exercise/SearchBar.tsx`
  - [x] Handle input focus and keyboard dismissal
- [x] Task 2: Implement Category Filter Chips (AC: #5)
  - [x] Create `src/components/exercise/CategoryFilter.tsx`
  - [x] Implement multi-state selection (All, Gym, Cardio, Abs)
- [x] Task 3: Implement Filtering Logic in Exercise List (AC: #2, #4, #6)
  - [x] Update `ExercisesScreen.tsx` state to include `searchQuery` and `selectedCategory`
  - [x] Apply filtering logic to the `exercises` array before rendering `SectionList`
- [x] Task 4: Implement Empty Search State (AC: #3)
  - [x] Display "No exercises found" when the filtered list is empty but the original list is not
- [x] Task 5: Implement Reset Logic (AC: #7)
  - [x] Provide a way to clear the search input and reset the filter
- [x] Task 6: Verification
  - [x] Verify real-time filtering performance
  - [x] Verify case-insensitivity of search

## Dev Notes

- Search and filtering implemented in-memory for optimal responsiveness.
- `SearchBar` includes a clear button for better UX.
- `CategoryFilter` implemented as a horizontal scrollable list of chips.
- Empty states distinguish between "no data" and "no search results".
- Verified with `tsc`.

### Project Structure Notes

- New components added to `src/components/exercise/`.

### References

- [Source: epics.md#Story 2.5]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

- Search functionality works.
- Category filtering works.
- Combined filtering supported.

### File List

- `src/components/exercise/SearchBar.tsx`
- `src/components/exercise/CategoryFilter.tsx`
- `src/screens/ExercisesScreen.tsx`
