import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format, isSameDay } from 'date-fns';

const DRAFT_KEY = '@workout_draft';

export interface WorkoutDraft {
  date: string;
  sessionId: number;
  timestamp: number;
}

export function useDraftRecovery() {
  const [draft, setDraft] = useState<WorkoutDraft | null>(null);
  const [loading, setLoading] = useState(true);

  const checkDraft = useCallback(async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem(DRAFT_KEY);
      if (data) {
        const parsed: WorkoutDraft = JSON.parse(data);
        const today = format(new Date(), 'yyyy-MM-dd');
        
        // Only recover drafts from today
        if (parsed.date === today) {
          setDraft(parsed);
        } else {
          // Clear old drafts
          await AsyncStorage.removeItem(DRAFT_KEY);
        }
      }
    } catch (e) {
      console.error('[useDraftRecovery] Error checking draft:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkDraft();
  }, [checkDraft]);

  const discardDraft = async () => {
    await AsyncStorage.removeItem(DRAFT_KEY);
    setDraft(null);
  };

  return {
    draft,
    loading,
    discardDraft,
    refresh: checkDraft,
  };
}
