import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../../contexts';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Button component with theme-aware styling
 * Ensures minimum 44x44 touch target per NFR11
 */
export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  ...touchableProps
}: ButtonProps) {
  const { colors, spacing, borderRadius, typography } = useTheme();

  const getBackgroundColor = (): string => {
    if (disabled) return colors.border;
    switch (variant) {
      case 'primary':
        return colors.primary;
      case 'secondary':
        return colors.secondary;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return colors.primary;
    }
  };

  const getTextColor = (): string => {
    if (disabled) return colors.textSecondary;
    switch (variant) {
      case 'primary':
      case 'secondary':
        return colors.textInverse;
      case 'outline':
        return colors.primary;
      case 'ghost':
        return colors.text;
      default:
        return colors.textInverse;
    }
  };

  const getBorderStyle = (): ViewStyle => {
    if (variant === 'outline') {
      return {
        borderWidth: 2,
        borderColor: disabled ? colors.border : colors.primary,
      };
    }
    return {};
  };

  const getSizeStyle = (): ViewStyle => {
    // All sizes enforce minimum 44px height per NFR11
    switch (size) {
      case 'sm':
        return {
          minHeight: 44,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
        };
      case 'md':
        return {
          minHeight: 48,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm + 2,
        };
      case 'lg':
        return {
          minHeight: 56,
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.md,
        };
      default:
        return {
          minHeight: 48,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.sm + 2,
        };
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case 'sm':
        return { fontSize: typography.caption.fontSize };
      case 'md':
        return { fontSize: typography.body.fontSize };
      case 'lg':
        return { fontSize: typography.body.fontSize + 2 };
      default:
        return { fontSize: typography.body.fontSize };
    }
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderRadius: borderRadius.lg, // 12px per design spec
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minWidth: 44, // Minimum touch target width NFR11
    ...getSizeStyle(),
    ...getBorderStyle(),
    ...(fullWidth && { width: '100%' }),
    ...style,
  };

  const labelStyle: TextStyle = {
    color: getTextColor(),
    fontWeight: typography.bodyBold.fontWeight,
    ...getTextSize(),
    ...textStyle,
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...touchableProps}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={{ marginRight: spacing.sm }}
        />
      ) : null}
      <Text style={labelStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Button;
