import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import { ThemeToggle } from '@/components/ThemeToggle';

const AccountScreen = () => {
    const { user, isGuest, logout } = useUser();
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background.DEFAULT,
                    // We don't need top inset since our header handles that
                    paddingTop: 0
                }
            ]}
            edges={['bottom', 'left', 'right']}
        >
            <ScrollView style={styles.content}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Account Information
                    </Text>

                    <View style={[styles.card, {
                        backgroundColor: theme.colors.background.card,
                        borderColor: theme.colors.border.DEFAULT
                    }]}>
                        {isGuest ? (
                            <Text style={[styles.guestText, { color: theme.colors.text.muted }]}>
                                You're currently using the app as a guest
                            </Text>
                        ) : (
                            <Text style={{ color: theme.colors.text.DEFAULT }}>
                                Email: {user?.email}
                            </Text>
                        )}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Appearance
                    </Text>

                    <View style={styles.themeRow}>
                        <Text style={[styles.themeText, { color: theme.colors.text.DEFAULT }]}>
                            Theme:
                        </Text>
                        <ThemeToggle />
                    </View>
                </View>

                <Divider variant="muted" />

                <View style={styles.section}>
                    <Button
                        intent="destructive"
                        variant="outline"
                        onPress={handleLogout}
                        fullWidth
                    >
                        Log Out
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    card: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
    guestText: {
        fontStyle: 'italic',
    },
    themeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    themeText: {
        fontSize: 16,
    },
});

export default AccountScreen;