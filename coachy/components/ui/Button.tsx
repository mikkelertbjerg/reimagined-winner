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
} from 'react-native';
import { useSettings } from '@/context/SettingsContext';

// Define button variant types
type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonIntent = 'primary' | 'secondary' | 'tertiary' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

// Button props
interface ButtonProps {
    variant?: ButtonVariant;
    intent?: ButtonIntent;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
    onPress?: () => void;
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}

const Button = ({
    variant = 'default',
    intent = 'primary',
    size = 'md',
    disabled = false,
    fullWidth = false,
    onPress,
    loading = false,
    style,
    textStyle,
    leftIcon,
    rightIcon,
    children,
}: ButtonProps) => {
    const { theme } = useSettings();

    const getBackgroundColor = () => {
        if (variant === 'ghost' || variant === 'outline') return 'transparent';

        switch (intent) {
            case 'secondary':
                return theme.colors.secondary.DEFAULT;
            case 'tertiary':
                return theme.colors.tertiary.DEFAULT;
            case 'destructive':
                return theme.colors.destructive.DEFAULT;
            case 'primary':
            default:
                return theme.colors.primary.DEFAULT;
        }
    };

    // Get border color
    const getBorderColor = () => {
        switch (intent) {
            case 'secondary':
                return theme.colors.secondary.DEFAULT;
            case 'tertiary':
                return theme.colors.tertiary.DEFAULT;
            case 'destructive':
                return theme.colors.destructive.DEFAULT;
            case 'primary':
            default:
                return theme.colors.primary.DEFAULT;
        }
    };

    // Get text color based on variant and intent
    const getTextColor = () => {
        if (variant === 'default') {
            switch (intent) {
                case 'secondary':
                    return theme.colors.secondary.foreground;
                case 'tertiary':
                    return theme.colors.tertiary.foreground;
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
            case 'tertiary':
                return theme.colors.tertiary.DEFAULT;
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

    return (
        <TouchableOpacity
            style={[
                styles.root,
                {
                    backgroundColor: getBackgroundColor(),
                    borderRadius: theme.radii.md,
                    borderWidth: 1, // Always add border width for consistent sizing
                    borderColor: variant === 'outline' ? getBorderColor() : getBackgroundColor(), // Match background for non-outline variants
                    opacity: disabled ? 0.5 : 1,
                    width: fullWidth ? '100%' : undefined,
                    ...getPadding(),
                },
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                {loading && (
                    <ActivityIndicator
                        color={getTextColor()}
                        size="small"
                        style={styles.loadingIndicator}
                    />
                )}

                {!loading && leftIcon && (
                    <View style={styles.iconStart}>
                        {leftIcon}
                    </View>
                )}

                <Text
                    style={[
                        styles.text,
                        {
                            fontSize: getFontSize(),
                            color: getTextColor(),
                        },
                        textStyle,
                    ]}
                >
                    {children}
                </Text>

                {!loading && rightIcon && (
                    <View style={styles.iconEnd}>
                        {rightIcon}
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
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
    loadingIndicator: {
        marginRight: 8,
    }
});

export default Button;