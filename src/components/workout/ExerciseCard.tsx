import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Exercise, WorkoutSetWithExercise } from '../../types';
import { CategoryBadge } from '../exercise/CategoryBadge';
import { Card } from '../ui/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { SetInput } from './SetInput';
import { PRBadge } from '../progress/PRBadge';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ExerciseCardProps {
  exercise: Exercise;
  sets: WorkoutSetWithExercise[];
  onAddSet: (weight: number | null, reps: number | null) => void;
  isAdHoc?: boolean;
}

export const ExerciseCard = ({ exercise, sets, onAddSet, isAdHoc }: ExerciseCardProps) => {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const handleAddSet = (weight: number | null, reps: number | null) => {
    onAddSet(weight, reps);
  };

  return (
    <Card style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleExpand}>
        <View style={styles.header}>
          <View style={styles.titleContent}>
            <View style={styles.nameRow}>
              <Text style={[typography.bodyBold, { color: colors.text }]}>{exercise.name}</Text>
              {isAdHoc && (
                <View style={[styles.adHocBadge, { backgroundColor: colors.border, borderRadius: borderRadius.sm }]}>
                  <Text style={typography.small}>ADDED</Text>
                </View>
              )}
            </View>
            <CategoryBadge category={exercise.category} />
          </View>
          <View style={styles.headerRight}>
            <Text style={[typography.small, { color: colors.textSecondary, marginRight: spacing.sm }]}>
              {sets.length} sets
            </Text>
            <MaterialIcons 
              name={isExpanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
              size={24} 
              color={colors.textSecondary} 
            />
          </View>
        </View>
      </TouchableOpacity>

      {sets.length > 0 && !isExpanded && (
        <View style={styles.miniSets}>
          <Text style={[typography.small, { color: colors.textSecondary }]} numberOfLines={1}>
            Last: {sets[sets.length - 1].weight}kg x {sets[sets.length - 1].reps}
          </Text>
        </View>
      )}

      {isExpanded && (
        <View style={styles.expandedContent}>
          {sets.length > 0 && (
            <View style={[styles.setsContainer, { marginTop: spacing.md }]}>
                        {sets.map((set, index) => {
                          const isMaxWeight = set.weight !== null && set.weight === Math.max(...sets.map(s => s.weight || 0));
                          return (
                            <View key={set.id || index} style={[styles.setRow, { paddingVertical: spacing.xs }]}>
                              <View style={styles.setInfo}>
                                <Text style={[typography.body, { color: colors.textSecondary }]}>
                                  Set {set.set_number}: {set.weight}kg x {set.reps}
                                </Text>
                                {isMaxWeight && <View style={{ marginLeft: 8 }}><PRBadge weight={set.weight!} showIcon={false} /></View>}
                              </View>
                              <MaterialIcons name="check-circle" size={18} color={colors.success} />
                            </View>
                          );
                        })}            </View>
          )}
          <SetInput onAddSet={handleAddSet} />
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContent: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  adHocBadge: {
    marginLeft: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  miniSets: {
    marginTop: 4,
  },
  expandedContent: {
    marginTop: 8,
  },
  setsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  setInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
