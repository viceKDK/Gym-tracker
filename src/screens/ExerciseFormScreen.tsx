import React, { useState, useCallback } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Alert, TouchableOpacity, Text, Modal, Image, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Input, Button } from '../components/ui';
import { ExerciseRepository } from '../database/repositories/ExerciseRepository';
import { ExerciseCategory, NewExercise, MuscleGroup } from '../types';
import { MaterialIcons } from '@expo/vector-icons';

type RootStackParamList = {
  ExerciseForm: { exerciseId?: number; initialData?: any };
};

const MUSCLE_GROUPS: MuscleGroup[] = [
  'chest', 'back', 'shoulders', 'biceps', 'triceps', 'forearms',
  'abs', 'obliques', 'lowerBack', 'quads', 'hamstrings', 'glutes',
  'calves', 'fullBody', 'cardio'
];

export default function ExerciseFormScreen() {
  const { colors, spacing, typography, borderRadius } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ExerciseForm'>>();
  
  const exerciseId = route.params?.exerciseId;
  const initialData = route.params?.initialData;

  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState<ExerciseCategory>(initialData?.category || 'gym');
  const [muscleGroup, setMuscleGroup] = useState<MuscleGroup | null>(initialData?.muscle_group || null);
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '');
  const [videoUrl, setVideoUrl] = useState(initialData?.video_url || '');
  
  const [showMusclePicker, setShowMusclePicker] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; category?: string }>({});
  const [isSaving, setIsReady] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; category?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenVideo = async () => {
    if (!videoUrl) return;
    try {
      const supported = await Linking.canOpenURL(videoUrl);
      if (supported) {
        await Linking.openURL(videoUrl);
      } else {
        Alert.alert('Error', 'Cannot open this URL');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open video link');
    }
  };

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setIsReady(true);
      const repo = new ExerciseRepository();
      const exerciseData: NewExercise = { 
        name: name.trim(), 
        category,
        muscle_group: muscleGroup,
        image_url: imageUrl.trim() || null,
        video_url: videoUrl.trim() || null
      };

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
            marginBottom: spacing.sm,
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
            {renderCategoryOption('calisthenics', 'Calisthenics')}
          </View>
          {errors.category && (
            <Text style={[typography.small, { color: colors.error, marginTop: spacing.xs }]}>
              {errors.category}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[typography.small, { color: colors.textSecondary, marginBottom: spacing.sm, fontWeight: '600' }]}>
            Muscle Group (Optional)
          </Text>
          <TouchableOpacity
            style={[styles.pickerButton, { borderColor: colors.border, borderRadius: borderRadius.md, backgroundColor: colors.surface }]}
            onPress={() => setShowMusclePicker(true)}
          >
            <Text style={{ color: muscleGroup ? colors.text : colors.textSecondary }}>
              {muscleGroup ? muscleGroup.charAt(0).toUpperCase() + muscleGroup.slice(1) : 'Select Muscle Group'}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Input
            label="Image URL (Optional)"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChangeText={setImageUrl}
          />
          {imageUrl.trim().length > 0 && (
            <Image 
              source={{ uri: imageUrl }} 
              style={[styles.previewImage, { borderRadius: borderRadius.md, borderColor: colors.border }]} 
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.videoInputContainer}>
            <View style={{ flex: 1 }}>
              <Input
                label="Video URL (Optional)"
                placeholder="https://youtube.com/..."
                value={videoUrl}
                onChangeText={setVideoUrl}
              />
            </View>
            {videoUrl.trim().length > 0 && (
              <TouchableOpacity 
                style={[styles.videoBtn, { backgroundColor: colors.primary + '20', borderRadius: borderRadius.md }]} 
                onPress={handleOpenVideo}
              >
                <MaterialIcons name="play-circle-filled" size={32} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
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

      <Modal
        visible={showMusclePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMusclePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.background, borderRadius: borderRadius.lg }]}>
            <View style={styles.modalHeader}>
              <Text style={[typography.h3, { color: colors.text }]}>Select Muscle Group</Text>
              <TouchableOpacity onPress={() => setShowMusclePicker(false)}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.muscleList}>
              <TouchableOpacity
                style={[styles.muscleOption, { borderBottomColor: colors.border }]}
                onPress={() => {
                  setMuscleGroup(null);
                  setShowMusclePicker(false);
                }}
              >
                <Text style={{ color: colors.textSecondary }}>None</Text>
                {muscleGroup === null && <MaterialIcons name="check" size={20} color={colors.primary} />}
              </TouchableOpacity>
              {MUSCLE_GROUPS.map(mg => (
                <TouchableOpacity
                  key={mg}
                  style={[styles.muscleOption, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    setMuscleGroup(mg);
                    setShowMusclePicker(false);
                  }}
                >
                  <Text style={{ color: colors.text }}>{mg.charAt(0).toUpperCase() + mg.slice(1)}</Text>
                  {muscleGroup === mg && <MaterialIcons name="check" size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    flexWrap: 'wrap',
  },
  categoryOption: {
    minWidth: '22%',
    alignItems: 'center',
    borderWidth: 1,
  },
  footer: {
    marginTop: 16,
    paddingBottom: 32,
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
  },
  previewImage: {
    width: '100%',
    height: 200,
    marginTop: 8,
    borderWidth: 1,
  },
  videoInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  videoBtn: {
    marginLeft: 8,
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16, // Align with input's margin
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '60%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  muscleList: {
    flex: 1,
  },
  muscleOption: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
