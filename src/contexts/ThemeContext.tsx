import React, { createContext, useContext, ReactNode } from 'react';
import { theme, Theme } from '../theme';

// Create context with default theme value
const ThemeContext = createContext<Theme>(theme);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider wraps the app to provide theme values
 * to all child components via useTheme() hook
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme values
 * @returns The complete theme object with colors, spacing, typography, etc.
 * @example
 * const { colors, spacing } = useTheme();
 * <View style={{ backgroundColor: colors.background, padding: spacing.md }} />
 */
export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export { ThemeContext };
export default ThemeProvider;
