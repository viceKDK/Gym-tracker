import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

interface StreakCounterProps {
  count: number;
}

export const StreakCounter = ({ count }: StreakCounterProps) => {
  const { colors, spacing, typography, borderRadius } = useTheme();

  const isActive = count > 0;

  return (
    <View style={[styles.container, { padding: spacing.md }]}>
      <View style={[
        styles.badge, 
        { 
          backgroundColor: isActive ? colors.primary + '15' : colors.border + '50',
          borderRadius: borderRadius.lg,
          padding: spacing.md,
        }
      ]}>
        <MaterialIcons 
          name="local-fire-department" 
          size={32} 
          color={isActive ? colors.primary : colors.textSecondary} 
        />
        <View style={{ marginLeft: spacing.md }}>
          <Text style={[typography.h2, { color: isActive ? colors.primary : colors.textSecondary, lineHeight: 30 }]}>
            {count}
          </Text>
          <Text style={[typography.small, { color: colors.textSecondary, fontWeight: '600' }]}>
            {count === 1 ? 'DAY STREAK' : 'DAYS STREAK'}
          </Text>
        </View>
      </View>
      
      {!isActive && (
        <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.sm, textAlign: 'center' }]}>
          Start your streak today! 🚀
        </Text>
      )}
      
      {count >= 30 && (
        <View style={[styles.milestone, { backgroundColor: '#FFD700', borderRadius: borderRadius.full }]}>
          <MaterialIcons name="emoji-events" size={16} color="white" />
          <Text style={[typography.small, { color: 'white', fontWeight: 'bold', marginLeft: 4 }]}>30 DAY CLUB</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 160,
    justifyContent: 'center',
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
  },
});
