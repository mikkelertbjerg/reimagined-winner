import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';

export const ThemeToggle = () => {
    const { isDark, toggleTheme, theme } = useThemeContext();

    return (
        <TouchableOpacity
            onPress={toggleTheme}
            style={[
                styles.toggle,
                {
                    backgroundColor: theme.colors.background.card,
                    borderColor: theme.colors.border.DEFAULT,
                }
            ]}
        >
            <View style={styles.content}>
                <Text
                    style={{
                        color: theme.colors.text.DEFAULT,
                        fontSize: theme.fontSizes.sm,
                    }}
                >
                    {isDark ? '🌙 Dark' : '☀️ Light'}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toggle: {
        padding: 10,
        borderRadius: 4,
        borderWidth: 1,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});