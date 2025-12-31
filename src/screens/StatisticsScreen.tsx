import React, { useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Dimensions, 
  ActivityIndicator, 
  RefreshControl 
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useAnalyticsData } from '../hooks/useAnalyticsData';
import { useNavigation } from '@react-navigation/native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { MonthlySummaryItem } from '../components/activity/MonthlySummaryItem';
import { EmptyState, Button } from '../components/ui';
import { format, parseISO } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

export default function StatisticsScreen() {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const { data, loading, refresh } = useAnalyticsData();
  const navigation = useNavigation<any>();

  const hasData = data && (data.weeklyVolume.length > 0 || data.categoryDistribution.length > 0);

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.textSecondary,
    decimalPlaces: 0,
    barPercentage: 0.6,
  };

  const getWeeklyData = () => {
    if (!data) return { labels: [], datasets: [{ data: [] }] };
    return {
      labels: data.weeklyVolume.map(v => format(parseISO(v.week_start), 'MMM d')),
      datasets: [{ data: data.weeklyVolume.map(v => v.total_volume) }]
    };
  };

  const getPieData = () => {
    if (!data) return [];
    const colorMap: any = {
      gym: colors.primary,
      cardio: colors.secondary,
      abs: '#A29BFE'
    };
    return data.categoryDistribution.map(c => ({
      name: c.category.toUpperCase(),
      population: c.set_count,
      color: colorMap[c.category] || colors.textSecondary,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    }));
  };

  if (loading && !data) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={{ paddingVertical: spacing.md }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} colors={[colors.primary]} />}
      >
        <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.lg }}>
          <Text style={[typography.h2, { color: colors.text }]}>Analytics</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>Compare your training performance</Text>
        </View>

        {!hasData ? (
          <EmptyState 
            message="No analytics available yet. Log more workouts to see insights!" 
            ctaLabel="Go to Workout"
            onCtaPress={() => navigation.navigate('Workout')} 
          />
        ) : (
          <>
            <View style={[styles.section, { paddingHorizontal: spacing.md, marginBottom: spacing.md }]}>
              <Button 
                title="View Exercise Progress Charts" 
                onPress={() => navigation.navigate('ExerciseSelect')} 
                variant="outline"
                fullWidth
              />
            </View>

            <View style={styles.section}>
              <Text style={[typography.h3, { color: colors.text, marginLeft: spacing.md, marginBottom: spacing.sm }]}>
                Weekly Volume (kg)
              </Text>
              <BarChart
                data={getWeeklyData()}
                width={screenWidth - 32}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                  alignSelf: 'center'
                }}
                fromZero
              />
            </View>

            <View style={[styles.section, { marginTop: spacing.xl }]}>
              <Text style={[typography.h3, { color: colors.text, marginLeft: spacing.md, marginBottom: spacing.sm }]}>
                Category Distribution
              </Text>
              <PieChart
                data={getPieData()}
                width={screenWidth - 32}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                center={[10, 0]}
                absolute
              />
            </View>

            <View style={[styles.section, { marginTop: spacing.xl, paddingHorizontal: spacing.md }]}>
              <Text style={[typography.h3, { color: colors.text, marginBottom: spacing.md }]}>
                Monthly Summaries
              </Text>
              {data.monthlySummary.map((month, idx) => (
                <MonthlySummaryItem 
                  key={idx}
                  month={month.month}
                  workoutCount={month.workout_count}
                  totalSets={month.total_sets}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
