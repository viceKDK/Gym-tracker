import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

interface PRBadgeProps {
  weight: number;
  date?: string;
  showIcon?: boolean;
}

export const PRBadge = ({ weight, date, showIcon = true }: PRBadgeProps) => {
  const { colors, spacing, borderRadius, typography } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: '#FFD700' + '20', borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: 2 }]}>
      {showIcon && <MaterialIcons name="workspace-premium" size={16} color="#D4AF37" style={{ marginRight: 4 }} />}
      <Text style={[typography.small, { color: '#B8860B', fontWeight: 'bold' }]}>
        PR: {weight}kg
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
