# Story 1.1: Initialize Project with Expo Starter Template

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **the project initialized with Expo TypeScript and all dependencies installed**,
So that **I have a working foundation to build the app**.

## Acceptance Criteria

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

## Tasks / Subtasks

- [x] Task 1: Create Expo Project with TypeScript Template (AC: #1)
  - [x] Run `npx create-expo-app@latest gym-TRAKER --template blank-typescript`
  - [x] Verify TypeScript strict mode is enabled in `tsconfig.json`
  - [x] Verify project structure matches Expo blank template

- [x] Task 2: Install Navigation Dependencies (AC: #1)
  - [x] Run `npx expo install @react-navigation/native @react-navigation/bottom-tabs`
  - [x] Run `npx expo install react-native-screens react-native-safe-area-context`
  - [x] Verify all navigation packages are in `package.json`

- [x] Task 3: Install Database and Utility Dependencies (AC: #1)
  - [x] Run `npx expo install expo-sqlite`
  - [x] Run `npx expo install react-native-chart-kit react-native-svg`
  - [x] Run `npx expo install date-fns`
  - [x] Verify all packages installed correctly

- [x] Task 4: Create Project Directory Structure (AC: #2)
  - [x] Create `src/components/ui` directory
  - [x] Create `src/components/activity` directory
  - [x] Create `src/components/workout` directory
  - [x] Create `src/components/progress` directory
  - [x] Create `src/components/exercise` directory
  - [x] Create `src/screens` directory
  - [x] Create `src/navigation` directory
  - [x] Create `src/database/repositories` directory
  - [x] Create `src/hooks` directory
  - [x] Create `src/theme` directory
  - [x] Create `src/types` directory
  - [x] Create `src/contexts` directory
  - [x] Create `src/utils` directory

- [x] Task 5: Verify Development Environment (AC: #3)
  - [x] Run `npx expo start` to start development server
  - [x] Verify app compiles without errors
  - [x] Verify Metro bundler starts successfully
  - [x] Verify default Expo blank screen displays

## Dev Notes

### Architecture Context

**Starter Template Decision:**
This story implements the Architecture decision to use the Expo Blank TypeScript template as the foundation. This provides:
- Clean slate with full control over project structure
- TypeScript configured with strict mode from the start
- Latest Expo SDK 53 with New Architecture enabled by default
- No pre-configured navigation or opinions to remove

[Source: architecture.md - Section "Starter Template Evaluation"]

**Directory Structure Rationale:**
The folder structure follows a **feature-based organization** rather than type-based (components, screens, etc. all in separate folders). This aligns with the architecture's component organization strategy:
- Components organized by feature domain (activity, workout, progress, exercise)
- Reusable UI components in dedicated `ui/` folder
- Database layer separated with repositories pattern

[Source: architecture.md - Section "Component Architecture"]

### Technical Requirements

**TypeScript Configuration:**
- Strict mode MUST be enabled in `tsconfig.json`
- This ensures type safety from the beginning and prevents runtime errors

**Expo SDK Version:**
- Use Expo SDK 53 (latest as of architecture creation)
- New Architecture enabled by default for better performance

**Dependency Installation:**
- Use `npx expo install` instead of `npm install` for React Native dependencies
- This ensures compatibility with the current Expo SDK version

[Source: architecture.md - Section "Starter Template: Expo Blank TypeScript"]

### Dependencies Overview

**Navigation Stack:**
- `@react-navigation/native` - Core navigation library
- `@react-navigation/bottom-tabs` - Required for 5-tab navigation structure
- `react-native-screens` - Native screen optimization
- `react-native-safe-area-context` - Safe area handling for notched devices

**Database:**
- `expo-sqlite` - Local SQLite database for offline-first data storage

**Charts & Visualization:**
- `react-native-chart-kit` - For progress charts (line charts showing weight evolution)
- `react-native-svg` - Required by chart-kit and for Activity Graph rendering

**Utilities:**
- `date-fns` - Date manipulation library for workout sessions and activity graph

[Source: architecture.md - Section "Project Initialization"]

### Project Structure Notes

**Feature-Based Component Organization:**
The `src/components/` directory is organized by feature domain, not by component type:
- `ui/` - Atomic/reusable components (Button, Card, Input, Badge)
- `activity/` - Activity graph feature components
- `workout/` - Workout logging feature components
- `progress/` - Progress charts feature components
- `exercise/` - Exercise management components

**Repository Pattern:**
The `src/database/repositories/` directory will house data access abstractions:
- BaseRepository (shared functionality)
- ExerciseRepository
- RoutineRepository
- WorkoutRepository
- StatsRepository

**State Management:**
- `src/contexts/` - React Context providers (ThemeContext, AppContext)
- `src/hooks/` - Custom hooks for data fetching and state

[Source: architecture.md - Section "Component Architecture" and "Data Access Pattern"]

### Alignment with Unified Project Structure

**Root Directory:**
```
gym-TRAKER/
├── App.tsx              # Entry point
├── app.json             # Expo config
├── tsconfig.json        # TypeScript strict mode
├── package.json         # Dependencies
└── src/                 # All source code
```

**Feature Modules Under src/:**
- Components separated by feature (activity, workout, routine, exercise, progress)
- Cross-cutting concerns in dedicated folders (theme, types, contexts, utils)
- Database layer isolated in `database/` with repositories pattern

**No Conflicts Detected:**
This structure aligns with Expo best practices and the architecture document. No deviations from the unified project structure required.

### References

- [Source: prd.md#Technical Type] - Mobile App using React Native + Expo
- [Source: architecture.md#Starter Template Evaluation] - Decision to use Expo Blank TypeScript template
- [Source: architecture.md#Project Initialization] - Complete initialization commands and dependency list
- [Source: architecture.md#Component Architecture] - Feature-based directory structure rationale
- [Source: architecture.md#Implementation Order] - This is Phase 1.1 in the implementation sequence

### Testing Standards

**Verification Steps:**
1. After running `npx create-expo-app`, verify `tsconfig.json` has `"strict": true`
2. After installing dependencies, run `npm ls` to verify no missing peer dependencies
3. After creating directories, run `tree src` or `ls -R src` to verify structure
4. Run `npx expo start` and verify Metro bundler starts without errors
5. Open app in Expo Go or simulator and verify blank screen loads

**Success Criteria:**
- TypeScript compiles without errors
- All dependencies resolve correctly
- Metro bundler starts successfully
- App displays Expo blank screen (white screen with Expo logo)

### Implementation Notes

**Command Sequence:**
```bash
# Step 1: Create project
npx create-expo-app@latest gym-TRAKER --template blank-typescript
cd gym-TRAKER

# Step 2: Install navigation dependencies
npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# Step 3: Install database and chart dependencies
npx expo install expo-sqlite react-native-chart-kit react-native-svg date-fns

# Step 4: Create directory structure
mkdir -p src/components/{ui,activity,workout,progress,exercise}
mkdir -p src/{screens,navigation,database/repositories,hooks,theme,types,contexts,utils}

# Step 5: Verify setup
npx expo start
```

**Expected File Structure After Completion:**
```
gym-TRAKER/
├── App.tsx
├── app.json
├── tsconfig.json
├── package.json
├── node_modules/
└── src/
    ├── components/
    │   ├── ui/
    │   ├── activity/
    │   ├── workout/
    │   ├── progress/
    │   └── exercise/
    ├── screens/
    ├── navigation/
    ├── database/
    │   └── repositories/
    ├── hooks/
    ├── theme/
    ├── types/
    ├── contexts/
    └── utils/
```

**Git Note:**
After completion, this is a good point for initial commit:
```bash
git init
git add .
git commit -m "Initial project setup with Expo TypeScript and dependencies"
```

### Key Architecture Decisions Implemented

1. **Expo Blank Template** - Provides clean foundation without pre-configured opinions
2. **TypeScript Strict Mode** - Type safety from the start
3. **Feature-Based Organization** - Components grouped by domain, not type
4. **Repository Pattern Setup** - Directory structure ready for data access layer
5. **Offline-First Foundation** - expo-sqlite installed for local data persistence

### Performance Considerations

**NFR1 Impact (App Launch < 2s):**
- Blank template is minimal, contributes to fast launch
- No heavy initial dependencies that affect startup time

**Development Experience:**
- Hot reload enabled out of the box
- TypeScript IntelliSense configured
- Metro bundler optimized for development

### Risk Mitigation

**Potential Issues:**
1. **Expo SDK Version Mismatch:** Use `npx expo install` for all RN packages to ensure compatibility
2. **TypeScript Errors:** Strict mode may reveal issues - this is expected and good
3. **Node Modules Size:** Large download, ensure stable internet connection

**Mitigation Strategies:**
1. Always use `npx expo install` for React Native dependencies
2. Verify TypeScript compiles after each major step
3. Use `npm ci` instead of `npm install` for reproducible installs

## Dev Agent Record

### Agent Model Used

claude-opus-4-5-20251101

### Debug Log References

- Expo SDK 54 installed (latest as of 2025-12)
- React Native 0.81.5 with New Architecture
- TypeScript 5.9.2

### Completion Notes List

- Project created successfully: [x]
- All dependencies installed: [x]
- Directory structure created: [x]
- App compiles and runs: [x]
- TypeScript strict mode verified: [x]

### File List

**Created:**
- package.json - Project dependencies and scripts
- tsconfig.json - TypeScript config with strict mode
- App.tsx - Expo entry component
- app.json - Expo configuration
- index.ts - Entry point
- .gitignore - Git ignore rules (merged BMAD + Expo)

**Directories Created:**
- src/components/ui/
- src/components/activity/
- src/components/workout/
- src/components/progress/
- src/components/exercise/
- src/screens/
- src/navigation/
- src/database/repositories/
- src/hooks/
- src/theme/
- src/types/
- src/contexts/
- src/utils/

### Implementation Notes

- Due to existing BMAD files in directory, Expo project was created in temp directory and files copied over
- .gitignore was merged to preserve both BMAD and Expo ignore patterns
- TypeScript compilation verified with `npx tsc --noEmit` (0 errors)
- All 8 required dependencies installed and verified in package.json
