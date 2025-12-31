import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './Button';

interface EmptyStateProps {
  message: string;
  ctaLabel?: string;
  onCtaPress?: () => void;
}

export const EmptyState = ({ message, ctaLabel, onCtaPress }: EmptyStateProps) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.lg, textAlign: 'center' }]}>
        {message}
      </Text>
      {ctaLabel && onCtaPress && (
        <Button title={ctaLabel} onPress={onCtaPress} variant="primary" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
