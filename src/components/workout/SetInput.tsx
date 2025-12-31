import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { NumericInput, Button } from '../ui';
import { MaterialIcons } from '@expo/vector-icons';

interface SetInputProps {
  onAddSet: (weight: number | null, reps: number | null) => void;
  isLoading?: boolean;
}

export const SetInput = ({ onAddSet, isLoading }: SetInputProps) => {
  const { colors, spacing, typography } = useTheme();
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');

  const handleAdd = () => {
    const w = weight === '' ? null : parseFloat(weight);
    const r = reps === '' ? null : parseInt(reps, 10);
    onAddSet(w, r);
    // Clear inputs for next set
    setReps('');
  };

  return (
    <View style={[styles.container, { padding: spacing.md, backgroundColor: '#fcfcfc' }]}>
      <View style={styles.inputsRow}>
        <NumericInput
          label="Weight"
          value={weight}
          onChangeText={setWeight}
          unit="kg"
          placeholder="0"
          style={styles.input}
        />
        <View style={{ width: spacing.md }} />
        <NumericInput
          label="Reps"
          value={reps}
          onChangeText={setReps}
          allowDecimal={false}
          placeholder="0"
          style={styles.input}
        />
      </View>
      <Button
        title="ADD SET"
        onPress={handleAdd}
        variant="secondary"
        size="sm"
        loading={isLoading}
        style={{ marginTop: spacing.md }}
        leftIcon={<MaterialIcons name="add" size={18} color="white" />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  inputsRow: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
  },
});
