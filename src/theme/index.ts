/**
 * gym-TRAKER Design System
 * Warm, cohesive visual design tokens
 */

export const colors = {
  // Primary palette
  primary: '#FF6B6B',      // Coral - Main actions, active states
  secondary: '#4ECDC4',    // Teal - Secondary actions, accents

  // Backgrounds
  background: '#FFF9F0',   // Cream - App background
  surface: '#FFFFFF',      // White - Cards, modals

  // Text
  text: '#2D3436',         // Dark Gray - Primary text
  textSecondary: '#636E72', // Medium Gray - Secondary text
  textInverse: '#FFFFFF',  // White - Text on dark backgrounds

  // UI elements
  border: '#DFE6E9',       // Light Gray - Dividers, borders

  // Feedback
  error: '#E74C3C',        // Red - Error states
  success: '#27AE60',      // Green - Success states

  // Activity graph levels (0 = no activity, 4 = high activity)
  activityLevels: [
    '#EBEDF0', // Level 0 - Neutral gray (no workout)
    '#FFE5E5', // Level 1 - Lightest coral
    '#FFB3B3', // Level 2
    '#FF8080', // Level 3
    '#FF6B6B', // Level 4 - Full coral (high activity)
  ] as const,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,    // Buttons
  xl: 16,    // Cards
  full: 9999, // Pills, circles
} as const;

export const typography = {
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

// Combined theme object
export const theme = {
  colors,
  spacing,
  borderRadius,
  typography,
  shadows,
} as const;

// TypeScript types
export type Theme = typeof theme;
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Typography = typeof typography;
export type Shadows = typeof shadows;
export type TypographyStyle = keyof typeof typography;
export type ActivityLevel = 0 | 1 | 2 | 3 | 4;

export default theme;
