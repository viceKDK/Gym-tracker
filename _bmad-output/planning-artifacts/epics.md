---
stepsCompleted: [1, 2, 3]
inputDocuments:
  - prd.md
  - architecture.md
  - ux-design-specification.md
---

# gym-TRAKER - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for gym-TRAKER, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Exercise Management:**
- FR1: User can create a new exercise with name and category (Gym/Cardio/Abs)
- FR2: User can view all exercises organized by category
- FR3: User can edit an existing exercise's name or category
- FR4: User can delete an exercise
- FR5: User can search/filter exercises by name or category

**Routine Management:**
- FR6: User can assign exercises to specific days of the week
- FR7: User can view the weekly routine showing exercises per day
- FR8: User can modify which exercises are assigned to each day
- FR9: User can see today's scheduled exercises based on current weekday
- FR10: User can mark a day as rest day (no exercises)

**Workout Logging:**
- FR11: User can start a workout session for the current day
- FR12: User can see pre-loaded exercises from today's routine
- FR13: User can log sets for each exercise (weight, reps)
- FR14: User can add multiple sets per exercise in a session
- FR15: User can add an ad-hoc exercise not in today's routine
- FR16: User can complete and save the workout session
- FR17: User can view past workout sessions by date
- FR18: User can see details of a past workout (exercises, sets, weights, reps)

**Activity Visualization:**
- FR19: User can view a GitHub-style activity graph on the home screen
- FR20: Activity graph displays workout days with color intensity based on activity
- FR21: User can see the current streak of consecutive workout days
- FR22: User can navigate to different time periods on the activity graph

**Progress Tracking:**
- FR23: User can view a progress chart for any exercise
- FR24: Progress chart shows weight/reps evolution over time
- FR25: User can see their personal record (PR) for each exercise
- FR26: User receives visual feedback when achieving a new PR

**Data Persistence:**
- FR27: All data persists locally between app sessions
- FR28: Data survives app updates and restarts

### NonFunctional Requirements

**Performance:**
- NFR1: App launch time < 2 seconds
- NFR2: Screen transitions < 300ms
- NFR3: Workout logging action < 100ms response
- NFR4: Activity graph renders < 500ms with 1 year of data
- NFR5: Progress charts render < 1 second with full history
- NFR6: SQLite queries complete < 100ms for typical operations

**Reliability:**
- NFR7: No data loss under any normal usage scenario
- NFR8: App recovers gracefully from crashes without data corruption
- NFR9: Data persists correctly across app updates

**Usability:**
- NFR10: All primary actions achievable in ≤ 3 taps
- NFR11: Touch targets minimum 44x44 points
- NFR12: Text readable without zooming (minimum 14pt body text)

**Storage:**
- NFR13: App functions with device storage < 100MB free
- NFR14: Database size < 50MB after 2 years of daily use

### Additional Requirements

**From Architecture - Starter Template & Infrastructure:**
- ARCH-1: Use Expo Blank TypeScript template (`npx create-expo-app@latest gym-TRAKER --template blank-typescript`)
- ARCH-2: React Native + Expo SDK 53 with New Architecture enabled
- ARCH-3: TypeScript with strict mode
- ARCH-4: Dependencies: @react-navigation/native, @react-navigation/bottom-tabs, expo-sqlite, react-native-chart-kit, react-native-svg, date-fns
- ARCH-5: 5-tab bottom navigation structure (Home, Workout, Routine, Exercises, Progress)
- ARCH-6: Repository pattern for data access
- ARCH-7: React Context + Custom Hooks for state management
- ARCH-8: SQLite database with 4 tables (exercises, routine_days, workout_sessions, workout_sets)
- ARCH-9: Feature-based component organization
- ARCH-10: Theme object from Design System document

**From UX - Interaction & Visual Requirements:**
- UX-1: Portrait orientation only
- UX-2: Activity graph as "hero" element on home screen
- UX-3: Pre-loaded daily routine (zero-thought actions)
- UX-4: Micro-celebrations for PRs and streak milestones
- UX-5: Warm color palette (Coral #FF6B6B, Teal #4ECDC4, Cream #FFF9F0)
- UX-6: Neutral gray (#EBEDF0) for missed days - no shame colors
- UX-7: Progressive disclosure for complex data
- UX-8: Auto-save draft during workout logging (every 30 seconds)
- UX-9: Edge case handling (rest days show message, ad-hoc exercises allowed, crash recovery)
- UX-10: Bordes redondeados (Cards 16px, Buttons 12px), sombras suaves

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Create exercise with name/category |
| FR2 | Epic 2 | View exercises by category |
| FR3 | Epic 2 | Edit exercise name/category |
| FR4 | Epic 2 | Delete exercise |
| FR5 | Epic 2 | Search/filter exercises |
| FR6 | Epic 3 | Assign exercises to days |
| FR7 | Epic 3 | View weekly routine |
| FR8 | Epic 3 | Modify day assignments |
| FR9 | Epic 3 | See today's exercises |
| FR10 | Epic 3 | Mark rest day |
| FR11 | Epic 4 | Start workout session |
| FR12 | Epic 4 | Pre-loaded exercises |
| FR13 | Epic 4 | Log sets (weight/reps) |
| FR14 | Epic 4 | Multiple sets per exercise |
| FR15 | Epic 4 | Add ad-hoc exercise |
| FR16 | Epic 4 | Complete/save session |
| FR17 | Epic 4 | View past workouts |
| FR18 | Epic 4 | Past workout details |
| FR19 | Epic 5 | Activity graph on home |
| FR20 | Epic 5 | Color intensity by activity |
| FR21 | Epic 5 | Streak counter |
| FR22 | Epic 5 | Navigate time periods |
| FR23 | Epic 6 | Progress chart per exercise |
| FR24 | Epic 6 | Weight/reps evolution |
| FR25 | Epic 6 | Personal record display |
| FR26 | Epic 6 | PR visual feedback |
| FR27 | Epic 1 | Local data persistence |
| FR28 | Epic 1 | Data survives updates |

## Epic List

### Epic 1: App Foundation & First Launch Experience

**User Outcome:** User can launch the app and see a functional home screen with navigation

This is the scaffold that makes everything else possible. Based on Architecture requirements, includes:
- Expo TypeScript project initialization
- 5-tab navigation structure (Home, Workout, Routine, Exercises, Progress)
- SQLite database initialization with schema
- Theme system from Design System
- Empty states for all screens

**FRs covered:** FR27, FR28
**Additional:** ARCH-1 through ARCH-10

---

### Epic 2: Build Your Exercise Library

**User Outcome:** User can create, view, edit, and organize their personal exercise database

- Create exercises with name and category (Gym/Cardio/Abs)
- View exercises organized by category
- Edit and delete exercises
- Search/filter by name or category

**FRs covered:** FR1, FR2, FR3, FR4, FR5

---

### Epic 3: Configure Your Weekly Routine

**User Outcome:** User can set up their weekly training schedule

- Assign exercises to specific days of the week
- View weekly routine overview
- Modify day assignments
- See today's scheduled exercises
- Mark rest days

**FRs covered:** FR6, FR7, FR8, FR9, FR10

---

### Epic 4: Log Your Daily Workouts

**User Outcome:** User can record workout sessions with sets, weight, and reps in <60 seconds

- Start workout session for current day
- See pre-loaded exercises from today's routine
- Log sets (weight, reps) for each exercise
- Add multiple sets per exercise
- Add ad-hoc exercises not in routine
- Complete and save session
- View past workouts and details
- Auto-save draft during logging

**FRs covered:** FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18
**Additional:** UX-8 (auto-save)

---

### Epic 5: Visualize Your Consistency

**User Outcome:** User can see their gym attendance as a motivating GitHub-style heatmap

- Activity graph on home screen (hero element)
- Color intensity based on workout activity
- Current streak counter
- Navigate to different time periods
- Neutral gray for missed days (no shame)

**FRs covered:** FR19, FR20, FR21, FR22
**Additional:** UX-2, UX-6

---

### Epic 6: Track Your Progress & PRs

**User Outcome:** User can see strength progress over time and celebrate personal records

- Progress chart for any exercise
- Weight/reps evolution visualization
- Personal record (PR) detection
- Visual celebration feedback for new PRs

**FRs covered:** FR23, FR24, FR25, FR26
**Additional:** UX-4 (micro-celebrations)

---

### Epic Dependencies

```
Epic 1 (Foundation) ← Standalone
    ↓
Epic 2 (Exercises) ← Uses DB from Epic 1
    ↓
Epic 3 (Routine) ← Uses Exercises from Epic 2
    ↓
Epic 4 (Logging) ← Uses Routine from Epic 3
    ↓
Epic 5 (Activity Graph) ← Uses Workout data from Epic 4
    ↓
Epic 6 (Progress) ← Uses Workout data from Epic 4
```

Each epic is standalone and delivers complete functionality for its domain.

---

## Epic 1: App Foundation & First Launch Experience

**User Outcome:** User can launch the app and see a functional home screen with navigation

### Story 1.1: Initialize Project with Expo Starter Template

As a **developer**,
I want **the project initialized with Expo TypeScript and all dependencies installed**,
So that **I have a working foundation to build the app**.

**Acceptance Criteria:**

**Given** the developer runs `npx create-expo-app@latest gym-TRAKER --template blank-typescript`
**When** the project is created
**Then** a new Expo TypeScript project exists with strict mode enabled
**And** the following dependencies are installed: @react-navigation/native, @react-navigation/bottom-tabs, react-native-screens, react-native-safe-area-context, expo-sqlite, react-native-chart-kit, react-native-svg, date-fns

**Given** the project is initialized
**When** the developer inspects the directory structure
**Then** the following folders exist: src/components/ui, src/components/activity, src/components/workout, src/components/progress, src/components/exercise, src/screens, src/navigation, src/database/repositories, src/hooks, src/theme, src/types, src/contexts, src/utils

**Given** the project dependencies are installed
**When** the developer runs `npx expo start`
**Then** the app compiles without errors and displays the default Expo blank screen

---

### Story 1.2: Implement Theme System & Base UI Components

As a **user**,
I want **the app to have a warm, cohesive visual design**,
So that **it feels welcoming and personal, not like a generic fitness app**.

**Acceptance Criteria:**

**Given** the theme file exists at src/theme/index.ts
**When** a component imports the theme
**Then** it has access to colors (primary: #FF6B6B, secondary: #4ECDC4, background: #FFF9F0, surface: #FFFFFF, text: #2D3436, textSecondary: #636E72, border: #DFE6E9, error: #E74C3C, success: #27AE60, activityLevels array)
**And** spacing values (xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48)
**And** borderRadius values (sm: 4, md: 8, lg: 12, xl: 16, full: 9999)
**And** typography definitions (h1, h2, h3, body, caption)

**Given** ThemeContext is implemented
**When** a component uses useTheme() hook
**Then** it receives the theme object with all defined values

**Given** the base UI components are created
**When** Button component is rendered with variant "primary"
**Then** it displays with coral background (#FF6B6B), white text, 12px border radius, and minimum 44x44 touch target

**Given** the Card component is rendered
**When** it contains child content
**Then** it displays with white background, 16px border radius, 16px padding, and subtle shadow

**Given** the NumericInput component is rendered
**When** the user taps on it
**Then** a numeric keyboard appears for input

---

### Story 1.3: Initialize SQLite Database with Schema

As a **user**,
I want **my workout data stored locally on my device**,
So that **my data persists between sessions and never requires internet**.

**Acceptance Criteria:**

**Given** the app launches for the first time
**When** the database initialization runs
**Then** a SQLite database named "gym-traker.db" is created
**And** foreign keys are enabled via PRAGMA

**Given** the database is initialized
**When** the schema creation runs
**Then** the `exercises` table exists with columns: id (INTEGER PRIMARY KEY), name (TEXT NOT NULL), category (TEXT with CHECK constraint for 'gym'/'cardio'/'abs'), created_at (TEXT DEFAULT CURRENT_TIMESTAMP)

**Given** the database is initialized
**When** the schema creation runs
**Then** the `routine_days` table exists with columns: id, day_of_week (INTEGER 0-6), exercise_id (FK to exercises), order_index
**And** ON DELETE CASCADE is configured for exercise_id

**Given** the database is initialized
**When** the schema creation runs
**Then** the `workout_sessions` table exists with columns: id, date (TEXT NOT NULL UNIQUE), completed_at, notes

**Given** the database is initialized
**When** the schema creation runs
**Then** the `workout_sets` table exists with columns: id, session_id (FK), exercise_id (FK), set_number, weight (REAL), reps (INTEGER), created_at
**And** ON DELETE CASCADE is configured for both foreign keys

**Given** the database is initialized
**When** querying the database
**Then** indexes exist: idx_sessions_date, idx_sets_session, idx_sets_exercise, idx_routine_day

**Given** the app is closed and reopened
**When** the database initialization runs again
**Then** existing data is preserved (tables use IF NOT EXISTS)

---

### Story 1.4: Implement 5-Tab Navigation Structure

As a **user**,
I want **to navigate between different sections of the app easily**,
So that **I can access exercises, routines, workouts, and progress with one tap**.

**Acceptance Criteria:**

**Given** the app is launched
**When** the home screen loads
**Then** a bottom tab bar is visible with 5 tabs: Home, Workout, Routine, Exercises, Progress

**Given** the tab bar is displayed
**When** the user views the tabs
**Then** each tab has an appropriate icon and label
**And** the active tab is highlighted with the primary color (#FF6B6B)
**And** inactive tabs use textSecondary color (#636E72)

**Given** the user is on any tab
**When** they tap a different tab
**Then** the screen transitions to the selected tab in under 300ms (NFR2)
**And** the tab bar remains visible

**Given** the tab navigator is configured
**When** each tab screen loads
**Then** a placeholder screen with an empty state message is displayed (e.g., "No exercises yet" for Exercises tab)

**Given** the navigation is implemented
**When** the app launches
**Then** the Home tab is selected by default

---

### Story 1.5: Create App Entry Point with Loading State

As a **user**,
I want **the app to start quickly and show me when it's ready**,
So that **I'm not confused by a blank screen during initialization**.

**Acceptance Criteria:**

**Given** the user taps the app icon
**When** the app is launching
**Then** a loading indicator is displayed on a warm cream background (#FFF9F0)
**And** the loading indicator uses the primary color (#FF6B6B)

**Given** the app is launching
**When** the database initialization completes successfully
**Then** the loading indicator disappears
**And** the home screen with navigation is displayed
**And** total launch time is under 2 seconds (NFR1)

**Given** the app initialization fails
**When** there is a database error
**Then** the error is logged to console
**And** the app still attempts to show the main screen (graceful degradation)

**Given** the app is launched
**When** initialization completes
**Then** the app is wrapped in ThemeProvider and AppProvider contexts
**And** NavigationContainer wraps the tab navigator

**Given** the app has been used before
**When** the user relaunches the app
**Then** all previously stored data is available (FR27, FR28)

---

## Epic 2: Build Your Exercise Library

**User Outcome:** User can create, view, edit, and organize their personal exercise database

### Story 2.1: Create ExerciseRepository with CRUD Operations

As a **developer**,
I want **a repository to manage exercise data in SQLite**,
So that **exercise CRUD operations are abstracted and reusable**.

**Acceptance Criteria:**

**Given** the ExerciseRepository class exists
**When** getAll() is called
**Then** it returns all exercises ordered by category, then by name
**And** the query completes in under 100ms (NFR6)

**Given** the ExerciseRepository class exists
**When** getByCategory('gym') is called
**Then** it returns only exercises with category 'gym'

**Given** valid exercise data {name: "Press Banca", category: "gym"}
**When** create() is called with this data
**Then** a new exercise is inserted into the database
**And** the created exercise with id is returned

**Given** an existing exercise with id 1
**When** update(1, {name: "Bench Press"}) is called
**Then** the exercise name is updated in the database
**And** the updated exercise is returned

**Given** an existing exercise with id 1
**When** delete(1) is called
**Then** the exercise is removed from the database
**And** any routine_days referencing this exercise are also deleted (CASCADE)

**Given** the useExercises() hook is used in a component
**When** the component mounts
**Then** exercises are loaded automatically
**And** loading, error, and refresh states are available

---

### Story 2.2: Display Exercise List by Category

As a **user**,
I want **to see all my exercises organized by category**,
So that **I can quickly find the exercise I'm looking for**.

**Acceptance Criteria:**

**Given** the user navigates to the Exercises tab
**When** exercises exist in the database
**Then** a list of exercises is displayed grouped by category sections (Gym, Cardio, Abs)
**And** each exercise shows its name and a category badge

**Given** the exercise list is displayed
**When** the user views an exercise item
**Then** the touch target is at least 44x44 points (NFR11)
**And** the text is at least 14pt (NFR12)

**Given** the user navigates to the Exercises tab
**When** no exercises exist in the database
**Then** an empty state is displayed with message "No exercises yet"
**And** a call-to-action button to add first exercise is shown

**Given** the exercise list contains 50+ exercises
**When** the user scrolls the list
**Then** the list scrolls smoothly without lag
**And** items render efficiently using FlatList virtualization

**Given** an exercise has category "gym"
**When** it is displayed in the list
**Then** the category badge shows "Gym" with coral color (#FF6B6B)

**Given** an exercise has category "cardio"
**When** it is displayed in the list
**Then** the category badge shows "Cardio" with teal color (#4ECDC4)

---

### Story 2.3: Create New Exercise

As a **user**,
I want **to add new exercises to my library**,
So that **I can build my personal database of exercises**.

**Acceptance Criteria:**

**Given** the user is on the Exercise list screen
**When** they tap the "Add Exercise" button (+ icon or FAB)
**Then** the ExerciseFormScreen is displayed with empty fields

**Given** the user is on the ExerciseFormScreen
**When** the form loads
**Then** a text input for exercise name is displayed
**And** a category picker with options Gym, Cardio, Abs is displayed

**Given** the user enters a valid name and selects a category
**When** they tap "Save"
**Then** the exercise is saved to the database
**And** the user is returned to the exercise list
**And** the new exercise appears in the list

**Given** the user tries to save without entering a name
**When** they tap "Save"
**Then** an inline error "Name is required" is displayed
**And** the form is not submitted

**Given** the user tries to save without selecting a category
**When** they tap "Save"
**Then** an inline error "Category is required" is displayed
**And** the form is not submitted

**Given** the user is on the form screen
**When** they tap "Cancel" or the back button
**Then** no exercise is saved
**And** they return to the exercise list

---

### Story 2.4: Edit and Delete Exercise

As a **user**,
I want **to edit or delete existing exercises**,
So that **I can correct mistakes or remove exercises I no longer use**.

**Acceptance Criteria:**

**Given** the user is viewing the exercise list
**When** they tap on an exercise item
**Then** the ExerciseFormScreen opens in edit mode
**And** the name and category fields are pre-populated with existing values

**Given** the user is editing an exercise
**When** they change the name and tap "Save"
**Then** the exercise is updated in the database
**And** they return to the list showing the updated name

**Given** the user is editing an exercise
**When** they tap "Delete" button
**Then** a confirmation dialog appears: "Delete this exercise? It will also be removed from your routines."

**Given** the confirmation dialog is displayed
**When** the user confirms deletion
**Then** the exercise is deleted from the database
**And** any routine_days referencing this exercise are deleted (CASCADE)
**And** the user returns to the list without the deleted exercise

**Given** the confirmation dialog is displayed
**When** the user cancels
**Then** the dialog closes and no deletion occurs

**Given** an exercise is used in workout_sets
**When** the user deletes the exercise
**Then** historical workout data is preserved (workout_sets keep the exercise_id reference but exercise details may show "Deleted Exercise")

---

### Story 2.5: Search and Filter Exercises

As a **user**,
I want **to search and filter my exercises**,
So that **I can quickly find specific exercises in a large library**.

**Acceptance Criteria:**

**Given** the user is on the exercise list screen
**When** they tap the search bar
**Then** the keyboard appears and they can type a search query

**Given** the user types "press" in the search bar
**When** the search is executed
**Then** only exercises containing "press" in the name are displayed (case-insensitive)
**And** exercises like "Press Banca", "Press Inclinado", "Press Militar" appear

**Given** the user has typed a search query
**When** no exercises match the query
**Then** a "No exercises found" message is displayed

**Given** the user clears the search bar
**When** the search query is empty
**Then** all exercises are displayed again

**Given** category filter chips are displayed (All, Gym, Cardio, Abs)
**When** the user taps "Gym"
**Then** only exercises with category "gym" are displayed
**And** the "Gym" chip is visually selected

**Given** both search query and category filter are active
**When** the user searches "press" with "Gym" filter
**Then** only gym exercises containing "press" are displayed

**Given** the user is using search/filter
**When** they tap the clear/reset button
**Then** search query is cleared and filter is set to "All"

---

## Epic 3: Configure Your Weekly Routine

**User Outcome:** User can set up their weekly training schedule

### Story 3.1: Create RoutineRepository with Data Access

As a **developer**,
I want **a repository to manage weekly routine data**,
So that **routine configuration operations are abstracted and reusable**.

**Acceptance Criteria:**

**Given** the RoutineRepository class exists
**When** getByDay(2) is called (Tuesday)
**Then** it returns all exercises assigned to Tuesday ordered by order_index
**And** includes exercise details (name, category) via JOIN

**Given** the RoutineRepository class exists
**When** getWeeklyOverview() is called
**Then** it returns an array of 7 days (0-6) with their assigned exercises
**And** each day entry includes exercise count

**Given** an exercise_id and day_of_week
**When** assignExercise(exerciseId, dayOfWeek, orderIndex) is called
**Then** a new routine_days record is created
**And** the exercise is assigned to that day

**Given** an existing routine assignment
**When** removeExercise(routineDayId) is called
**Then** the assignment is deleted from routine_days

**Given** a day_of_week value
**When** clearDay(dayOfWeek) is called
**Then** all routine_days records for that day are deleted

**Given** the useTodayRoutine() hook is used
**When** the component mounts
**Then** today's exercises are loaded based on current weekday
**And** loading and error states are available

---

### Story 3.2: Display Weekly Routine Overview

As a **user**,
I want **to see my weekly routine at a glance**,
So that **I know what exercises are planned for each day**.

**Acceptance Criteria:**

**Given** the user navigates to the Routine tab
**When** the screen loads
**Then** all 7 days of the week are displayed (Monday through Sunday)
**And** each day shows the number of exercises assigned

**Given** a day has exercises assigned
**When** the day card is displayed
**Then** exercise names are shown (up to 3, with "+N more" if more)
**And** the day card is tappable to configure

**Given** a day has no exercises assigned
**When** the day card is displayed
**Then** "No exercises" or "Rest Day" is shown
**And** the card is still tappable to add exercises

**Given** today is Wednesday
**When** the weekly overview is displayed
**Then** Wednesday's card is visually highlighted (different border or background)
**And** the label shows "Today" alongside the day name

**Given** the routine has been configured
**When** the user views the weekly overview
**Then** they can see their entire week's training plan in one screen

---

### Story 3.3: Configure Exercises for a Day

As a **user**,
I want **to assign exercises to specific days of the week**,
So that **my routine is pre-configured and ready when I log workouts**.

**Acceptance Criteria:**

**Given** the user taps on a day in the weekly overview
**When** the DayConfigScreen opens
**Then** the day name is shown in the header (e.g., "Monday")
**And** all available exercises from the library are displayed

**Given** the DayConfigScreen is displayed
**When** exercises are shown
**Then** they are grouped by category (Gym, Cardio, Abs)
**And** exercises already assigned to this day show a checkmark

**Given** the user taps an unassigned exercise
**When** the exercise is selected
**Then** it is immediately added to routine_days for this day
**And** a checkmark appears on the exercise

**Given** the user taps an already-assigned exercise
**When** the exercise is deselected
**Then** it is immediately removed from routine_days for this day
**And** the checkmark disappears

**Given** multiple exercises are assigned to a day
**When** the user views the list
**Then** they can drag to reorder exercises (optional: or use up/down buttons)
**And** the order_index is updated accordingly

**Given** the user finishes configuring
**When** they tap back or the close button
**Then** changes are already saved (no explicit save button needed)
**And** the weekly overview reflects the changes

---

### Story 3.4: View Today's Scheduled Exercises

As a **user**,
I want **to see today's scheduled exercises immediately**,
So that **I know what workout to do without navigating**.

**Acceptance Criteria:**

**Given** today is Monday and Monday has exercises assigned
**When** the user views the Routine tab
**Then** "Today's Routine" section is prominently displayed at the top
**And** all Monday's exercises are listed

**Given** today's routine is displayed
**When** the user views the exercise list
**Then** each exercise shows name and category
**And** exercises are in the configured order

**Given** today is Saturday and Saturday is a rest day
**When** the user views the Routine tab
**Then** "Today's Routine" shows "Rest Day - No exercises scheduled"
**And** a relaxing/encouraging message is optionally shown

**Given** the Home tab exists
**When** the user views the Home screen
**Then** a "Today's Workout" preview card shows exercises scheduled for today
**And** tapping it navigates to the Routine tab or starts workout logging

**Given** no routine has been configured yet
**When** the user views "Today's Routine"
**Then** an empty state shows "No routine configured for today"
**And** a button to configure today's exercises is shown

---

### Story 3.5: Mark Day as Rest Day

As a **user**,
I want **to explicitly mark a day as a rest day**,
So that **the app knows I'm intentionally resting, not missing a workout**.

**Acceptance Criteria:**

**Given** the user is on the DayConfigScreen for any day
**When** they tap "Mark as Rest Day" button
**Then** all exercises assigned to this day are removed
**And** the day is marked as a rest day

**Given** a day is marked as rest day
**When** the weekly overview is displayed
**Then** the day card shows "Rest Day" with a distinct visual style (e.g., lighter background, rest icon)

**Given** a day is marked as rest day
**When** the user taps on the day card
**Then** the DayConfigScreen opens
**And** they can add exercises to convert it back to a workout day

**Given** the user adds an exercise to a rest day
**When** the exercise is assigned
**Then** the day is no longer marked as rest day
**And** the weekly overview updates to show the exercise

**Given** a rest day vs unconfigured day
**When** displayed in weekly overview
**Then** rest days show "Rest Day" explicitly
**And** unconfigured days show "No exercises" or similar

---

## Epic 4: Log Your Daily Workouts

**User Outcome:** User can record workout sessions with sets, weight, and reps in <60 seconds

### Story 4.1: Create WorkoutRepository for Session Management

As a **developer**,
I want **a repository to manage workout sessions and sets**,
So that **workout logging operations are abstracted and reusable**.

**Acceptance Criteria:**

**Given** the WorkoutRepository class exists
**When** createSession(date) is called with today's date
**Then** a new workout_sessions record is created
**And** the session id is returned

**Given** a session exists for a specific date
**When** getSession(date) is called
**Then** it returns the session with id, date, completed_at, notes

**Given** a session exists
**When** completeSession(sessionId) is called
**Then** the completed_at field is set to current timestamp

**Given** a session exists
**When** addSet(sessionId, exerciseId, setNumber, weight, reps) is called
**Then** a new workout_sets record is created
**And** the set data is saved

**Given** a session has sets logged
**When** getSetsForSession(sessionId) is called
**Then** all workout_sets for that session are returned with exercise details (JOIN)
**And** sets are ordered by exercise, then set_number

**Given** workout history exists
**When** getWorkoutHistory() is called
**Then** all workout_sessions are returned ordered by date DESC
**And** each includes exercise count and total sets count

**Given** the useWorkoutSession() hook is used
**When** a component mounts
**Then** the current session state is available
**And** methods to add sets and complete session are provided

---

### Story 4.2: Start Workout Session with Pre-loaded Exercises

As a **user**,
I want **to start a workout with my routine already loaded**,
So that **I can begin logging immediately without selecting exercises**.

**Acceptance Criteria:**

**Given** the user navigates to the Workout tab
**When** they tap "Start Workout" or "Log Today's Workout"
**Then** a new workout session is created for today's date
**And** LogWorkoutScreen is displayed

**Given** today has exercises in the routine (from Epic 3)
**When** LogWorkoutScreen loads
**Then** all of today's exercises are displayed as cards
**And** exercises are in the configured order

**Given** an exercise card is displayed
**When** the user views it
**Then** it shows exercise name, category badge
**And** a "+" button or input area to add sets

**Given** today is a rest day (no exercises in routine)
**When** the user starts a workout
**Then** an empty state with "No exercises scheduled for today" is shown
**And** an "Add Exercise" button is available

**Given** a workout session already exists for today
**When** the user taps "Start Workout"
**Then** they are asked "Continue existing workout or start new?"
**And** can choose to continue or replace the existing session

**Given** the user navigates away during workout
**When** they return to the Workout tab
**Then** the in-progress session is still displayed (not lost)

---

### Story 4.3: Log Sets with Weight and Reps

As a **user**,
I want **to quickly log weight and reps for each set**,
So that **I can record my workout in under 60 seconds**.

**Acceptance Criteria:**

**Given** the user is on LogWorkoutScreen with exercises loaded
**When** they tap on an exercise card
**Then** the card expands to show set input fields

**Given** set input fields are displayed
**When** the user taps the weight field
**Then** a numeric keyboard appears
**And** they can enter decimal values (e.g., 82.5)

**Given** set input fields are displayed
**When** the user taps the reps field
**Then** a numeric keyboard appears
**And** they can enter integer values (e.g., 8)

**Given** the user enters weight and reps
**When** they tap "Add Set" or press Enter
**Then** the set is saved to workout_sets table
**And** input response time is under 100ms (NFR3)
**And** a visual confirmation (checkmark) appears

**Given** a set has been logged
**When** the set is displayed
**Then** it shows "Set 1: 80kg x 8 reps" with a checkmark

**Given** the user wants to log another set
**When** they tap "Add Set" again
**Then** fields are cleared and ready for Set 2
**And** previous sets remain visible above

**Given** the user logs multiple sets
**When** viewing the exercise card
**Then** all sets are displayed (Set 1, Set 2, Set 3, etc.)
**And** each set is independently editable or deletable

**Given** the user enters 0 or leaves weight empty
**When** they add the set
**Then** it's allowed (for bodyweight exercises)
**And** displays as "0kg x 8 reps" or "Bodyweight x 8 reps"

---

### Story 4.4: Add Ad-Hoc Exercise to Workout

As a **user**,
I want **to add exercises not in today's routine**,
So that **I can log extra exercises or substitute when needed**.

**Acceptance Criteria:**

**Given** the user is on LogWorkoutScreen
**When** they tap "Add Exercise" button
**Then** a modal/sheet with all exercises from the library is displayed

**Given** the exercise picker is displayed
**When** the user views exercises
**Then** exercises are grouped by category (Gym, Cardio, Abs)
**And** a search bar is available for quick filtering

**Given** the user selects an exercise from the picker
**When** they tap it
**Then** the exercise is added to the current workout session
**And** the picker closes
**And** the exercise card appears in LogWorkoutScreen ready for set input

**Given** an ad-hoc exercise has been added
**When** viewing the workout
**Then** it's visually distinguished or labeled "Added" vs routine exercises

**Given** the user adds multiple ad-hoc exercises
**When** viewing the workout
**Then** both pre-loaded and ad-hoc exercises are displayed
**And** all can have sets logged equally

**Given** the user searches for "press" in the exercise picker
**When** typing
**Then** only matching exercises are shown
**And** they can quickly add without scrolling

---

### Story 4.5: Complete and Save Workout Session

As a **user**,
I want **to finish and save my workout session**,
So that **it's recorded in my history and the activity graph updates**.

**Acceptance Criteria:**

**Given** the user has logged at least one set
**When** they tap "Complete Workout" button
**Then** the session's completed_at field is set to current timestamp
**And** a success message or animation is shown

**Given** the workout is completed
**When** the success screen is displayed
**Then** a summary is shown: date, exercises count, total sets
**And** a "View Activity" button to navigate to Home

**Given** the workout is completed successfully
**When** the user navigates to the Home tab
**Then** today's square in the activity graph is filled with color
**And** the change is immediately visible (no delay)

**Given** the user tries to complete a workout with no sets logged
**When** they tap "Complete Workout"
**Then** a confirmation dialog asks "No sets logged. Complete anyway?"
**And** they can choose to complete or cancel

**Given** the workout is completed
**When** the user navigates back to the Workout tab
**Then** the "Start Workout" button is available again
**And** no in-progress session is shown

**Given** the user accidentally closes the app during workout
**When** they reopen and the workout was auto-saved
**Then** they can resume the workout (see Story 4.8)

---

### Story 4.6: View Past Workout History

As a **user**,
I want **to see a list of all my past workouts**,
So that **I can review my training history**.

**Acceptance Criteria:**

**Given** the user navigates to the Workout tab
**When** they tap "History" or "Past Workouts"
**Then** WorkoutHistoryScreen is displayed with a list of all completed sessions

**Given** the workout history is displayed
**When** viewing the list
**Then** sessions are ordered by date descending (most recent first)
**And** each entry shows: date, day of week, exercise count, total sets

**Given** multiple workouts exist
**When** the user scrolls the history
**Then** the list scrolls smoothly
**And** uses virtualization for performance with many records

**Given** no workout history exists yet
**When** the user views the history screen
**Then** an empty state "No workouts yet. Start your first one!" is shown

**Given** the user taps on a workout entry
**When** selected
**Then** WorkoutDetailScreen opens showing full workout details (see Story 4.7)

**Given** workout history has 100+ sessions
**When** loading the history screen
**Then** it loads in under 2 seconds (NFR1)
**And** queries complete in under 100ms (NFR6)

---

### Story 4.7: View Past Workout Details

As a **user**,
I want **to see the details of a past workout**,
So that **I can review what I did on a specific day**.

**Acceptance Criteria:**

**Given** the user taps on a workout in the history
**When** WorkoutDetailScreen loads
**Then** the workout date is displayed in the header

**Given** the workout detail screen is displayed
**When** viewing the content
**Then** all exercises from that session are shown
**And** each exercise displays all its sets with weight and reps

**Given** an exercise has multiple sets
**When** displayed in the detail view
**Then** sets are shown as "Set 1: 80kg x 8, Set 2: 80kg x 7, Set 3: 75kg x 8"
**And** each set is clearly readable

**Given** the workout included ad-hoc exercises
**When** viewing the detail
**Then** all exercises (routine + ad-hoc) are displayed
**And** grouped or labeled appropriately

**Given** the user is viewing a past workout
**When** they tap the back button
**Then** they return to the workout history list

**Given** the detail screen is read-only (for now)
**When** the user views it
**Then** no edit buttons are shown
**And** data is displayed for review only

---

### Story 4.8: Auto-Save Draft During Logging

As a **user**,
I want **my workout progress saved automatically**,
So that **I don't lose data if the app crashes or I close it accidentally**.

**Acceptance Criteria:**

**Given** the user is logging a workout
**When** 30 seconds pass
**Then** the current session state is auto-saved (UX-8)
**And** saved to AppContext or AsyncStorage

**Given** the user closes the app mid-workout
**When** they reopen the app
**Then** a "Resume workout from [time]" prompt is displayed on Home or Workout tab

**Given** the user sees the resume prompt
**When** they tap "Resume"
**Then** LogWorkoutScreen loads with all previously logged sets
**And** they can continue adding sets

**Given** the user sees the resume prompt
**When** they tap "Discard"
**Then** the draft is deleted
**And** they can start a fresh workout

**Given** a draft exists from yesterday
**When** the user opens the app today
**Then** the draft is automatically cleared (only same-day drafts are kept)
**And** no resume prompt is shown

**Given** the app crashes during workout logging
**When** the user restarts the app
**Then** the auto-saved draft is recovered
**And** no data loss occurs (NFR7, NFR8)

**Given** the user completes a workout successfully
**When** the session is marked complete
**Then** any auto-saved draft is deleted
**And** only the completed session remains in history

---

## Epic 5: Visualize Your Consistency

**User Outcome:** User can see their gym attendance as a motivating GitHub-style heatmap

### Story 5.1: Create StatsRepository for Activity Data

As a **developer**,
I want **a repository to query activity and statistics data**,
So that **activity graph and streak calculations are efficient**.

**Acceptance Criteria:**

**Given** the StatsRepository class exists
**When** getActivityData(startDate, endDate) is called
**Then** it returns all workout days within the date range
**And** each day includes: date, exercise_count, total_sets
**And** the query completes in under 100ms (NFR6)

**Given** workout history exists with consecutive days
**When** getCurrentStreak() is called
**Then** it returns the number of consecutive workout days ending today or most recently
**And** calculation completes in under 100ms

**Given** the user has workout data for multiple months
**When** getWorkoutDaysByMonth(year, month) is called
**Then** all workout days for that month are returned
**And** includes activity level (0-4) for color coding

**Given** the activity graph needs to render 365 days
**When** querying activity data
**Then** the query uses proper indexes (idx_sessions_date)
**And** returns results efficiently for fast rendering

---

### Story 5.2: Render GitHub-Style Activity Graph

As a **user**,
I want **to see a visual heatmap of my gym attendance**,
So that **I'm motivated by seeing my consistency at a glance**.

**Acceptance Criteria:**

**Given** the user views the Home screen
**When** the screen loads
**Then** the activity graph is prominently displayed as the hero element (UX-2)
**And** positioned at the top of the screen

**Given** the activity graph is rendered
**When** viewing the grid
**Then** it displays the last 365 days as a grid of squares
**And** days are organized in rows (weeks) and columns (days of week)
**And** the layout matches GitHub's contribution graph style

**Given** a day has no workout
**When** the square is rendered
**Then** it displays with neutral gray color (#EBEDF0) (UX-6)
**And** no shame/negative color is used

**Given** a day has 1-2 exercises logged
**When** the square is rendered
**Then** it displays with Level 1 color (#FFE5E5)

**Given** a day has 3-4 exercises logged
**When** the square is rendered
**Then** it displays with Level 2 color (#FFB3B3)

**Given** a day has 5-6 exercises logged
**When** the square is rendered
**Then** it displays with Level 3 color (#FF8080)

**Given** a day has 7+ exercises logged
**When** the square is rendered
**Then** it displays with Level 4 color (#FF6B6B - primary coral)

**Given** the graph renders with 1 year of data (365 squares)
**When** loading the Home screen
**Then** the activity graph renders in under 500ms (NFR4)
**And** uses React.memo to prevent unnecessary re-renders

**Given** the user taps on a square
**When** a day is selected
**Then** a tooltip shows date and activity summary (optional enhancement)

---

### Story 5.3: Display Streak Counter

As a **user**,
I want **to see my current workout streak**,
So that **I'm motivated to maintain my consistency**.

**Acceptance Criteria:**

**Given** the user views the Home screen
**When** the screen loads
**Then** a streak counter is displayed prominently near the activity graph
**And** shows "X day streak" or "X days streak"

**Given** the user has worked out 5 consecutive days
**When** the streak counter is displayed
**Then** it shows "5 day streak"
**And** uses an encouraging visual style (flame icon, coral color)

**Given** the user has no current streak (last workout was not yesterday)
**When** the streak counter is displayed
**Then** it shows "0 day streak" or "Start your streak today!"
**And** uses a neutral, motivating tone (not negative)

**Given** the user completes a workout today
**When** they return to the Home screen
**Then** the streak counter updates immediately
**And** increments by 1 if yesterday was also logged

**Given** today is incomplete but workout is in progress
**When** the streak calculation runs
**Then** today does not yet count toward the streak
**And** only counts after workout is completed

**Given** the user has a 30+ day streak
**When** the counter is displayed
**Then** it shows "30 day streak" with a special celebration badge or animation

---

### Story 5.4: Navigate Time Periods on Activity Graph

As a **user**,
I want **to view different time periods on the activity graph**,
So that **I can review my past consistency over weeks and months**.

**Acceptance Criteria:**

**Given** the activity graph is displayed
**When** navigation controls are shown
**Then** left/right arrows or swipe gestures allow navigating to previous/next periods

**Given** the user is viewing the current period (default)
**When** they tap the left arrow or swipe left
**Then** the graph shifts to show the previous 365-day period
**And** the transition is smooth (under 300ms)

**Given** the user has navigated to a past period
**When** they tap the right arrow or swipe right
**Then** the graph shifts forward to the next period
**And** cannot navigate beyond today

**Given** the user is viewing a past period
**When** they tap "Today" or home button
**Then** the graph jumps back to the current period showing today
**And** today's square is highlighted

**Given** the graph is showing data
**When** the period changes
**Then** the data loads and renders efficiently
**And** the user experiences no lag or delay

**Given** the user is viewing months/years ago
**When** the graph is displayed
**Then** a date indicator shows which period is being viewed (e.g., "Jan - Dec 2024")

---

## Epic 6: Track Your Progress & PRs

**User Outcome:** User can see strength progress over time and celebrate personal records

### Story 6.1: Select Exercise for Progress Tracking

As a **user**,
I want **to select an exercise to view its progress**,
So that **I can see how my strength has evolved over time**.

**Acceptance Criteria:**

**Given** the user navigates to the Progress tab
**When** the screen loads
**Then** a list of exercises with workout history is displayed

**Given** the exercise list is displayed
**When** viewing an exercise
**Then** it shows: exercise name, category badge, last logged weight and date
**And** a preview indicator (e.g., "+5kg since last month")

**Given** the user has not logged any workouts yet
**When** the Progress tab is viewed
**Then** an empty state "No workout data yet. Start logging!" is displayed

**Given** the exercise list shows 20+ exercises
**When** viewing the list
**Then** exercises are sorted by most recently logged first
**And** list scrolls smoothly with virtualization

**Given** the user taps on an exercise
**When** selected
**Then** the ProgressChartScreen opens for that exercise

**Given** the user has only logged one exercise
**When** viewing the progress tab
**Then** only that exercise is shown in the list
**And** tapping it shows the progress chart

---

### Story 6.2: Render Progress Chart for Exercise

As a **user**,
I want **to see a line chart of my weight progress for an exercise**,
So that **I can visually understand my strength gains over time**.

**Acceptance Criteria:**

**Given** the user selects an exercise from the progress list
**When** ProgressChartScreen loads
**Then** a line chart is displayed showing weight evolution over time

**Given** the chart is rendered
**When** viewing the data
**Then** the X-axis shows dates (e.g., "Jan 5", "Jan 12", "Jan 19")
**And** the Y-axis shows weight values in kg
**And** the line connects all logged max weights per session

**Given** an exercise has been logged 20 times over 3 months
**When** the chart renders
**Then** it displays in under 1 second (NFR5)
**And** shows the full timeline

**Given** the chart shows data
**When** the user views it
**Then** the current PR (highest weight) is visually highlighted on the chart
**And** uses coral color (#FF6B6B) for the line

**Given** an exercise has only been logged once
**When** the chart is displayed
**Then** a single point is shown with appropriate messaging
**And** encourages logging more to see progress

**Given** the user wants more detail
**When** they tap on a data point
**Then** a tooltip shows: date, weight, reps (optional enhancement)

**Given** the chart needs to display many data points
**When** rendering
**Then** the library (react-native-chart-kit) handles the data efficiently
**And** the chart is responsive and doesn't lag

---

### Story 6.3: Calculate and Display Personal Records

As a **user**,
I want **to see my personal record (PR) for each exercise**,
So that **I know what my best performance is**.

**Acceptance Criteria:**

**Given** the StatsRepository has PR calculation logic
**When** getPRForExercise(exerciseId) is called
**Then** it returns the maximum weight logged for that exercise
**And** includes the date when it was achieved

**Given** an exercise has multiple sets across different sessions
**When** calculating the PR
**Then** the highest weight value is selected regardless of reps
**And** if tied, the most recent date is used

**Given** the user views the ProgressChartScreen
**When** the PR is displayed
**Then** it shows "PR: 85kg on Jan 15" prominently
**And** uses a badge or special styling

**Given** the user views the exercise list in Progress tab
**When** an exercise has a PR
**Then** the PR weight is shown as part of the preview
**And** helps user track their best across all exercises

**Given** an exercise has never been logged
**When** checking for PR
**Then** returns null/undefined gracefully
**And** no PR badge is displayed

---

### Story 6.4: Visual Celebration for New PR

As a **user**,
I want **to receive visual feedback when I achieve a new PR**,
So that **I feel celebrated and motivated by my progress** (UX-4).

**Acceptance Criteria:**

**Given** the user is logging a workout set
**When** they enter a weight higher than their previous PR
**Then** the system detects it as a new PR immediately

**Given** a new PR is detected during logging
**When** the set is saved
**Then** a brief celebration animation or effect is shown
**And** uses warm, positive colors (coral, teal)

**Given** a new PR celebration is shown
**When** the animation plays
**Then** it displays a message like "New PR! 🎉" or "Personal Best!"
**And** the message is brief and non-intrusive (2-3 seconds)

**Given** the new PR is achieved
**When** viewing the exercise card in LogWorkoutScreen
**Then** a PR badge appears next to that set
**And** distinguishes it from regular sets

**Given** the user completes a workout with a new PR
**When** the workout summary is shown
**Then** it highlights "New PR in [Exercise]"
**And** reinforces the achievement

**Given** micro-celebrations are triggered
**When** displayed
**Then** they use subtle animations (scale, fade, glow)
**And** enhance user experience without being distracting (UX-4)

**Given** the user achieves multiple PRs in one workout
**When** completing the session
**Then** all PRs are celebrated in the summary
**And** each exercise with a PR is listed
