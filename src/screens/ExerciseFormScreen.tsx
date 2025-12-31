import React, { useState, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Input, Button } from '../components/ui';
import { ExerciseRepository } from '../database/repositories/ExerciseRepository';
import { ExerciseCategory, NewExercise } from '../types';

type RootStackParamList = {
  ExerciseForm: { exerciseId?: number; initialData?: any };
};

export default function ExerciseFormScreen() {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ExerciseForm'>>();
  
  const exerciseId = route.params?.exerciseId;
  const initialData = route.params?.initialData;

  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState<ExerciseCategory>(initialData?.category || 'gym');
  const [errors, setErrors] = useState<{ name?: string; category?: string }>({});
  const [isSaving, setIsReady] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; category?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setIsReady(true);
      const repo = new ExerciseRepository();
      const exerciseData: NewExercise = { name: name.trim(), category };

      if (exerciseId) {
        await repo.update(exerciseId, exerciseData);
      } else {
        await repo.create(exerciseData);
      }

      navigation.goBack();
    } catch (error) {
      console.error('[ExerciseForm] Failed to save:', error);
      Alert.alert('Error', 'Failed to save exercise. Please try again.');
    } finally {
      setIsReady(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Exercise',
      'Are you sure you want to delete this exercise? It will also be removed from your routines.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              setIsReady(true);
              const repo = new ExerciseRepository();
              await repo.delete(exerciseId!);
              navigation.goBack();
            } catch (error) {
              console.error('[ExerciseForm] Failed to delete:', error);
              Alert.alert('Error', 'Failed to delete exercise.');
            } finally {
              setIsReady(false);
            }
          }
        },
      ]
    );
  };

  const renderCategoryOption = (type: ExerciseCategory, label: string) => {
    const isSelected = category === type;
    return (
      <TouchableOpacity
        key={type}
        activeOpacity={0.7}
        style={[
          styles.categoryOption,
          { 
            backgroundColor: isSelected ? colors.primary : colors.surface,
            borderColor: isSelected ? colors.primary : colors.border,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            marginRight: spacing.sm,
          }
        ]}
        onPress={() => setCategory(type)}
      >
        <Text style={[typography.bodyBold, { color: isSelected ? colors.textInverse : colors.text }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <Input
          label="Exercise Name"
          placeholder="e.g. Bench Press"
          value={name}
          onChangeText={setName}
          error={errors.name}
          autoFocus={!exerciseId}
        />

        <View style={styles.section}>
          <Text style={[typography.small, { color: colors.textSecondary, marginBottom: spacing.sm, fontWeight: '600' }]}>
            Category
          </Text>
          <View style={styles.categoryContainer}>
            {renderCategoryOption('gym', 'Gym')}
            {renderCategoryOption('cardio', 'Cardio')}
            {renderCategoryOption('abs', 'Abs')}
          </View>
          {errors.category && (
            <Text style={[typography.small, { color: colors.error, marginTop: spacing.xs }]}>
              {errors.category}
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          <Button
            title={exerciseId ? "Update Exercise" : "Create Exercise"}
            onPress={handleSave}
            variant="primary"
            loading={isSaving}
            style={{ marginBottom: spacing.sm }}
          />
          {exerciseId && (
            <Button
              title="Delete Exercise"
              onPress={handleDelete}
              variant="secondary"
              disabled={isSaving}
              style={{ marginBottom: spacing.sm, borderColor: colors.error }}
              // Note: Using secondary variant but with error color for destruction
            />
          )}
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="secondary"
            disabled={isSaving}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryOption: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  footer: {
    marginTop: 16,
  },
});
