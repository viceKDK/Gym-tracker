import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ value, onChangeText, onClear }: SearchBarProps) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderRadius: borderRadius.md, margin: spacing.md, paddingHorizontal: spacing.sm }]}>
      <MaterialIcons name="search" size={20} color={colors.textSecondary} />
      <TextInput
        style={[styles.input, { color: colors.text, ...typography.body, marginLeft: spacing.xs }]}
        placeholder="Search exercises..."
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <MaterialIcons name="close" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: '#DFE6E9',
  },
  input: {
    flex: 1,
    height: '100%',
  },
});
