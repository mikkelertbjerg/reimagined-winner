import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    StyleProp,
    TextStyle,
    ViewStyle,
    GestureResponderEvent
} from 'react-native';
import { useSettings } from '@/context/SettingsContext';

type LinkVariant = 'default' | 'muted' | 'primary' | 'destructive';

interface LinkTextProps {
    children: React.ReactNode;
    onPress?: (event: GestureResponderEvent) => void;
    variant?: LinkVariant;
    bold?: boolean;
    underline?: boolean;
    style?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
}

const LinkText = ({
    children,
    onPress,
    variant = 'primary',
    bold = false,
    underline = false,
    style,
    containerStyle,
    disabled = false
}: LinkTextProps) => {
    const { theme } = useSettings();

    // Get text color based on variant
    const getTextColor = () => {
        switch (variant) {
            case 'muted':
                return theme.colors.text.muted;
            case 'primary':
                return theme.colors.primary.DEFAULT;
            case 'destructive':
                return theme.colors.destructive.DEFAULT;
            case 'default':
            default:
                return theme.colors.text.DEFAULT;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, containerStyle]}
            disabled={disabled}
            activeOpacity={0.7}
        >
            <Text
                style={[
                    {
                        color: getTextColor(),
                        fontWeight: bold ? '600' : 'normal',
                        textDecorationLine: underline ? 'underline' : 'none',
                        opacity: disabled ? 0.5 : 1,
                    },
                    style
                ]}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        // Minimal styling to allow for flexibility
    }
});

export default LinkText;