import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function WorkoutScreen() {
  const { colors, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[typography.h1, { color: colors.text }]}>Workout</Text>
      <Text style={[typography.body, { color: colors.textSecondary }]}>Start your first workout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
