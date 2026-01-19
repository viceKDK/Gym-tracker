/**
 * Translations for gym-TRAKER
 * Supports English and Spanish
 */

export type Language = 'en' | 'es';

export interface Translations {
  // Common
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    back: string;
    close: string;
    confirm: string;
    loading: string;
    error: string;
    success: string;
    today: string;
    settings: string;
  };

  // Categories
  categories: {
    gym: string;
    cardio: string;
    abs: string;
    calisthenics: string;
    all: string;
  };

  // Muscle Groups
  muscleGroups: {
    chest: string;
    back: string;
    shoulders: string;
    biceps: string;
    triceps: string;
    forearms: string;
    abs: string;
    obliques: string;
    lowerBack: string;
    quads: string;
    hamstrings: string;
    glutes: string;
    calves: string;
    fullBody: string;
    cardio: string;
  };

  // Days of week
  days: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    sun: string;
  };

  // Screens
  screens: {
    home: string;
    routine: string;
    exercises: string;
    history: string;
    progress: string;
    statistics: string;
    workout: string;
  };

  // Home Screen
  home: {
    title: string;
    currentStreak: string;
    daysStreak: string;
    activityGraph: string;
    monthlySummary: string;
    workoutsCompleted: string;
    totalSets: string;
    totalVolume: string;
    avgDuration: string;
    minutes: string;
    noWorkoutsYet: string;
    startFirstWorkout: string;
  };

  // Routine Screen
  routine: {
    title: string;
    weeklyRoutine: string;
    editRoutine: string;
    todaysWorkout: string;
    restDay: string;
    exercises: string;
    noExercises: string;
    tapToConfig: string;
    startWorkout: string;
  };

  // Exercises Screen
  exercises: {
    title: string;
    searchPlaceholder: string;
    addExercise: string;
    editExercise: string;
    exerciseName: string;
    category: string;
    selectCategory: string;
    noExercises: string;
    createFirst: string;
    deleteConfirm: string;
    deleteMessage: string;
  };

  // Workout Screen
  workout: {
    title: string;
    logWorkout: string;
    addExercise: string;
    selectExercise: string;
    noExercises: string;
    set: string;
    weight: string;
    reps: string;
    addSet: string;
    removeSet: string;
    finishWorkout: string;
    cancelWorkout: string;
    notes: string;
    notesPlaceholder: string;
    resumeWorkout: string;
    resumeMessage: string;
    resume: string;
    startNew: string;
  };

  // History Screen
  history: {
    title: string;
    noHistory: string;
    startTracking: string;
    viewDetails: string;
    completed: string;
    sets: string;
    volume: string;
  };

  // Progress Screen
  progress: {
    title: string;
    selectExercise: string;
    viewChart: string;
    personalRecords: string;
    maxWeight: string;
    maxVolume: string;
    bestSet: string;
    noProgress: string;
    startLifting: string;
    chartTitle: string;
    last30Days: string;
  };

  // Statistics Screen
  statistics: {
    title: string;
    overview: string;
    totalWorkouts: string;
    totalSets: string;
    totalVolume: string;
    avgWorkoutDuration: string;
    byCategory: string;
    topExercises: string;
    frequencyChart: string;
    volumeChart: string;
    noData: string;
    startTracking: string;
    workouts: string;
    sets: string;
    minutes: string;
  };

  // Settings Screen
  settings: {
    title: string;
    language: string;
    selectLanguage: string;
    theme: string;
    notifications: string;
    about: string;
    version: string;
  };

  // Success Screen
  success: {
    title: string;
    subtitle: string;
    newPR: string;
    celebration: string;
    workoutSummary: string;
    duration: string;
    exercises: string;
    totalSets: string;
    totalVolume: string;
    done: string;
  };

  // Exercises (preloaded)
  defaultExercises: {
    benchPress: string;
    squats: string;
    deadlift: string;
    overheadPress: string;
    barbellRow: string;
    pullUps: string;
    bicepCurl: string;
    inclinePress: string;
    tricepExtension: string;
    legPress: string;
    legCurl: string;
    legExtension: string;
    lateralRaise: string;
    facePulls: string;
    running: string;
    treadmill: string;
    stationary_bike: string;
    elliptical: string;
    rowing: string;
    jumpRope: string;
    burpees: string;
    crunches: string;
    plank: string;
    legRaises: string;
    russianTwists: string;
    mountainClimbers: string;
    sidePlank: string;
    bicycleCrunches: string;
    abWheel: string;
  };
}

export const translations: Record<Language, Translations> = {
  es: {
    common: {
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Agregar',
      back: 'Volver',
      close: 'Cerrar',
      confirm: 'Confirmar',
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      today: 'Hoy',
      settings: 'Configuración',
    },
    categories: {
      gym: 'Gimnasio',
      cardio: 'Cardio',
      abs: 'Abdominales',
      calisthenics: 'Calistenia',
      all: 'Todos',
    },
    muscleGroups: {
      chest: 'Pecho',
      back: 'Espalda',
      shoulders: 'Hombros',
      biceps: 'Bíceps',
      triceps: 'Tríceps',
      forearms: 'Antebrazos',
      abs: 'Abdominales',
      obliques: 'Oblicuos',
      lowerBack: 'Espalda Baja',
      quads: 'Cuádriceps',
      hamstrings: 'Isquiotibiales',
      glutes: 'Glúteos',
      calves: 'Pantorrillas',
      fullBody: 'Cuerpo Completo',
      cardio: 'Cardio',
    },
    days: {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mié',
      thu: 'Jue',
      fri: 'Vie',
      sat: 'Sáb',
      sun: 'Dom',
    },
    screens: {
      home: 'Inicio',
      routine: 'Rutina',
      exercises: 'Ejercicios',
      history: 'Historial',
      progress: 'Progreso',
      statistics: 'Estadísticas',
      workout: 'Entrenamiento',
    },
    home: {
      title: 'Inicio',
      currentStreak: 'Racha Actual',
      daysStreak: 'días',
      activityGraph: 'Actividad',
      monthlySummary: 'Resumen Mensual',
      workoutsCompleted: 'Entrenamientos',
      totalSets: 'Series Totales',
      totalVolume: 'Volumen Total',
      avgDuration: 'Duración Promedio',
      minutes: 'min',
      noWorkoutsYet: 'No hay entrenamientos aún',
      startFirstWorkout: 'Comienza tu primer entrenamiento hoy',
    },
    routine: {
      title: 'Rutina',
      weeklyRoutine: 'Rutina Semanal',
      editRoutine: 'Editar Rutina',
      todaysWorkout: 'Entrenamiento de Hoy',
      restDay: 'Día de Descanso',
      exercises: 'ejercicios',
      noExercises: 'Sin ejercicios',
      tapToConfig: 'Toca para configurar',
      startWorkout: 'Comenzar Entrenamiento',
    },
    exercises: {
      title: 'Ejercicios',
      searchPlaceholder: 'Buscar ejercicios...',
      addExercise: 'Agregar Ejercicio',
      editExercise: 'Editar Ejercicio',
      exerciseName: 'Nombre del Ejercicio',
      category: 'Categoría',
      selectCategory: 'Selecciona una categoría',
      noExercises: 'No hay ejercicios',
      createFirst: 'Crea tu primer ejercicio',
      deleteConfirm: 'Eliminar Ejercicio',
      deleteMessage: '¿Estás seguro de que quieres eliminar este ejercicio?',
    },
    workout: {
      title: 'Entrenamiento',
      logWorkout: 'Registrar Entrenamiento',
      addExercise: 'Agregar Ejercicio',
      selectExercise: 'Selecciona un ejercicio',
      noExercises: 'Sin ejercicios',
      set: 'Serie',
      weight: 'Peso (kg)',
      reps: 'Reps',
      addSet: 'Agregar Serie',
      removeSet: 'Eliminar Serie',
      finishWorkout: 'Finalizar Entrenamiento',
      cancelWorkout: 'Cancelar',
      notes: 'Notas',
      notesPlaceholder: 'Agrega notas sobre tu entrenamiento...',
      resumeWorkout: 'Retomar Entrenamiento',
      resumeMessage: 'Tienes un entrenamiento sin terminar',
      resume: 'Continuar',
      startNew: 'Comenzar Nuevo',
    },
    history: {
      title: 'Historial',
      noHistory: 'No hay entrenamientos',
      startTracking: 'Comienza a registrar tus entrenamientos',
      viewDetails: 'Ver Detalles',
      completed: 'Completado',
      sets: 'series',
      volume: 'Volumen',
    },
    progress: {
      title: 'Progreso',
      selectExercise: 'Selecciona un ejercicio',
      viewChart: 'Ver Gráfica',
      personalRecords: 'Récords Personales',
      maxWeight: 'Peso Máximo',
      maxVolume: 'Volumen Máximo',
      bestSet: 'Mejor Serie',
      noProgress: 'Sin progreso aún',
      startLifting: 'Comienza a entrenar para ver tu progreso',
      chartTitle: 'Progreso de',
      last30Days: 'Últimos 30 días',
    },
    statistics: {
      title: 'Estadísticas',
      overview: 'Resumen',
      totalWorkouts: 'Entrenamientos Totales',
      totalSets: 'Series Totales',
      totalVolume: 'Volumen Total',
      avgWorkoutDuration: 'Duración Promedio',
      byCategory: 'Por Categoría',
      topExercises: 'Ejercicios Principales',
      frequencyChart: 'Frecuencia de Entrenamientos',
      volumeChart: 'Volumen por Mes',
      noData: 'Sin datos',
      startTracking: 'Comienza a entrenar para ver estadísticas',
      workouts: 'entrenamientos',
      sets: 'series',
      minutes: 'min',
    },
    settings: {
      title: 'Configuración',
      language: 'Idioma',
      selectLanguage: 'Seleccionar Idioma',
      theme: 'Tema',
      notifications: 'Notificaciones',
      about: 'Acerca de',
      version: 'Versión',
    },
    success: {
      title: '¡Entrenamiento Completado!',
      subtitle: '¡Gran trabajo!',
      newPR: '¡Nuevo Récord Personal!',
      celebration: '🎉',
      workoutSummary: 'Resumen del Entrenamiento',
      duration: 'Duración',
      exercises: 'Ejercicios',
      totalSets: 'Series Totales',
      totalVolume: 'Volumen Total',
      done: 'Finalizar',
    },
    defaultExercises: {
      benchPress: 'Press de banca',
      squats: 'Sentadillas',
      deadlift: 'Peso muerto',
      overheadPress: 'Press militar',
      barbellRow: 'Remo con barra',
      pullUps: 'Dominadas',
      bicepCurl: 'Curl de bíceps',
      inclinePress: 'Press inclinado',
      tricepExtension: 'Extensiones de tríceps',
      legPress: 'Prensa de piernas',
      legCurl: 'Curl de piernas',
      legExtension: 'Extensiones de piernas',
      lateralRaise: 'Elevaciones laterales',
      facePulls: 'Face pulls',
      running: 'Correr',
      treadmill: 'Caminadora',
      stationary_bike: 'Bicicleta estática',
      elliptical: 'Elíptica',
      rowing: 'Remo',
      jumpRope: 'Saltar cuerda',
      burpees: 'Burpees',
      crunches: 'Crunches',
      plank: 'Plancha',
      legRaises: 'Elevaciones de piernas',
      russianTwists: 'Russian twists',
      mountainClimbers: 'Mountain climbers',
      sidePlank: 'Plancha lateral',
      bicycleCrunches: 'Bicicleta',
      abWheel: 'Ab wheel',
    },
  },
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      back: 'Back',
      close: 'Close',
      confirm: 'Confirm',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      today: 'Today',
      settings: 'Settings',
    },
    categories: {
      gym: 'Gym',
      cardio: 'Cardio',
      abs: 'Abs',
      calisthenics: 'Calisthenics',
      all: 'All',
    },
    muscleGroups: {
      chest: 'Chest',
      back: 'Back',
      shoulders: 'Shoulders',
      biceps: 'Biceps',
      triceps: 'Triceps',
      forearms: 'Forearms',
      abs: 'Abs',
      obliques: 'Obliques',
      lowerBack: 'Lower Back',
      quads: 'Quads',
      hamstrings: 'Hamstrings',
      glutes: 'Glutes',
      calves: 'Calves',
      fullBody: 'Full Body',
      cardio: 'Cardio',
    },
    days: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      sun: 'Sun',
    },
    screens: {
      home: 'Home',
      routine: 'Routine',
      exercises: 'Exercises',
      history: 'History',
      progress: 'Progress',
      statistics: 'Statistics',
      workout: 'Workout',
    },
    home: {
      title: 'Home',
      currentStreak: 'Current Streak',
      daysStreak: 'days',
      activityGraph: 'Activity',
      monthlySummary: 'Monthly Summary',
      workoutsCompleted: 'Workouts',
      totalSets: 'Total Sets',
      totalVolume: 'Total Volume',
      avgDuration: 'Avg Duration',
      minutes: 'min',
      noWorkoutsYet: 'No workouts yet',
      startFirstWorkout: 'Start your first workout today',
    },
    routine: {
      title: 'Routine',
      weeklyRoutine: 'Weekly Routine',
      editRoutine: 'Edit Routine',
      todaysWorkout: "Today's Workout",
      restDay: 'Rest Day',
      exercises: 'exercises',
      noExercises: 'No exercises',
      tapToConfig: 'Tap to configure',
      startWorkout: 'Start Workout',
    },
    exercises: {
      title: 'Exercises',
      searchPlaceholder: 'Search exercises...',
      addExercise: 'Add Exercise',
      editExercise: 'Edit Exercise',
      exerciseName: 'Exercise Name',
      category: 'Category',
      selectCategory: 'Select a category',
      noExercises: 'No exercises',
      createFirst: 'Create your first exercise',
      deleteConfirm: 'Delete Exercise',
      deleteMessage: 'Are you sure you want to delete this exercise?',
    },
    workout: {
      title: 'Workout',
      logWorkout: 'Log Workout',
      addExercise: 'Add Exercise',
      selectExercise: 'Select an exercise',
      noExercises: 'No exercises',
      set: 'Set',
      weight: 'Weight (kg)',
      reps: 'Reps',
      addSet: 'Add Set',
      removeSet: 'Remove Set',
      finishWorkout: 'Finish Workout',
      cancelWorkout: 'Cancel',
      notes: 'Notes',
      notesPlaceholder: 'Add notes about your workout...',
      resumeWorkout: 'Resume Workout',
      resumeMessage: 'You have an unfinished workout',
      resume: 'Resume',
      startNew: 'Start New',
    },
    history: {
      title: 'History',
      noHistory: 'No workouts',
      startTracking: 'Start tracking your workouts',
      viewDetails: 'View Details',
      completed: 'Completed',
      sets: 'sets',
      volume: 'Volume',
    },
    progress: {
      title: 'Progress',
      selectExercise: 'Select an exercise',
      viewChart: 'View Chart',
      personalRecords: 'Personal Records',
      maxWeight: 'Max Weight',
      maxVolume: 'Max Volume',
      bestSet: 'Best Set',
      noProgress: 'No progress yet',
      startLifting: 'Start training to see your progress',
      chartTitle: 'Progress of',
      last30Days: 'Last 30 days',
    },
    statistics: {
      title: 'Statistics',
      overview: 'Overview',
      totalWorkouts: 'Total Workouts',
      totalSets: 'Total Sets',
      totalVolume: 'Total Volume',
      avgWorkoutDuration: 'Avg Workout Duration',
      byCategory: 'By Category',
      topExercises: 'Top Exercises',
      frequencyChart: 'Workout Frequency',
      volumeChart: 'Volume by Month',
      noData: 'No data',
      startTracking: 'Start training to see statistics',
      workouts: 'workouts',
      sets: 'sets',
      minutes: 'min',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      selectLanguage: 'Select Language',
      theme: 'Theme',
      notifications: 'Notifications',
      about: 'About',
      version: 'Version',
    },
    success: {
      title: 'Workout Completed!',
      subtitle: 'Great work!',
      newPR: 'New Personal Record!',
      celebration: '🎉',
      workoutSummary: 'Workout Summary',
      duration: 'Duration',
      exercises: 'Exercises',
      totalSets: 'Total Sets',
      totalVolume: 'Total Volume',
      done: 'Done',
    },
    defaultExercises: {
      benchPress: 'Bench Press',
      squats: 'Squats',
      deadlift: 'Deadlift',
      overheadPress: 'Overhead Press',
      barbellRow: 'Barbell Row',
      pullUps: 'Pull-ups',
      bicepCurl: 'Bicep Curl',
      inclinePress: 'Incline Press',
      tricepExtension: 'Tricep Extension',
      legPress: 'Leg Press',
      legCurl: 'Leg Curl',
      legExtension: 'Leg Extension',
      lateralRaise: 'Lateral Raise',
      facePulls: 'Face Pulls',
      running: 'Running',
      treadmill: 'Treadmill',
      stationary_bike: 'Stationary Bike',
      elliptical: 'Elliptical',
      rowing: 'Rowing',
      jumpRope: 'Jump Rope',
      burpees: 'Burpees',
      crunches: 'Crunches',
      plank: 'Plank',
      legRaises: 'Leg Raises',
      russianTwists: 'Russian Twists',
      mountainClimbers: 'Mountain Climbers',
      sidePlank: 'Side Plank',
      bicycleCrunches: 'Bicycle Crunches',
      abWheel: 'Ab Wheel',
    },
  },
};

export default translations;
