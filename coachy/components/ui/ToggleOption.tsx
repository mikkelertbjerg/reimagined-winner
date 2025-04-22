import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { useSettings } from '@/context/SettingsContext';

interface ToggleOptionProps {
    leftLabel: string;
    rightLabel: string;
    value: boolean;
    onChange: (value: boolean) => void;
    width?: number;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({
    leftLabel,
    rightLabel,
    value,
    onChange,
    width = 120, // Default width that works for both cases
}) => {
    const { theme } = useSettings();

    return (
        <View style={[styles.container, { width }]}>
            <TouchableOpacity
                style={[
                    styles.option,
                    {
                        backgroundColor: !value
                            ? theme.colors.primary.DEFAULT
                            : 'transparent',
                        borderColor: theme.colors.border.DEFAULT,
                        borderRightWidth: 0.5,
                    },
                ]}
                onPress={() => onChange(false)}
            >
                <Text
                    style={[
                        styles.optionText,
                        {
                            color: !value
                                ? theme.colors.primary.foreground
                                : theme.colors.text.muted,
                            fontWeight: !value ? '600' : 'normal',
                        },
                    ]}
                >
                    {leftLabel}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.option,
                    {
                        backgroundColor: value
                            ? theme.colors.primary.DEFAULT
                            : 'transparent',
                        borderColor: theme.colors.border.DEFAULT,
                        borderLeftWidth: 0.5,
                    },
                ]}
                onPress={() => onChange(true)}
            >
                <Text
                    style={[
                        styles.optionText,
                        {
                            color: value
                                ? theme.colors.primary.foreground
                                : theme.colors.text.muted,
                            fontWeight: value ? '600' : 'normal',
                        },
                    ]}
                >
                    {rightLabel}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 36,
        borderRadius: 8,
        overflow: 'hidden',
    },
    option: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
        borderWidth: 1,
    },
    optionText: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default ToggleOption;