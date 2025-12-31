import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import {
  HomeStackNavigator,
  WorkoutStackNavigator,
  RoutineStackNavigator,
  ExerciseStackNavigator,
  ProgressStackNavigator,
} from './Stacks';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap = 'help';

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Workout') {
            iconName = 'fitness-center';
          } else if (route.name === 'Routine') {
            iconName = 'calendar-today';
          } else if (route.name === 'Exercises') {
            iconName = 'list';
          } else if (route.name === 'Progress') {
            iconName = 'show-chart';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Workout" component={WorkoutStackNavigator} />
      <Tab.Screen name="Routine" component={RoutineStackNavigator} />
      <Tab.Screen name="Exercises" component={ExerciseStackNavigator} />
      <Tab.Screen name="Progress" component={ProgressStackNavigator} />
    </Tab.Navigator>
  );
}

export default AppNavigator;
