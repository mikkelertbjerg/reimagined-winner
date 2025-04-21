import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
    StyleProp,
    ViewStyle,
    TextStyle
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface InputFieldProps extends TextInputProps {
    label: string;
    error?: string;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    inputStyle?: StyleProp<TextStyle>; // Changed from ViewStyle to TextStyle
    errorStyle?: StyleProp<TextStyle>;
}

const InputField = ({
    label,
    error,
    containerStyle,
    labelStyle,
    inputStyle,
    errorStyle,
    ...textInputProps
}: InputFieldProps) => {
    const theme = useTheme();

    return (
        <View style={[styles.container, containerStyle]}>
            <Text
                style={[
                    styles.label,
                    {
                        color: theme.colors.text.DEFAULT,
                        fontSize: theme.fontSizes.sm,
                        marginBottom: theme.spacing[1]
                    },
                    labelStyle
                ]}
            >
                {label}
            </Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.colors.background.DEFAULT,
                        borderColor: error
                            ? theme.colors.destructive.DEFAULT
                            : theme.colors.border.DEFAULT,
                        borderRadius: theme.radii.md,
                        fontSize: theme.fontSizes.md,
                        color: theme.colors.text.DEFAULT,
                        padding: theme.spacing[3]
                    },
                    inputStyle
                ]}
                placeholderTextColor={theme.colors.text.muted}
                {...textInputProps}
            />

            {error ? (
                <Text
                    style={[
                        styles.errorText,
                        {
                            color: theme.colors.destructive.DEFAULT,
                            fontSize: theme.fontSizes.sm
                        },
                        errorStyle
                    ]}
                >
                    {error}
                </Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
    },
    errorText: {
        marginTop: 4,
    }
});

export default InputField;