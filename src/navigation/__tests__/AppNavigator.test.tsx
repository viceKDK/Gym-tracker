import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../../contexts/ThemeContext';
import AppNavigator from '../AppNavigator';

// Mock MaterialIcons to avoid rendering issues in tests
jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: 'MaterialIcons',
}));

describe('AppNavigator', () => {
  it('renders all 5 tabs', () => {
    render(
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    );

    // Check for tab labels
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Workout')).toBeTruthy();
    expect(screen.getByText('Routine')).toBeTruthy();
    expect(screen.getByText('Exercises')).toBeTruthy();
    expect(screen.getByText('Progress')).toBeTruthy();
  });

  it('renders the Home screen by default', () => {
    render(
      <ThemeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    );

    // Home screen placeholder text
    expect(screen.getByText('No activity yet')).toBeTruthy();
  });
});
