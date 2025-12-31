# Story 2.1: Create ExerciseRepository with CRUD Operations

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **developer**,
I want **a repository to manage exercise data in SQLite**,
so that **exercise CRUD operations are abstracted and reusable**.

## Acceptance Criteria

1. **Given** the `ExerciseRepository` class exists, **When** `getAll()` is called, **Then** it returns all exercises ordered by category, then by name, **And** the query completes in under 100ms (NFR6).
2. **Given** the `ExerciseRepository` class exists, **When** `getByCategory('gym')` is called, **Then** it returns only exercises with category 'gym'.
3. **Given** valid exercise data `{name: "Press Banca", category: "gym"}`, **When** `create()` is called with this data, **Then** a new exercise is inserted into the database, **And** the created exercise with id is returned.
4. **Given** an existing exercise with id 1, **When** `update(1, {name: "Bench Press"})` is called, **Then** the exercise name is updated in the database, **And** the updated exercise is returned.
5. **Given** an existing exercise with id 1, **When** `delete(1)` is called, **Then** the exercise is removed from the database, **And** any routine_days referencing this exercise are also deleted (CASCADE).
6. **Given** the `useExercises()` hook is used in a component, **When** the component mounts, **Then** exercises are loaded automatically, **And** loading, error, and refresh states are available.

## Tasks / Subtasks

- [ ] Task 1: Implement BaseRepository (Architecture Decision)
  - [ ] Create `src/database/repositories/BaseRepository.ts`
  - [ ] Implement generic helper methods for `runAsync`, `getAllAsync`, and `getFirstAsync` using `getDatabase()`
- [ ] Task 2: Implement ExerciseRepository (AC: #1, #2, #3, #4, #5)
  - [ ] Create `src/database/repositories/ExerciseRepository.ts` extending `BaseRepository`
  - [ ] Implement `getAll()` with sorting by category then name
  - [ ] Implement `getByCategory(category)`
  - [ ] Implement `create(data)`
  - [ ] Implement `update(id, data)`
  - [ ] Implement `delete(id)`
- [ ] Task 3: Create Exercise Data Hook (AC: #6)
  - [ ] Create `src/hooks/useExercises.ts`
  - [ ] Implement state for exercises, loading, and error
  - [ ] Use `useEffect` to fetch data on mount
  - [ ] Provide `refresh` function to manually reload data
- [ ] Task 4: Export Repositories and Hooks
  - [ ] Update `src/database/repositories/index.ts` (if it exists or create it)
  - [ ] Update `src/hooks/index.ts` (if it exists or create it)
- [ ] Task 5: Verification
  - [ ] Verify TypeScript compilation
  - [ ] Ensure SQL queries align with schema defined in Story 1.3

## Dev Notes

### Repository Implementation Pattern (from Architecture.md)

```typescript
// src/database/repositories/BaseRepository.ts
import { SQLiteDatabase } from 'expo-sqlite';
import { getDatabase } from '../index'; // or wherever getDatabase is exported

export abstract class BaseRepository {
  protected get db(): SQLiteDatabase {
    return getDatabase();
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
```

### Hook Pattern

```typescript
// src/hooks/useExercises.ts
export function useExercises(category?: ExerciseCategory) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadExercises = useCallback(async () => {
    try {
      setLoading(true);
      const repo = new ExerciseRepository();
      const data = category
        ? await repo.getByCategory(category)
        : await repo.getAll();
      setExercises(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadExercises();
  }, [loadExercises]);

  return { exercises, loading, error, refresh: loadExercises };
}
```

### NFR Compliance
- NFR6: SQLite queries complete < 100ms for typical operations

### References
- [Source: architecture.md#Repository Pattern Implementation]
- [Source: architecture.md#Custom Hooks Pattern]
- [Source: epics.md#Story 2.1]

## Dev Agent Record

### Agent Model Used

gemini-2.0-pro-exp-02-05

### Debug Log References

### Completion Notes List

### File List
