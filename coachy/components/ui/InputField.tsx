import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
    StyleProp,
    ViewStyle,
    TextStyle,
    Animated,
    NativeSyntheticEvent,
    TextInputFocusEventData
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

// Define input size type
type InputSize = 'sm' | 'md' | 'lg';

interface InputFieldProps extends TextInputProps {
    label: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    size?: InputSize;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>;
    errorStyle?: StyleProp<TextStyle>;
    helperTextStyle?: StyleProp<TextStyle>;
}

const InputField = ({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    size = 'md',
    containerStyle,
    labelStyle,
    inputStyle,
    errorStyle,
    helperTextStyle,
    onFocus,
    onBlur,
    value,
    defaultValue,
    placeholder,
    ...textInputProps
}: InputFieldProps) => {
    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const hasContent = value !== undefined ? !!value : !!defaultValue;

    // Animation value
    const labelPositionAnim = useRef(new Animated.Value(hasContent || isFocused ? 1 : 0)).current;

    // Update animation when focus or content changes
    useEffect(() => {
        Animated.timing(labelPositionAnim, {
            toValue: (isFocused || hasContent) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, hasContent, labelPositionAnim]);

    // Get font size based on input size
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

    // Get padding based on size
    const getPadding = () => {
        switch (size) {
            case 'sm':
                return theme.spacing[2];
            case 'lg':
                return theme.spacing[4];
            case 'md':
            default:
                return theme.spacing[3];
        }
    };

    // Get icon size based on input size
    const getIconSize = () => {
        switch (size) {
            case 'sm':
                return { paddingHorizontal: 8 };
            case 'lg':
                return { paddingHorizontal: 16 };
            case 'md':
            default:
                return { paddingHorizontal: 12 };
        }
    };

    // Get label size & position from animation
    const getLabelStyle = () => {
        // Determine sizes based on input size
        const normalFontSize = getFontSize();
        const floatingFontSize = size === 'sm' ? theme.fontSizes.xs : theme.fontSizes.sm;

        // Calculate the label position
        const top = labelPositionAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [getPadding(), -floatingFontSize / 1.5] // Position to sit on the border
        });

        // Calculate font size
        const fontSize = labelPositionAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [normalFontSize, floatingFontSize]
        });

        // Calculate horizontal position (starting position depends on icon)
        const left = labelPositionAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [
                leftIcon ? getIconSize().paddingHorizontal * 2 : getPadding(),
                getPadding()
            ]
        });

        return {
            fontSize,
            top,
            left
        };
    };

    // Handle focus and blur with proper type annotations
    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    // Only show placeholder when label is floating
    const displayedPlaceholder = isFocused || hasContent ? placeholder : '';

    // Background color for label needs to match parent background
    const labelBackgroundColor = theme.colors.background.DEFAULT;

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.inputOuterContainer}>
                {/* Floating Label */}
                <Animated.Text
                    style={[
                        styles.floatingLabel,
                        getLabelStyle(),
                        {
                            color: error
                                ? theme.colors.destructive.DEFAULT
                                : isFocused
                                    ? theme.colors.primary.DEFAULT
                                    : theme.colors.text.muted,
                            backgroundColor: labelBackgroundColor,
                            // Only add padding when floating to create the "break" in the border
                            paddingHorizontal: labelPositionAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 4]
                            }),
                            zIndex: 1,
                        },
                        labelStyle
                    ]}
                    onPress={() => inputRef.current?.focus()}
                >
                    {label}
                </Animated.Text>

                {/* Input with border */}
                <View
                    style={[
                        styles.inputContainer,
                        {
                            borderColor: error
                                ? theme.colors.destructive.DEFAULT
                                : isFocused
                                    ? theme.colors.primary.DEFAULT
                                    : theme.colors.border.DEFAULT,
                            borderRadius: theme.radii.md,
                        }
                    ]}
                >
                    {leftIcon && (
                        <View style={[styles.leftIcon, getIconSize()]}>
                            {leftIcon}
                        </View>
                    )}

                    <TextInput
                        ref={inputRef}
                        style={[
                            styles.input,
                            {
                                fontSize: getFontSize(),
                                color: theme.colors.text.DEFAULT,
                                paddingVertical: getPadding(),
                                paddingLeft: leftIcon ? 0 : getPadding(),
                                paddingRight: rightIcon ? 0 : getPadding(),
                            },
                            inputStyle
                        ]}
                        placeholder={displayedPlaceholder}
                        placeholderTextColor={theme.colors.text.muted}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={value}
                        defaultValue={defaultValue}
                        {...textInputProps}
                    />

                    {rightIcon && (
                        <View style={[styles.rightIcon, getIconSize()]}>
                            {rightIcon}
                        </View>
                    )}
                </View>
            </View>

            {/* Error message or helper text */}
            {error ? (
                <Text
                    style={[
                        styles.helperText,
                        {
                            color: theme.colors.destructive.DEFAULT,
                            fontSize: size === 'lg' ? theme.fontSizes.sm : theme.fontSizes.xs
                        },
                        errorStyle
                    ]}
                >
                    {error}
                </Text>
            ) : helperText ? (
                <Text
                    style={[
                        styles.helperText,
                        {
                            color: theme.colors.text.muted,
                            fontSize: size === 'lg' ? theme.fontSizes.sm : theme.fontSizes.xs
                        },
                        helperTextStyle
                    ]}
                >
                    {helperText}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        position: 'relative',
    },
    inputOuterContainer: {
        position: 'relative',
    },
    floatingLabel: {
        position: 'absolute',
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
    },
    input: {
        flex: 1,
    },
    leftIcon: {
        paddingRight: 0,
    },
    rightIcon: {
        paddingLeft: 0,
    },
    helperText: {
        marginTop: 4,
    }
});

export default InputField;