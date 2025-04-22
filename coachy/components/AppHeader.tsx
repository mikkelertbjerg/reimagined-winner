import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettings } from '@/context/SettingsContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
    title?: string;
    showBackButton?: boolean;
}

const AppHeader = ({ title, showBackButton = false }: AppHeaderProps) => {
    const { theme } = useSettings();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleAccountPress = () => {
        router.push('/account' as any);
    };

    const handleSettingsPress = () => {
        router.push('/settings' as any);
    };

    const handleBackPress = () => {
        router.back();
    };

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: theme.colors.background.card,
                    paddingTop: insets.top,
                }
            ]}
        >
            <View style={styles.leftContainer}>
                {showBackButton && (
                    <TouchableOpacity
                        onPress={handleBackPress}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color={theme.colors.text.DEFAULT} />
                    </TouchableOpacity>
                )}
                {title && (
                    <Text
                        style={[
                            styles.title,
                            { color: theme.colors.text.DEFAULT }
                        ]}
                    >
                        {title}
                    </Text>
                )}
            </View>

            <View style={styles.rightContainer}>
                <TouchableOpacity
                    onPress={handleSettingsPress}
                    style={styles.iconButton}
                >
                    <Ionicons name="settings-outline" size={24} color={theme.colors.primary.DEFAULT} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleAccountPress}
                    style={styles.accountButton}
                >
                    <Ionicons name="person-circle-outline" size={28} color={theme.colors.primary.DEFAULT} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 6,
        marginRight: 8,
    },
    accountButton: {
        padding: 6,
    },
});

export default AppHeader;