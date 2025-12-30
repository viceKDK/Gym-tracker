import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../../contexts';

interface NumericInputProps {
  label?: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  unit?: string;
  error?: string;
  allowDecimal?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  editable?: boolean;
  testID?: string;
}

/**
 * NumericInput component with numeric keyboard
 * Styled with theme values, supports labels and units
 */
export function NumericInput({
  label,
  value,
  onChangeText,
  placeholder = '0',
  unit,
  error,
  allowDecimal = true,
  style,
  inputStyle,
  editable = true,
  testID,
}: NumericInputProps) {
  const { colors, spacing, borderRadius, typography } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    // Filter to allow only numeric input
    let filtered: string;
    if (allowDecimal) {
      // Allow numbers and single decimal point
      filtered = text.replace(/[^0-9.]/g, '');
      // Ensure only one decimal point
      const parts = filtered.split('.');
      if (parts.length > 2) {
        filtered = parts[0] + '.' + parts.slice(1).join('');
      }
    } else {
      // Allow only integers
      filtered = text.replace(/[^0-9]/g, '');
    }
    onChangeText(filtered);
  };

  const containerStyle: ViewStyle = {
    ...style,
  };

  const labelStyle: TextStyle = {
    ...typography.caption,
    color: error ? colors.error : colors.textSecondary,
    marginBottom: spacing.xs,
  };

  const inputContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: error
      ? colors.error
      : isFocused
      ? colors.primary
      : colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    minHeight: 48, // Touch target
  };

  const textInputStyle: TextStyle = {
    flex: 1,
    ...typography.body,
    color: colors.text,
    paddingVertical: spacing.sm,
    minHeight: 44, // Touch target per NFR11
    ...inputStyle,
  };

  const unitStyle: TextStyle = {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  };

  const errorStyle: TextStyle = {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  };

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={inputContainerStyle}>
        <TextInput
          ref={inputRef}
          style={textInputStyle}
          value={value}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={allowDecimal ? 'decimal-pad' : 'number-pad'}
          returnKeyType="done"
          selectTextOnFocus
          editable={editable}
          testID={testID}
        />
        {unit && <Text style={unitStyle}>{unit}</Text>}
      </View>
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
}

export default NumericInput;
