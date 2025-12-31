import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Button } from '../components/ui';
import { MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  WorkoutSuccess: { summary: { exerciseCount: number; totalSets: number; date: string } };
};

export default function WorkoutSuccessScreen() {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'WorkoutSuccess'>>();
  const { summary } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: colors.success + '20' }]}>
          <MaterialIcons name="check-circle" size={80} color={colors.success} />
        </View>
        
        <Text style={[typography.h1, { color: colors.text, marginTop: spacing.xl }]}>
          Workout Completed!
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' }]}>
          Great job! Your consistency is paying off.
        </Text>

        <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderRadius: borderRadius.xl, padding: spacing.lg, marginTop: spacing.xxl }]}>
          <View style={styles.summaryItem}>
            <Text style={[typography.h2, { color: colors.primary }]}>{summary.exerciseCount}</Text>
            <Text style={[typography.small, { color: colors.textSecondary }]}>Exercises</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.summaryItem}>
            <Text style={[typography.h2, { color: colors.secondary }]}>{summary.totalSets}</Text>
            <Text style={[typography.small, { color: colors.textSecondary }]}>Total Sets</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Button 
            title="View Activity" 
            onPress={() => navigation.navigate('Home')} 
            variant="primary" 
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCard: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '60%',
  },
  footer: {
    marginTop: 48,
    width: '100%',
  },
});
