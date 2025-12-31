import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Exercise, WorkoutSession, WorkoutSet } from '../types';

interface AppContextType {
  todayRoutine: Exercise[];
  activeWorkout: WorkoutSession | null;
  streak: number;
  setTodayRoutine: (exercises: Exercise[]) => void;
  setActiveWorkout: (session: WorkoutSession | null) => void;
  setStreak: (count: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [todayRoutine, setTodayRoutineState] = useState<Exercise[]>([]);
  const [activeWorkout, setActiveWorkoutState] = useState<WorkoutSession | null>(null);
  const [streak, setStreakState] = useState<number>(0);

  const setTodayRoutine = useCallback((exercises: Exercise[]) => {
    setTodayRoutineState(exercises);
  }, []);

  const setActiveWorkout = useCallback((session: WorkoutSession | null) => {
    setActiveWorkoutState(session);
  }, []);

  const setStreak = useCallback((count: number) => {
    setStreakState(count);
  }, []);

  return (
    <AppContext.Provider
      value={{
        todayRoutine,
        activeWorkout,
        streak,
        setTodayRoutine,
        setActiveWorkout,
        setStreak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
