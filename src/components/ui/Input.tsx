import React from 'react';
import { StyleSheet, View, Text, TextInput, TextInputProps } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, style, ...props }: InputProps) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[typography.small, { color: colors.textSecondary, marginBottom: spacing.xs, fontWeight: '600' }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          { 
            backgroundColor: colors.surface, 
            borderColor: error ? colors.error : colors.border,
            borderRadius: borderRadius.md,
            padding: spacing.md,
            color: colors.text,
            ...typography.body
          },
          style
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error && (
        <Text style={[typography.small, { color: colors.error, marginTop: spacing.xs }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  input: {
    borderWidth: 1,
  },
});
