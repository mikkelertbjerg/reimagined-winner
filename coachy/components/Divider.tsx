import { StyleSheet, ViewStyle, TextStyle, ViewProps, View, Text, StyleProp } from 'react-native';

type Props = {
  label?: string;
  color?: string;
  thickness?: number;
  inset?: number;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
} & ViewProps

const Divider = ({ label, color = '#000', thickness = StyleSheet.hairlineWidth, inset = 0, labelStyle, style, ...props }: Props) => {
  return (
    <View
      style={[
        styles.row,
        { marginVertical: inset, alignItems: 'center' },
        style
      ]}
      {...props}
    >
      <View style={[styles.line, { backgroundColor: color, height: thickness }]} />
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <View style={[styles.line, { backgroundColor: color, height: thickness }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  line: {
    flex: 1
  },
  label: {
    marginHorizontal: 8,
    color: '#999',
    fontWeight: '500',
    fontSize: 13
  }
});

export default Divider;