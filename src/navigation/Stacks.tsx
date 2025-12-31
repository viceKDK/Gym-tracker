import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  HomeScreen, 
  WorkoutScreen, 
  RoutineScreen, 
  ExercisesScreen, 
  ProgressScreen,
  ExerciseFormScreen,
  DayConfigScreen,
  LogWorkoutScreen,
  WorkoutSuccessScreen,
  WorkoutHistoryScreen,
  WorkoutDetailScreen,
  ProgressChartScreen
} from '../screens';

const HomeStack = createNativeStackNavigator();
const WorkoutStack = createNativeStackNavigator();
const RoutineStack = createNativeStackNavigator();
const ExerciseStack = createNativeStackNavigator();
const ProgressStack = createNativeStackNavigator();

export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeIndex" component={HomeScreen} options={{ title: 'Home' }} />
    </HomeStack.Navigator>
  );
}

export function WorkoutStackNavigator() {
  return (
    <WorkoutStack.Navigator>
      <WorkoutStack.Screen name="WorkoutIndex" component={WorkoutScreen} options={{ title: 'Workout' }} />
      <WorkoutStack.Screen name="LogWorkout" component={LogWorkoutScreen} options={{ title: 'Log Workout' }} />
      <WorkoutStack.Screen name="WorkoutSuccess" component={WorkoutSuccessScreen} options={{ headerShown: false }} />
      <WorkoutStack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen} options={{ title: 'History' }} />
      <WorkoutStack.Screen name="WorkoutDetail" component={WorkoutDetailScreen} options={{ title: 'Workout Details' }} />
    </WorkoutStack.Navigator>
  );
}

export function RoutineStackNavigator() {
  return (
    <RoutineStack.Navigator>
      <RoutineStack.Screen name="RoutineIndex" component={RoutineScreen} options={{ title: 'Routine' }} />
      <RoutineStack.Screen name="DayConfig" component={DayConfigScreen} options={({ route }: any) => ({ title: 'Configure Day' })} />
    </RoutineStack.Navigator>
  );
}

export function ExerciseStackNavigator() {
  return (
    <ExerciseStack.Navigator>
      <ExerciseStack.Screen name="ExerciseIndex" component={ExercisesScreen} options={{ title: 'Exercises' }} />
      <ExerciseStack.Screen name="ExerciseForm" component={ExerciseFormScreen} options={({ route }: any) => ({ title: route.params?.exerciseId ? 'Edit Exercise' : 'New Exercise' })} />
    </ExerciseStack.Navigator>
  );
}

export function ProgressStackNavigator() {
  return (
    <ProgressStack.Navigator>
      <ProgressStack.Screen name="ProgressIndex" component={ProgressScreen} options={{ title: 'Progress' }} />
      <ProgressStack.Screen name="ProgressChart" component={ProgressChartScreen} options={{ title: 'Progress Chart' }} />
    </ProgressStack.Navigator>
  );
}
