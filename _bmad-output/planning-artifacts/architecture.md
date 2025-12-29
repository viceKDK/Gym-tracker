---
stepsCompleted: [1, 2, 3, 4, 5, 6]
status: complete
inputDocuments:
  - prd.md
  - product-brief-gym-TRAKER.md
  - design-system-gym-TRAKER.md
  - ux-design-specification.md
workflowType: 'architecture'
project_name: 'gym-TRAKER'
user_name: 'Vicen'
date: '2025-12-29'
---

# Architecture Decision Document - gym-TRAKER

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
28 FRs organizados en 6 dominios que mapean a componentes de UI:
- **Exercise Domain:** CRUD de ejercicios con 3 categorías (Gym/Cardio/Abs)
- **Routine Domain:** Configuración semanal, asignación de ejercicios a días
- **Workout Domain:** Logging de sesiones, sets, peso, reps
- **Visualization Domain:** Activity graph (heatmap), streak tracking
- **Progress Domain:** Charts por ejercicio, PR detection
- **Persistence Domain:** SQLite local, sin cloud

**Non-Functional Requirements:**
| Category | Key Requirements | Architectural Impact |
|----------|-----------------|---------------------|
| Performance | Launch <2s, queries <100ms | Optimized SQLite queries, lazy loading |
| Reliability | No data loss, crash recovery | Transaction safety, auto-save drafts |
| Usability | ≤3 taps to start | Flat navigation, pre-loaded data |
| Storage | <50MB after 2 years | Efficient schema, no media storage |

**Scale & Complexity:**
- Primary domain: Mobile App (React Native + Expo)
- Complexity level: Low
- User scale: Single user (personal app)
- Data model: Simple relational (SQLite)

### Technical Constraints & Dependencies

**Platform Constraints:**
- iOS only (iPhone)
- React Native + Expo
- Offline-first (100% functional without network)
- Portrait orientation only

**Technology Decisions (from PRD):**
- Framework: Expo SDK
- Database: expo-sqlite
- Charts: react-native-chart-kit or victory-native
- Navigation: @react-navigation/native

### Cross-Cutting Concerns Identified

| Concern | Affected Components | Strategy |
|---------|-------------------|----------|
| Data Persistence | All domains | Single SQLite database, repository pattern |
| Theme/Styling | All UI | Centralized theme from Design System |
| Performance | Lists, Charts | Virtualization, memoization |
| Navigation | All screens | Tab-based with stack navigation |

## Starter Template Evaluation

### Primary Technology Domain

**Mobile App** - React Native with Expo (managed workflow)

Based on PRD requirements:
- Single platform (iOS)
- Offline-first with local SQLite
- No cloud/backend requirements
- Personal use (no App Store deployment initially)

### Starter Options Considered

| Option | Pros | Cons |
|--------|------|------|
| `blank` (TypeScript) | Clean slate, full control | Need to add navigation manually |
| `tabs` | Navigation pre-configured | May include unwanted structure |
| `blank` + manual setup | Exactly what we need | Slightly more initial work |

**Recommendation:** `blank` TypeScript template

Razón: Tenemos un Design System específico y estructura definida. Un template con tabs pre-configurados puede tener convenciones que no queremos.

### Selected Starter: Expo Blank TypeScript

**Initialization Command:**
```bash
npx create-expo-app@latest gym-TRAKER --template blank-typescript
```

**Post-Init Setup Commands:**
```bash
cd gym-TRAKER
npx expo install expo-sqlite @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
npx expo install react-native-chart-kit react-native-svg
npx expo install date-fns
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- TypeScript with strict mode
- Expo SDK 53 (latest)
- New Architecture enabled by default

**Project Structure:**
```
gym-TRAKER/
├── app.json              # Expo config
├── App.tsx               # Entry point
├── tsconfig.json         # TypeScript config
├── package.json          # Dependencies
├── assets/               # Static assets
└── src/                  # Custom structure
    ├── components/       # Reusable UI components
    ├── screens/          # Screen components
    ├── navigation/       # Navigation config
    ├── database/         # SQLite setup & queries
    ├── hooks/            # Custom hooks
    ├── theme/            # Design system theme
    └── types/            # TypeScript types
```

**Styling Solution:**
- React Native StyleSheet (native)
- Theme object from Design System doc
- No external UI library (custom components)

**Build Tooling:**
- Expo CLI for development
- EAS Build for production (optional)
- Metro bundler

**Testing Framework:**
- Jest (included with Expo)
- React Native Testing Library (to add)

**Development Experience:**
- Expo Go for quick testing
- Hot reload enabled
- TypeScript IntelliSense

## Core Architectural Decisions

### State Management

**Decision:** React Context + Custom Hooks

**Rationale:**
- App complejidad: Baja - no necesita Redux/Zustand/MobX
- Single user, single device - no sync requirements
- Datos principalmente persisten en SQLite, no en memory state
- Context suficiente para: tema, usuario activo, estado de workout en progreso

**Implementation:**
```typescript
// src/contexts/AppContext.tsx
interface AppState {
  todayRoutine: Exercise[];
  activeWorkout: WorkoutSession | null;
  streak: number;
}

// src/contexts/ThemeContext.tsx
// Theme from design-system-gym-TRAKER.md
```

**State Distribution:**
| State Type | Location | Reason |
|------------|----------|--------|
| Theme/Colors | ThemeContext | Global, rarely changes |
| Active Workout | AppContext | Needed across screens during logging |
| Exercise List | SQLite + local state | Fetched on demand, cached |
| Routine Config | SQLite | Persistent, loaded at startup |
| Workout History | SQLite | Query on demand |

### Data Access Pattern

**Decision:** Repository Pattern (Simple)

**Rationale:**
- Abstrae SQLite detrás de interfaces limpias
- Facilita testing (mock repositories)
- Centraliza queries y manejo de errores
- Sin ORM - queries SQL directas para control y performance

**Repository Structure:**
```typescript
// src/database/repositories/
├── ExerciseRepository.ts    // CRUD ejercicios
├── RoutineRepository.ts     // Configuración semanal
├── WorkoutRepository.ts     // Sessions y sets logging
└── StatsRepository.ts       // Queries para charts y activity graph
```

**Example Interface:**
```typescript
interface ExerciseRepository {
  getAll(): Promise<Exercise[]>;
  getByCategory(category: ExerciseCategory): Promise<Exercise[]>;
  create(exercise: CreateExerciseDTO): Promise<Exercise>;
  update(id: number, exercise: UpdateExerciseDTO): Promise<Exercise>;
  delete(id: number): Promise<void>;
}
```

### Navigation Architecture

**Decision:** 5-Tab Bottom Navigation + Stack per Tab

**Tab Structure:**
```
┌─────────────────────────────────────────┐
│                                         │
│            Screen Content               │
│                                         │
├─────────────────────────────────────────┤
│  🏠    💪    📅    🏋️    📈  │
│ Home  Workout Routine Exercise Progress │
└─────────────────────────────────────────┘
```

**Navigation Map:**
| Tab | Primary Screen | Stack Screens |
|-----|---------------|---------------|
| Home | ActivityGraph + Today | - |
| Workout | LogWorkout | AddSet, AddExercise |
| Routine | WeeklyView | DayConfig |
| Exercises | ExerciseList | ExerciseForm, ExerciseDetail |
| Progress | ExerciseSelect | ProgressChart |

**Implementation:**
```typescript
// src/navigation/AppNavigator.tsx
<NavigationContainer>
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Workout" component={WorkoutStack} />
    <Tab.Screen name="Routine" component={RoutineStack} />
    <Tab.Screen name="Exercises" component={ExerciseStack} />
    <Tab.Screen name="Progress" component={ProgressStack} />
  </Tab.Navigator>
</NavigationContainer>
```

### Database Schema

**Decision:** SQLite with 4 Core Tables

```sql
-- Exercises table
CREATE TABLE exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  category TEXT CHECK(category IN ('gym', 'cardio', 'abs')) NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Weekly routine configuration
CREATE TABLE routine_days (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  day_of_week INTEGER CHECK(day_of_week BETWEEN 0 AND 6) NOT NULL,
  exercise_id INTEGER NOT NULL,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- Workout sessions
CREATE TABLE workout_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT NOT NULL,
  completed_at TEXT,
  notes TEXT
);

-- Individual sets within a workout
CREATE TABLE workout_sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id INTEGER NOT NULL,
  exercise_id INTEGER NOT NULL,
  set_number INTEGER NOT NULL,
  weight REAL,
  reps INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- Indexes for common queries
CREATE INDEX idx_sessions_date ON workout_sessions(date);
CREATE INDEX idx_sets_session ON workout_sets(session_id);
CREATE INDEX idx_sets_exercise ON workout_sets(exercise_id);
CREATE INDEX idx_routine_day ON routine_days(day_of_week);
```

**Key Queries for Activity Graph:**
```sql
-- Get workout days for activity graph (last 365 days)
SELECT date, COUNT(DISTINCT exercise_id) as exercise_count
FROM workout_sessions ws
JOIN workout_sets wst ON ws.id = wst.session_id
WHERE date >= date('now', '-365 days')
GROUP BY date;

-- Get current streak
WITH consecutive_days AS (
  SELECT DISTINCT date FROM workout_sessions
  WHERE date <= date('now')
  ORDER BY date DESC
)
SELECT COUNT(*) FROM consecutive_days
WHERE julianday('now') - julianday(date) =
      (SELECT COUNT(*) FROM consecutive_days cd2
       WHERE cd2.date >= consecutive_days.date) - 1;
```

### Component Architecture

**Decision:** Feature-Based Components with Atomic Design Influence

**Directory Structure:**
```
src/components/
├── ui/                    # Atomic/reusable
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── NumericInput.tsx
│   └── Badge.tsx
├── activity/              # Activity graph feature
│   ├── ActivityGraph.tsx
│   ├── ActivitySquare.tsx
│   └── StreakCounter.tsx
├── workout/               # Workout logging feature
│   ├── ExerciseCard.tsx
│   ├── SetInput.tsx
│   └── WorkoutSummary.tsx
├── progress/              # Progress charts feature
│   ├── ProgressChart.tsx
│   └── PRBadge.tsx
└── exercise/              # Exercise management
    ├── ExerciseItem.tsx
    └── CategoryFilter.tsx
```

**Component Guidelines:**
- Props interface para cada componente
- Memoization para listas largas (React.memo)
- Theme via useTheme() hook
- No inline styles - StyleSheet.create()

### Error Handling Strategy

**Decision:** Graceful Degradation + User Feedback

| Error Type | Handling | User Feedback |
|------------|----------|---------------|
| DB Query Fail | Retry once, then show error | Toast message |
| Invalid Input | Prevent submit | Inline validation |
| Crash Recovery | Auto-save draft workout | Restore on next open |
| Empty States | Show helpful empty state | Illustration + CTA |

**Draft Auto-Save:**
```typescript
// Auto-save workout in progress every 30 seconds
useEffect(() => {
  const interval = setInterval(() => {
    if (activeWorkout) {
      saveDraft(activeWorkout);
    }
  }, 30000);
  return () => clearInterval(interval);
}, [activeWorkout]);
```

## Patterns & Conventions

### Custom Hooks Pattern

**Data Fetching Hooks:**
```typescript
// src/hooks/useExercises.ts
export function useExercises(category?: ExerciseCategory) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadExercises();
  }, [category]);

  const loadExercises = async () => {
    try {
      setLoading(true);
      const data = category
        ? await ExerciseRepository.getByCategory(category)
        : await ExerciseRepository.getAll();
      setExercises(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  };

  return { exercises, loading, error, refresh: loadExercises };
}
```

**Standard Hooks to Create:**
| Hook | Purpose |
|------|---------|
| `useExercises` | CRUD operations on exercises |
| `useTodayRoutine` | Get exercises for current day |
| `useWorkoutSession` | Manage active workout |
| `useActivityData` | Data for activity graph |
| `useExerciseProgress` | Data for progress charts |
| `useStreak` | Calculate current streak |

### Screen Component Pattern

```typescript
// Standard screen structure
export function ExerciseListScreen() {
  // 1. Hooks
  const { exercises, loading, error, refresh } = useExercises();
  const navigation = useNavigation();
  const { colors } = useTheme();

  // 2. Handlers
  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate('ExerciseDetail', { exerciseId: exercise.id });
  };

  // 3. Early returns for states
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorState onRetry={refresh} />;
  if (exercises.length === 0) return <EmptyState type="exercises" />;

  // 4. Main render
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseItem exercise={item} onPress={handleExercisePress} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
```

### Repository Pattern Implementation

```typescript
// src/database/repositories/BaseRepository.ts
export abstract class BaseRepository {
  protected db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  protected async runAsync(sql: string, params: any[] = []): Promise<void> {
    await this.db.runAsync(sql, params);
  }

  protected async getAllAsync<T>(sql: string, params: any[] = []): Promise<T[]> {
    return await this.db.getAllAsync<T>(sql, params);
  }

  protected async getFirstAsync<T>(sql: string, params: any[] = []): Promise<T | null> {
    return await this.db.getFirstAsync<T>(sql, params);
  }
}

// src/database/repositories/ExerciseRepository.ts
export class ExerciseRepository extends BaseRepository {
  async getAll(): Promise<Exercise[]> {
    return this.getAllAsync<Exercise>(
      'SELECT * FROM exercises ORDER BY category, name'
    );
  }

  async create(exercise: CreateExerciseDTO): Promise<Exercise> {
    const result = await this.db.runAsync(
      'INSERT INTO exercises (name, category) VALUES (?, ?)',
      [exercise.name, exercise.category]
    );
    return {
      id: result.lastInsertRowId,
      ...exercise,
      created_at: new Date().toISOString()
    };
  }
}
```

### Styling Pattern

```typescript
// src/theme/index.ts - Export from Design System
export const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#FFF9F0',
    surface: '#FFFFFF',
    text: '#2D3436',
    textSecondary: '#636E72',
    border: '#DFE6E9',
    error: '#E74C3C',
    success: '#27AE60',
    activityLevels: ['#EBEDF0', '#FFE5E5', '#FFB3B3', '#FF8080', '#FF6B6B'],
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: { fontSize: 28, fontWeight: '700' as const },
    h2: { fontSize: 22, fontWeight: '600' as const },
    h3: { fontSize: 18, fontWeight: '600' as const },
    body: { fontSize: 16, fontWeight: '400' as const },
    caption: { fontSize: 14, fontWeight: '400' as const },
  },
};

// Using theme in components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
```

### Type Definitions Pattern

```typescript
// src/types/index.ts

export type ExerciseCategory = 'gym' | 'cardio' | 'abs';

export interface Exercise {
  id: number;
  name: string;
  category: ExerciseCategory;
  created_at: string;
}

export interface CreateExerciseDTO {
  name: string;
  category: ExerciseCategory;
}

export interface RoutineDay {
  id: number;
  day_of_week: number; // 0-6 (Sunday-Saturday)
  exercise_id: number;
  order_index: number;
}

export interface WorkoutSession {
  id: number;
  date: string; // YYYY-MM-DD
  completed_at: string | null;
  notes: string | null;
}

export interface WorkoutSet {
  id: number;
  session_id: number;
  exercise_id: number;
  set_number: number;
  weight: number | null;
  reps: number | null;
  created_at: string;
}

// Joined/computed types
export interface ExerciseWithSets extends Exercise {
  sets: WorkoutSet[];
}

export interface DayActivity {
  date: string;
  exerciseCount: number;
  level: 0 | 1 | 2 | 3 | 4; // For activity graph color
}

export interface ExerciseProgress {
  date: string;
  maxWeight: number;
  totalVolume: number; // weight * reps
}
```

### List Performance Pattern

```typescript
// For long lists (exercise history, workout sets)
import { memo, useCallback } from 'react';

const ExerciseItem = memo(({ exercise, onPress }: ExerciseItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(exercise)}>
      <View style={styles.item}>
        <Text>{exercise.name}</Text>
        <CategoryBadge category={exercise.category} />
      </View>
    </TouchableOpacity>
  );
});

// In parent component
const renderItem = useCallback(({ item }: { item: Exercise }) => (
  <ExerciseItem exercise={item} onPress={handlePress} />
), [handlePress]);

<FlatList
  data={exercises}
  renderItem={renderItem}
  keyExtractor={item => item.id.toString()}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files - Components | PascalCase | `ExerciseCard.tsx` |
| Files - Hooks | camelCase with `use` prefix | `useExercises.ts` |
| Files - Utils | camelCase | `dateHelpers.ts` |
| Types/Interfaces | PascalCase | `WorkoutSession` |
| Functions | camelCase | `calculateStreak()` |
| Constants | SCREAMING_SNAKE | `MAX_SETS_PER_EXERCISE` |
| Styles | camelCase | `styles.container` |
| Database tables | snake_case | `workout_sessions` |
| SQL columns | snake_case | `created_at` |

## Implementation Guidance

### Project Initialization

**Step 1: Create Expo Project**
```bash
npx create-expo-app@latest gym-TRAKER --template blank-typescript
cd gym-TRAKER
```

**Step 2: Install Dependencies**
```bash
# Navigation
npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context

# Database
npx expo install expo-sqlite

# Charts
npx expo install react-native-chart-kit react-native-svg

# Utilities
npx expo install date-fns
```

**Step 3: Create Directory Structure**
```bash
mkdir -p src/{components/{ui,activity,workout,progress,exercise},screens,navigation,database/repositories,hooks,theme,types,contexts,utils}
```

**Step 4: Initialize Files**
```
src/
├── theme/index.ts           # Copy from design-system-gym-TRAKER.md
├── types/index.ts           # Type definitions
├── database/
│   ├── database.ts          # SQLite initialization
│   ├── schema.ts            # CREATE TABLE statements
│   └── repositories/
│       ├── BaseRepository.ts
│       ├── ExerciseRepository.ts
│       ├── RoutineRepository.ts
│       ├── WorkoutRepository.ts
│       └── StatsRepository.ts
├── contexts/
│   ├── ThemeContext.tsx
│   └── AppContext.tsx
└── navigation/
    └── AppNavigator.tsx
```

### Implementation Order

**Phase 1: Foundation (Do First)**
| Priority | Task | Depends On |
|----------|------|------------|
| 1.1 | Theme setup | - |
| 1.2 | Type definitions | - |
| 1.3 | Database initialization | - |
| 1.4 | Schema creation | 1.3 |
| 1.5 | Navigation structure | 1.1 |
| 1.6 | Base UI components | 1.1 |

**Phase 2: Exercise Domain**
| Priority | Task | Depends On |
|----------|------|------------|
| 2.1 | ExerciseRepository | 1.4 |
| 2.2 | useExercises hook | 2.1 |
| 2.3 | ExerciseListScreen | 2.2, 1.6 |
| 2.4 | ExerciseFormScreen | 2.2, 1.6 |

**Phase 3: Routine Domain**
| Priority | Task | Depends On |
|----------|------|------------|
| 3.1 | RoutineRepository | 1.4 |
| 3.2 | useTodayRoutine hook | 3.1 |
| 3.3 | WeeklyRoutineScreen | 3.2, 1.6 |
| 3.4 | DayConfigScreen | 3.2, 2.2 |

**Phase 4: Workout Domain**
| Priority | Task | Depends On |
|----------|------|------------|
| 4.1 | WorkoutRepository | 1.4 |
| 4.2 | useWorkoutSession hook | 4.1 |
| 4.3 | LogWorkoutScreen | 4.2, 3.2 |
| 4.4 | SetInput component | 1.6 |

**Phase 5: Visualization Domain**
| Priority | Task | Depends On |
|----------|------|------------|
| 5.1 | StatsRepository | 1.4 |
| 5.2 | useActivityData hook | 5.1 |
| 5.3 | ActivityGraph component | 5.2 |
| 5.4 | HomeScreen | 5.3, 3.2 |

**Phase 6: Progress Domain**
| Priority | Task | Depends On |
|----------|------|------------|
| 6.1 | useExerciseProgress hook | 5.1 |
| 6.2 | ProgressChart component | 6.1 |
| 6.3 | ProgressScreen | 6.2, 2.2 |

### Database Initialization

```typescript
// src/database/database.ts
import * as SQLite from 'expo-sqlite';
import { createSchema } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export async function initDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;

  db = await SQLite.openDatabaseAsync('gym-traker.db');

  // Enable foreign keys
  await db.execAsync('PRAGMA foreign_keys = ON;');

  // Create tables
  await createSchema(db);

  return db;
}

export function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) throw new Error('Database not initialized');
  return db;
}

// src/database/schema.ts
export async function createSchema(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT CHECK(category IN ('gym', 'cardio', 'abs')) NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS routine_days (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_of_week INTEGER CHECK(day_of_week BETWEEN 0 AND 6) NOT NULL,
      exercise_id INTEGER NOT NULL,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS workout_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL UNIQUE,
      completed_at TEXT,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS workout_sets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      exercise_id INTEGER NOT NULL,
      set_number INTEGER NOT NULL,
      weight REAL,
      reps INTEGER,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (session_id) REFERENCES workout_sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_date ON workout_sessions(date);
    CREATE INDEX IF NOT EXISTS idx_sets_session ON workout_sets(session_id);
    CREATE INDEX IF NOT EXISTS idx_sets_exercise ON workout_sets(exercise_id);
    CREATE INDEX IF NOT EXISTS idx_routine_day ON routine_days(day_of_week);
  `);
}
```

### App Entry Point

```typescript
// App.tsx
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { initDatabase } from './src/database/database';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { AppProvider } from './src/contexts/AppContext';
import { theme } from './src/theme';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initDatabase();
      } catch (e) {
        console.error('Failed to initialize database:', e);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <AppProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>
  );
}
```

### Development Workflow

**Running the App:**
```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Or use Expo Go app on physical device
```

**Testing Database:**
```typescript
// Quick test in any screen
import { getDatabase } from '../database/database';

// In useEffect for testing
const db = getDatabase();
const exercises = await db.getAllAsync('SELECT * FROM exercises');
console.log('Exercises:', exercises);
```

### Key Implementation Notes

1. **Activity Graph:** Use `react-native-svg` to render the heatmap grid. Each square is a `Rect` component with fill color based on activity level.

2. **Charts:** `react-native-chart-kit` provides `LineChart` for progress visualization. Pass exercise history data formatted as `{ labels: string[], datasets: [{ data: number[] }] }`.

3. **Date Handling:** Use `date-fns` for all date operations. Store dates in SQLite as ISO strings (`YYYY-MM-DD`).

4. **Keyboard Handling:** For numeric inputs (weight, reps), use `keyboardType="numeric"` and handle decimal input appropriately.

5. **Performance:** The activity graph may have 365+ squares. Use `React.memo` and avoid unnecessary re-renders.

---

## Architecture Summary

### Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | React Native + Expo SDK 53 |
| Language | TypeScript (strict) |
| Navigation | @react-navigation/native + bottom-tabs |
| Database | expo-sqlite (local) |
| Charts | react-native-chart-kit + react-native-svg |
| State | React Context + Custom Hooks |
| Styling | React Native StyleSheet + Custom Theme |

### Key Decisions
1. **Offline-first:** 100% local SQLite, no cloud dependencies
2. **Simple state:** React Context sufficient for low complexity
3. **Repository pattern:** Clean data access abstraction
4. **5-tab navigation:** Home, Workout, Routine, Exercises, Progress
5. **Feature-based components:** Organized by domain, not type

### Files to Create First
1. `src/theme/index.ts` - Design system colors/spacing
2. `src/types/index.ts` - TypeScript interfaces
3. `src/database/database.ts` - SQLite init
4. `src/database/schema.ts` - Table creation
5. `src/navigation/AppNavigator.tsx` - Tab structure

### MVP Screens (6 total)
- HomeScreen (Activity Graph)
- LogWorkoutScreen
- WeeklyRoutineScreen
- ExerciseListScreen
- ExerciseFormScreen
- ProgressScreen

---
_Architecture document generated: 2025-12-29_
_Ready for Epic & Story creation_

