import { ExerciseRepository } from '../ExerciseRepository';
import { getDatabase } from '../../index';

// Mock expo-sqlite to avoid loading native modules
jest.mock('expo-sqlite', () => ({
  openDatabaseSync: jest.fn(),
}));

// Mock getDatabase
jest.mock('../../index', () => ({
  getDatabase: jest.fn(),
}));

describe('ExerciseRepository', () => {
  let repo: ExerciseRepository;
  let mockDb: any;

  beforeEach(() => {
    mockDb = {
      runAsync: jest.fn(),
      getAllAsync: jest.fn(),
      getFirstAsync: jest.fn(),
    };
    (getDatabase as jest.Mock).mockReturnValue(mockDb);
    repo = new ExerciseRepository();
  });

  it('getAll should return exercises from database', async () => {
    const mockExercises = [
      { id: 1, name: 'Press', category: 'gym' },
      { id: 2, name: 'Run', category: 'cardio' },
    ];
    mockDb.getAllAsync.mockResolvedValue(mockExercises);

    const result = await repo.getAll();

    expect(mockDb.getAllAsync).toHaveBeenCalledWith(
      expect.stringContaining('SELECT * FROM exercises'),
      expect.any(Array)
    );
    expect(result).toEqual(mockExercises);
  });

  it('create should insert and return new exercise', async () => {
    const newEx = { name: 'New Ex', category: 'abs' as const };
    mockDb.runAsync.mockResolvedValue({ lastInsertRowId: 3 });

    const result = await repo.create(newEx);

    expect(mockDb.runAsync).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO exercises'),
      ['New Ex', 'abs']
    );
    expect(result.id).toBe(3);
    expect(result.name).toBe('New Ex');
  });
});
