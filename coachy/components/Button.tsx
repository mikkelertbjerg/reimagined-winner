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
    DimensionValue,
} from 'react-native';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    color?: ButtonColor;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const Button = ({
    title,
    onPress,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    fullWidth = false,
    startIcon,
    endIcon,
    style,
    textStyle,
}: ButtonProps) => {
    const getBackgroundColor = () => {
        if (variant !== 'contained') return 'transparent';

        const colors = {
            primary: '#1976d2',
            secondary: '#9c27b0',
            success: '#2e7d32',
            error: '#d32f2f',
            warning: '#ed6c02',
            info: '#0288d1',
        };

        return colors[color];
    };

    const getTextColor = () => {
        if (variant === 'contained') return '#ffffff';

        const colors = {
            primary: '#1976d2',
            secondary: '#9c27b0',
            success: '#2e7d32',
            error: '#d32f2f',
            warning: '#ed6c02',
            info: '#0288d1',
        };

        return colors[color];
    };

    const getBorderColor = () => {
        if (variant !== 'outlined') return 'transparent';

        const colors = {
            primary: '#1976d2',
            secondary: '#9c27b0',
            success: '#2e7d32',
            error: '#d32f2f',
            warning: '#ed6c02',
            info: '#0288d1',
        };

        return colors[color];
    };

    const getPadding = () => {
        const paddings = {
            small: { paddingVertical: 6, paddingHorizontal: 10 },
            medium: { paddingVertical: 8, paddingHorizontal: 16 },
            large: { paddingVertical: 12, paddingHorizontal: 24 },
        };

        return paddings[size];
    };

    const getOpacity = () => {
        return disabled ? 0.5 : 1;
    };

    const buttonStyles = [
        styles.button,
        {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
            borderWidth: variant === 'outlined' ? 1 : 0,
            opacity: getOpacity(),
            ...getPadding(),
            width: fullWidth ? '100%' as DimensionValue : undefined,
        },
        style,
    ];

    const textStyles = [
        styles.text,
        {
            color: getTextColor(),
            fontSize: size === 'small' ? 14 : size === 'medium' ? 16 : 18,
        },
        textStyle,
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'contained' ? '#ffffff' : getTextColor()} />
            ) : (
                <View style={styles.contentContainer}>
                    {startIcon && <View style={styles.iconStart}>{startIcon}</View>}
                    <Text style={textStyles}>{title}</Text>
                    {endIcon && <View style={styles.iconEnd}>{endIcon}</View>}
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    contentContainer: {
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