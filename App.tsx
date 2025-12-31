import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, AppProvider, useTheme } from './src/contexts';
import { initializeDatabase } from './src/database';
import AppNavigator from './src/navigation/AppNavigator';

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize SQLite Database with Schema (Story 1.3)
        initializeDatabase();
        
        // Artificial delay to show loading state (optional, can be removed)
        // await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.error('[App] Failed to initialize:', e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});