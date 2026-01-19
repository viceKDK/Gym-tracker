/**
 * Default exercises in multiple languages
 */

import { Language, translations } from '../i18n/translations';

export interface DefaultExercise {
  name: string;
  category: 'gym' | 'cardio' | 'abs';
}

export function getDefaultExercises(language: Language): DefaultExercise[] {
  const t = translations[language].defaultExercises;

  return [
    // Gym exercises
    { name: t.benchPress, category: 'gym' },
    { name: t.squats, category: 'gym' },
    { name: t.deadlift, category: 'gym' },
    { name: t.overheadPress, category: 'gym' },
    { name: t.barbellRow, category: 'gym' },
    { name: t.pullUps, category: 'gym' },
    { name: t.bicepCurl, category: 'gym' },
    { name: t.inclinePress, category: 'gym' },
    { name: t.tricepExtension, category: 'gym' },
    { name: t.legPress, category: 'gym' },
    { name: t.legCurl, category: 'gym' },
    { name: t.legExtension, category: 'gym' },
    { name: t.lateralRaise, category: 'gym' },
    { name: t.facePulls, category: 'gym' },

    // Cardio exercises
    { name: t.running, category: 'cardio' },
    { name: t.treadmill, category: 'cardio' },
    { name: t.stationary_bike, category: 'cardio' },
    { name: t.elliptical, category: 'cardio' },
    { name: t.rowing, category: 'cardio' },
    { name: t.jumpRope, category: 'cardio' },
    { name: t.burpees, category: 'cardio' },

    // Abs exercises
    { name: t.crunches, category: 'abs' },
    { name: t.plank, category: 'abs' },
    { name: t.legRaises, category: 'abs' },
    { name: t.russianTwists, category: 'abs' },
    { name: t.mountainClimbers, category: 'abs' },
    { name: t.sidePlank, category: 'abs' },
    { name: t.bicycleCrunches, category: 'abs' },
    { name: t.abWheel, category: 'abs' },
  ];
}

export default getDefaultExercises;
