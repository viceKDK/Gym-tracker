import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  ProgressChart: { exerciseId: number; exerciseName: string };
};

export default function ProgressChartScreen() {
  const { colors, typography, spacing } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'ProgressChart'>>();
  const { exerciseName } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: spacing.md }}>
        <Text style={[typography.h2, { color: colors.text }]}>{exerciseName}</Text>
        <Text style={[typography.body, { color: colors.textSecondary }]}>Strength Progress</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
