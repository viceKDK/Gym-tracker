import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from '../../contexts/ThemeContext';
import { format, parseISO } from 'date-fns';

interface ProgressChartProps {
  data: { date: string; max_weight: number }[];
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  const { colors, spacing, typography } = useTheme();
  const screenWidth = Dimensions.get('window').width;

  if (data.length === 0) return null;

  const chartData = {
    labels: data.map(d => format(parseISO(d.date), 'MMM d')),
    datasets: [
      {
        data: data.map(d => d.max_weight),
        color: (opacity = 1) => colors.primary,
        strokeWidth: 2
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.textSecondary,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 1,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary
    }
  };

  return (
    <View style={styles.container}>
      {data.length === 1 ? (
        <View style={[styles.singlePoint, { backgroundColor: colors.surface, padding: spacing.xl, borderRadius: 16 }]}>
          <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center' }]}>
            Only one session logged yet. Keep going to see your progress! 📈
          </Text>
          <Text style={[typography.h2, { color: colors.primary, marginTop: spacing.md }]}>
            {data[0].max_weight} kg
          </Text>
        </View>
      ) : (
        <LineChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          fromZero
          yAxisSuffix="kg"
          verticalLabelRotation={30}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  singlePoint: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
