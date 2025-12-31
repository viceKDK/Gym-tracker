import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';

interface ResumeWorkoutPromptProps {
  timestamp: number;
  onResume: () => void;
  onDiscard: () => void;
}

export const ResumeWorkoutPrompt = ({ timestamp, onResume, onDiscard }: ResumeWorkoutPromptProps) => {
  const { colors, spacing, typography, borderRadius } = useTheme();

  const timeAgo = formatDistanceToNow(new Date(timestamp), { addSuffix: true });

  return (
    <Card style={[styles.container, { borderColor: colors.secondary, borderWidth: 1 }]}>
      <View style={styles.header}>
        <MaterialIcons name="restore" size={24} color={colors.secondary} />
        <Text style={[typography.bodyBold, { color: colors.text, marginLeft: spacing.sm }]}>
          Unfinished Workout
        </Text>
      </View>
      
      <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
        You have an in-progress workout from {timeAgo}. Would you like to resume it?
      </Text>

      <View style={styles.actions}>
        <Button 
          title="Resume" 
          onPress={onResume} 
          variant="secondary" 
          size="sm"
          style={styles.btn}
        />
        <View style={{ width: spacing.md }} />
        <Button 
          title="Discard" 
          onPress={onDiscard} 
          variant="outline" 
          size="sm"
          style={styles.btn}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  btn: {
    flex: 1,
  },
});
