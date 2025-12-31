import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useRoute, RouteProp } from '@react-navigation/native';
import { DayOfWeek } from '../types';

type RootStackParamList = {
  DayConfig: { day: DayOfWeek };
};

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function DayConfigScreen() {
  const { colors, typography, spacing } = useTheme();
  const route = useRoute<RouteProp<RootStackParamList, 'DayConfig'>>();
  const day = route.params?.day;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{ padding: spacing.md }}>
        <Text style={[typography.h2, { color: colors.text }]}>
          {day !== undefined ? DAY_NAMES[day] : 'Configure Day'}
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          Assign exercises to this day
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
