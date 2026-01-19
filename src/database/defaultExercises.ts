/**
 * Default exercises in multiple languages
 */

import { Language, translations } from '../i18n/translations';
import { MuscleGroup } from '../types';

export interface DefaultExercise {
  name: string;
  category: 'gym' | 'cardio' | 'abs' | 'calisthenics';
  muscleGroup?: MuscleGroup | null;
}

export function getDefaultExercises(language: Language): DefaultExercise[] {
  const t = translations[language].defaultExercises;

  return [
    // Gym exercises
    { name: t.benchPress, category: 'gym', muscleGroup: 'chest' },
    { name: t.squats, category: 'gym', muscleGroup: 'quads' },
    { name: t.deadlift, category: 'gym', muscleGroup: 'back' },
    { name: t.overheadPress, category: 'gym', muscleGroup: 'shoulders' },
    { name: t.barbellRow, category: 'gym', muscleGroup: 'back' },
    { name: t.bicepCurl, category: 'gym', muscleGroup: 'biceps' },
    { name: t.inclinePress, category: 'gym', muscleGroup: 'chest' },
    { name: t.tricepExtension, category: 'gym', muscleGroup: 'triceps' },
    { name: t.legPress, category: 'gym', muscleGroup: 'quads' },
    { name: t.legCurl, category: 'gym', muscleGroup: 'hamstrings' },
    { name: t.legExtension, category: 'gym', muscleGroup: 'quads' },
    { name: t.lateralRaise, category: 'gym', muscleGroup: 'shoulders' },
    { name: t.facePulls, category: 'gym', muscleGroup: 'shoulders' },

    // Cardio exercises
    { name: t.running, category: 'cardio', muscleGroup: 'cardio' },
    { name: t.treadmill, category: 'cardio', muscleGroup: 'cardio' },
    { name: t.stationary_bike, category: 'cardio', muscleGroup: 'cardio' },
    { name: t.elliptical, category: 'cardio', muscleGroup: 'cardio' },
    { name: t.rowing, category: 'cardio', muscleGroup: 'fullBody' },
    { name: t.jumpRope, category: 'cardio', muscleGroup: 'cardio' },
    { name: t.burpees, category: 'cardio', muscleGroup: 'fullBody' },

    // Abs exercises
    { name: t.crunches, category: 'abs', muscleGroup: 'abs' },
    { name: t.plank, category: 'abs', muscleGroup: 'abs' },
    { name: t.legRaises, category: 'abs', muscleGroup: 'abs' },
    { name: t.russianTwists, category: 'abs', muscleGroup: 'obliques' },
    { name: t.mountainClimbers, category: 'abs', muscleGroup: 'abs' },
    { name: t.sidePlank, category: 'abs', muscleGroup: 'obliques' },
    { name: t.bicycleCrunches, category: 'abs', muscleGroup: 'abs' },
    { name: t.abWheel, category: 'abs', muscleGroup: 'abs' },

    // Calisthenics exercises
    { name: t.pullUps, category: 'calisthenics', muscleGroup: 'back' },
    { name: 'Push-ups', category: 'calisthenics', muscleGroup: 'chest' },
    { name: 'Dips', category: 'calisthenics', muscleGroup: 'triceps' },
    { name: 'Muscle-up', category: 'calisthenics', muscleGroup: 'fullBody' },
    { name: 'Pistol Squats', category: 'calisthenics', muscleGroup: 'quads' },
  ];
}

export default getDefaultExercises;
