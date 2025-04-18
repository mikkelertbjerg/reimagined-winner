import { Pressable, StyleProp, StyleSheet, TextProps, ViewProps } from "react-native";

type Props = {
    label?: string;
    labelStyle?: StyleProp<TextProps>
    style?: StyleProp<ViewProps>
    onPress?: () => void;

} & ViewProps
const Button = ({ label, labelStyle, style, onPress }: Props) => {
    return (
        <Pressable>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    
})

export default Button