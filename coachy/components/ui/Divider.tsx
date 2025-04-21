import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

// Define divider props types
type DividerVariant = 'default' | 'muted' | 'strong';
type DividerTextVariant = 'default' | 'muted';

interface DividerProps {
  text?: string;
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  variant?: DividerVariant;
  textVariant?: DividerTextVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Divider component with optional text label
 */
const Divider = ({
  text,
  orientation = 'horizontal',
  thickness = 1,
  variant = 'default',
  textVariant = 'default',
  style,
  textStyle,
}: DividerProps) => {
  const theme = useTheme();

  // Get color based on variant
  const getBorderColor = () => {
    switch (variant) {
      case 'muted':
        return theme.colors.border.muted;
      case 'strong':
        return theme.colors.border.strong;
      default:
        return theme.colors.border.DEFAULT;
    }
  };

  // Get text color based on variant
  const getTextColor = () => {
    return textVariant === 'muted'
      ? theme.colors.text.muted
      : theme.colors.text.DEFAULT;
  };

  // If there's no text, render a simple divider
  if (!text) {
    return (
      <View
        style={[
          {
            backgroundColor: getBorderColor(),
            height: orientation === 'horizontal' ? thickness : '100%',
            width: orientation === 'horizontal' ? '100%' : thickness,
            marginVertical: orientation === 'horizontal' ? theme.spacing[4] : 0,
            marginHorizontal: orientation === 'vertical' ? theme.spacing[4] : 0,
          },
          style,
        ]}
      />
    );
  }

  // Render divider with text
  return (
    <View
      style={[
        {
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          alignItems: 'center',
          width: orientation === 'horizontal' ? '100%' : 'auto',
          height: orientation === 'vertical' ? '100%' : 'auto',
          marginVertical: orientation === 'horizontal' ? theme.spacing[4] : 0,
          marginHorizontal: orientation === 'vertical' ? theme.spacing[4] : 0,
        },
        style,
      ]}
    >
      {/* Left/Top line */}
      <View
        style={{
          flex: 1,
          backgroundColor: getBorderColor(),
          height: orientation === 'horizontal' ? thickness : 'auto',
          width: orientation === 'vertical' ? thickness : 'auto',
        }}
      />

      {/* Text */}
      <Text
        style={[
          {
            fontSize: theme.fontSizes.sm,
            paddingHorizontal: orientation === 'horizontal' ? theme.spacing[2] : 0,
            paddingVertical: orientation === 'vertical' ? theme.spacing[2] : 0,
            textAlign: 'center',
            color: getTextColor(),
          },
          textStyle,
        ]}
      >
        {text}
      </Text>

      {/* Right/Bottom line */}
      <View
        style={{
          flex: 1,
          backgroundColor: getBorderColor(),
          height: orientation === 'horizontal' ? thickness : 'auto',
          width: orientation === 'vertical' ? thickness : 'auto',
        }}
      />
    </View>
  );
};

export default Divider;