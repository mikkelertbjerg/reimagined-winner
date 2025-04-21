import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
    TextStyle,
    View,
    Pressable,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

// Define button variant types
type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonIntent = 'primary' | 'secondary' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

// Base button props
interface ButtonRootProps {
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}

// Define the Button namespace with compositional components
const Button = {
    // Root component
    Root: ({ onPress, disabled = false, style, children }: ButtonRootProps) => {
        const theme = useTheme();

        return (
            <TouchableOpacity
                style={[
                    styles.root,
                    { borderRadius: theme.radii.md },
                    style,
                ]}
                onPress={onPress}
                disabled={disabled}
                activeOpacity={0.7}
            >
                {children}
            </TouchableOpacity>
        );
    },

    // Content container for button elements
    Content: ({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) => {
        return (
            <View style={[styles.content, style]}>
                {children}
            </View>
        );
    },

    // Main button component with styling
    Element: ({
        variant = 'default',
        intent = 'primary',
        size = 'md',
        disabled = false,
        fullWidth = false,
        style,
        children,
    }: {
        variant?: ButtonVariant;
        intent?: ButtonIntent;
        size?: ButtonSize;
        disabled?: boolean;
        fullWidth?: boolean;
        style?: StyleProp<ViewStyle>;
        children: React.ReactNode;
    }) => {
        const theme = useTheme();

        // Get background color based on variant and intent
        const getBackgroundColor = () => {
            if (variant === 'ghost' || variant === 'outline') return 'transparent';

            switch (intent) {
                case 'secondary':
                    return theme.colors.secondary.DEFAULT;
                case 'destructive':
                    return theme.colors.destructive.DEFAULT;
                case 'primary':
                default:
                    return theme.colors.primary.DEFAULT;
            }
        };

        // Get text and border color
        const getAccentColor = () => {
            switch (intent) {
                case 'secondary':
                    return theme.colors.secondary.DEFAULT;
                case 'destructive':
                    return theme.colors.destructive.DEFAULT;
                case 'primary':
                default:
                    return theme.colors.primary.DEFAULT;
            }
        };

        // Get padding based on size
        const getPadding = () => {
            switch (size) {
                case 'sm':
                    return { paddingVertical: theme.spacing[1], paddingHorizontal: theme.spacing[2] };
                case 'lg':
                    return { paddingVertical: theme.spacing[3], paddingHorizontal: theme.spacing[6] };
                case 'md':
                default:
                    return { paddingVertical: theme.spacing[2], paddingHorizontal: theme.spacing[4] };
            }
        };

        return (
            <Pressable
                style={({ pressed }) => [
                    {
                        backgroundColor: getBackgroundColor(),
                        borderWidth: variant === 'outline' ? 1 : 0,
                        borderColor: variant === 'outline' ? getAccentColor() : undefined,
                        opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
                        width: fullWidth ? '100%' : undefined,
                        ...getPadding(),
                    },
                    style,
                ]}
            >
                {children}
            </Pressable>
        );
    },

    // Text component for button
    Text: ({
        children,
        size = 'md',
        variant = 'default',
        intent = 'primary',
        style
    }: {
        children: React.ReactNode;
        size?: ButtonSize;
        variant?: ButtonVariant;
        intent?: ButtonIntent;
        style?: StyleProp<TextStyle>;
    }) => {
        const theme = useTheme();

        // Get font size based on button size
        const getFontSize = () => {
            switch (size) {
                case 'sm':
                    return theme.fontSizes.xs;
                case 'lg':
                    return theme.fontSizes.lg;
                case 'md':
                default:
                    return theme.fontSizes.md;
            }
        };

        // Get text color based on variant and intent
        const getTextColor = () => {
            if (variant === 'default') {
                switch (intent) {
                    case 'secondary':
                        return theme.colors.secondary.foreground;
                    case 'destructive':
                        return theme.colors.destructive.foreground;
                    case 'primary':
                    default:
                        return theme.colors.primary.foreground;
                }
            }

            // For outline and ghost variants
            switch (intent) {
                case 'secondary':
                    return theme.colors.secondary.DEFAULT;
                case 'destructive':
                    return theme.colors.destructive.DEFAULT;
                case 'primary':
                default:
                    return theme.colors.primary.DEFAULT;
            }
        };

        return (
            <Text
                style={[
                    styles.text,
                    {
                        fontSize: getFontSize(),
                        color: getTextColor()
                    },
                    style,
                ]}
            >
                {children}
            </Text>
        );
    },

    // Icon container for button
    Icon: ({
        children,
        position = 'start',
        style
    }: {
        children: React.ReactNode;
        position?: 'start' | 'end';
        style?: StyleProp<ViewStyle>;
    }) => {
        const theme = useTheme();

        return (
            <View
                style={[
                    position === 'start' ? styles.iconStart : styles.iconEnd,
                    { marginHorizontal: theme.spacing[1] },
                    style,
                ]}
            >
                {children}
            </View>
        );
    },

    // Loading spinner
    Spinner: ({
        color,
        size = 'small',
        style
    }: {
        color?: string;
        size?: 'small' | 'large';
        style?: StyleProp<ViewStyle>;
    }) => {
        return (
            <ActivityIndicator
                color={color}
                size={size}
                style={[style]}
            />
        );
    },
};

const styles = StyleSheet.create({
    root: {
        overflow: 'hidden',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '500',
        textAlign: 'center',
    },
    iconStart: {
        marginRight: 8,
    },
    iconEnd: {
        marginLeft: 8,
    },
});

export default Button;