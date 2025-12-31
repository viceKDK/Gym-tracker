import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

interface CelebrationOverlayProps {
  message: string;
  visible: boolean;
}

export const CelebrationOverlay = ({ message, visible }: CelebrationOverlayProps) => {
  const { colors, typography, borderRadius } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim, scaleAnim]);

  if (!visible && fadeAnim === new Animated.Value(0)) return null;

  return (
    <Animated.View 
      pointerEvents="none"
      style={[
        styles.overlay, 
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <View style={[styles.content, { backgroundColor: colors.secondary, borderRadius: borderRadius.xl }]}>
        <MaterialIcons name="auto-awesome" size={32} color="white" />
        <Text style={[typography.h3, { color: 'white', marginLeft: 12 }]}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
});
