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

**Advanced Analytics:**
- FR29: User can compare workout volume across different weeks
- FR30: User can view monthly summaries of training consistency
- FR31: User can see a distribution of workout categories (Gym vs Cardio vs Abs)

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
- NFR10: All primary actions achievable in â‰¤ 3 taps
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
| FR29 | Epic 7 | Compare weekly volume |
| FR30 | Epic 7 | Monthly training summaries |
| FR31 | Epic 7 | Category distribution chart |

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

### Epic 7: Advanced Statistics & Analytics

**User Outcome:** User can gain deeper insights into their training habits through comparative analytics

- Compare workout volume across different weeks
- View monthly training summaries
- Analyze category distribution (Gym vs Cardio vs Abs)

**FRs covered:** FR29, FR30, FR31

---

### Epic Dependencies

```
Epic 1 (Foundation) â† Standalone
    â†“
Epic 2 (Exercises) â† Uses DB from Epic 1
    â†“
Epic 3 (Routine) â† Uses Exercises from Epic 2
    â†“
Epic 4 (Logging) â† Uses Routine from Epic 3
    â†“
Epic 5 (Activity Graph) â† Uses Workout data from Epic 4
    â†“
Epic 6 (Progress) â† Uses Workout data from Epic 4
    â†“
Epic 7 (Analytics) â† Uses Workout data from Epic 4
```

Each epic is standalone and delivers complete functionality for its domain.

---

## Epic 7: Advanced Statistics & Analytics

**User Outcome:** User can gain deeper insights into their training habits through comparative analytics

### Story 7.1: Comparative Training Analytics Dashboard

As a **user**,
I want **to compare my training stats across different time periods (weeks and months)**,
So that **I can understand if my performance and consistency are improving**.

**Acceptance Criteria:**

**Given** the user navigates to the Statistics section (could be a sub-tab in Progress or Home)
**When** the screen loads
**Then** a bar chart comparing total workout volume (weight x reps) for the last 4 weeks is displayed
**And** a pie chart showing the distribution of exercises by category (Gym, Cardio, Abs) is displayed

**Given** the volume comparison chart
**When** the user views the weeks
**Then** each bar represents one week, labeled with the start date or week number
**And** the chart uses the primary coral color (#FF6B6B)

**Given** the category distribution chart
**When** workouts have been logged
**Then** the chart displays the percentage of sets dedicated to each category
**And** uses theme colors (Coral for Gym, Teal for Cardio, Purple for Abs)

**Given** the monthly summary
**When** the user scrolls down
**Then** a list or grid shows total workouts and total sets per month for the current year
**And** provides a "consistency score" (percentage of planned routine days completed)

**Given** no data is available
**When** the statistics screen is viewed
**Then** helpful empty states are shown encouraging the user to log more workouts to generate insights