import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

// Define divider variant types
type DividerVariant = 'default' | 'muted' | 'strong';
type DividerTextVariant = 'default' | 'muted';

// Define the component namespace
const Divider = {
  Root: ({
    children,
    orientation = 'horizontal',
    style
  }: {
    children?: React.ReactNode;
    orientation?: 'horizontal' | 'vertical';
    style?: ViewStyle;
  }) => {
    return (
      <View
        style={[
          {
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            alignItems: 'center',
            width: orientation === 'horizontal' ? '100%' : 'auto',
            height: orientation === 'vertical' ? '100%' : 'auto',
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  },

  Separator: ({
    thickness = 1,
    variant = 'default',
    style
  }: {
    thickness?: number;
    variant?: DividerVariant;
    style?: ViewStyle;
  }) => {
    const theme = useTheme();

    // Get color based on variant
    let color;
    switch (variant) {
      case 'muted':
        color = theme.colors.border.muted;
        break;
      case 'strong':
        color = theme.colors.border.strong;
        break;
      default:
        color = theme.colors.border.DEFAULT;
    }

    return (
      <View
        style={[
          { flex: 1 },
          {
            backgroundColor: color,
            height: thickness,
            marginVertical: theme.spacing[4],
          },
          style,
        ]}
      />
    );
  },

  Text: ({
    children,
    variant = 'default',
    style
  }: {
    children: React.ReactNode;
    variant?: DividerTextVariant;
    style?: TextStyle;
  }) => {
    const theme = useTheme();

    // Get text color based on variant
    const color = variant === 'muted'
      ? theme.colors.text.muted
      : theme.colors.text.DEFAULT;

    return (
      <Text
        style={[
          {
            fontSize: theme.fontSizes.sm,
            paddingHorizontal: theme.spacing[2],
            textAlign: 'center',
            color,
          },
          style,
        ]}
      >
        {children}
      </Text>
    );
  },
};

export default Divider;