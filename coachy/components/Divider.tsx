import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle, DimensionValue } from 'react-native';

interface DividerProps {
  text?: string;
  thickness?: number;
  color?: string;
  textColor?: string;
  orientation?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  spacing?: number;
}

const Divider = ({
  text,
  thickness = 1,
  color = '#e0e0e0',
  textColor = '#757575',
  orientation = 'horizontal',
  style,
  textStyle,
  spacing = 16,
}: DividerProps) => {
  const dividerStyle = {
    backgroundColor: color,
    ...(orientation === 'horizontal'
      ? { height: thickness, marginVertical: spacing }
      : { width: thickness, marginHorizontal: spacing, height: '100%' as DimensionValue }),
  };

  if (!text) {
    return <View style={[dividerStyle, style]} />;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={[dividerStyle, styles.line]} />
      <Text style={[styles.text, { color: textColor }, textStyle]}>{text}</Text>
      <View style={[dividerStyle, styles.line]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    marginVertical: 8,
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
});

export default Divider;