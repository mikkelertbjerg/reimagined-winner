import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useSettings } from '@/context/SettingsContext';

interface SegmentedSwitchProps {
    leftOption: string;
    rightOption: string;
    value: boolean;
    onChange: (value: boolean) => void;
    width?: number;
}

const SegmentedSwitch: React.FC<SegmentedSwitchProps> = ({
    leftOption,
    rightOption,
    value,
    onChange,
    width = 140, // Default width that works for both cases
}) => {
    const { theme } = useSettings();
    const slideAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

    // Calculate position of the selection indicator
    const switchWidth = width / 2;

    // Update animation when value changes
    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: value ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [value, slideAnim]);

    // Interpolate the animation value to create a sliding effect
    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, switchWidth],
    });

    return (
        <View
            style={[
                styles.container,
                {
                    width,
                    backgroundColor: theme.colors.background.DEFAULT,
                    borderColor: theme.colors.border.DEFAULT,
                }
            ]}
        >
            {/* Selection Indicator */}
            <Animated.View
                style={[
                    styles.selectionIndicator,
                    {
                        backgroundColor: theme.colors.primary.DEFAULT,
                        width: switchWidth,
                        transform: [{ translateX }]
                    }
                ]}
            />
            <Pressable
                style={[styles.option]}
                onPress={() => onChange(false)}
            >
                <Text
                    style={[
                        styles.optionText,
                        {
                            color: !value ? theme.colors.primary.foreground : theme.colors.text.DEFAULT,
                            fontWeight: !value ? '600' : 'normal',
                        }
                    ]}
                >
                    {leftOption}
                </Text>
            </Pressable>
            <Pressable
                style={[styles.option]}
                onPress={() => onChange(true)}
            >
                <Text
                    style={[
                        styles.optionText,
                        {
                            color: value ? theme.colors.primary.foreground : theme.colors.text.DEFAULT,
                            fontWeight: value ? '600' : 'normal',
                        }
                    ]}
                >
                    {rightOption}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 34,
        borderRadius: 17,
        borderWidth: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    selectionIndicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        height: '100%',
        borderRadius: 16,
    },
    option: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1, // Ensure text is above the indicator
    },
    optionText: {
        fontSize: 13,
        textAlign: 'center',
    },
});

export default SegmentedSwitch;