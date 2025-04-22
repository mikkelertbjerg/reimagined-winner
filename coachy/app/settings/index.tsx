// Save to: coachy/app/settings/index.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '@/context/SettingsContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SegmentedSwitch from '@/components/ui/SegmentedSwitch';

type SettingItemProps = {
    title: string;
    icon: string;
    value?: React.ReactNode;
    onPress?: () => void;
};

const SettingItem = ({ title, icon, value, onPress }: SettingItemProps) => {
    const { theme } = useSettings();

    return (
        <TouchableOpacity
            style={[styles.settingItem, { borderBottomColor: theme.colors.border.DEFAULT }]}
            onPress={onPress}
            disabled={!onPress}
        >
            <View style={styles.settingItemLeft}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon as any} size={22} color={theme.colors.primary.DEFAULT} />
                </View>
                <Text style={[styles.settingItemTitle, { color: theme.colors.text.DEFAULT }]}>
                    {title}
                </Text>
            </View>

            <View style={styles.settingItemRight}>
                {value}
                {onPress && (
                    <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={theme.colors.text.muted}
                        style={styles.chevron}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
};

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
    const { theme } = useSettings();

    return (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.muted }]}>
                {title}
            </Text>
            <View style={[styles.sectionContent, {
                backgroundColor: theme.colors.background.card,
                borderColor: theme.colors.border.DEFAULT
            }]}>
                {children}
            </View>
        </View>
    );
};

const SettingsScreen = () => {
    const { theme, isDark, toggleTheme, isMetric, toggleMeasurementSystem } = useSettings();
    const router = useRouter();

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: theme.colors.background.DEFAULT,
                    paddingTop: 0 // Header handles top padding
                }
            ]}
            edges={['bottom', 'left', 'right']}
        >
            <ScrollView style={styles.content}>
                <SettingsSection title="APPEARANCE">
                    <SettingItem
                        title="Theme"
                        icon="contrast-outline"
                        value={
                            <SegmentedSwitch
                                leftOption="Light"
                                rightOption="Dark"
                                value={isDark}
                                onChange={toggleTheme}
                                width={140}
                            />
                        }
                    />
                </SettingsSection>

                <SettingsSection title="PREFERENCES">
                    <SettingItem
                        title="Units"
                        icon="speedometer-outline"
                        value={
                            <SegmentedSwitch
                                leftOption="Imperial"
                                rightOption="Metric"
                                value={isMetric}
                                onChange={toggleMeasurementSystem}
                                width={140}
                            />
                        }
                    />
                </SettingsSection>

                <SettingsSection title="PRIVACY">
                    <SettingItem
                        title="Privacy Policy"
                        icon="shield-outline"
                        onPress={() => router.push('/settings/privacy-policy')}
                    />

                    <SettingItem
                        title="Terms of Service"
                        icon="document-text-outline"
                        onPress={() => router.push('/settings/terms-of-service')}
                    />

                    <SettingItem
                        title="Data & Privacy"
                        icon="lock-closed-outline"
                        onPress={() => router.push('/settings/data-privacy')}
                    />
                </SettingsSection>

                <SettingsSection title="ABOUT">
                    <SettingItem
                        title="App Version"
                        icon="information-circle-outline"
                        value={
                            <Text style={{ color: theme.colors.text.muted }}>1.0.0</Text>
                        }
                    />
                </SettingsSection>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingVertical: 16,
        flex: 1,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    sectionContent: {
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
    },
    settingItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    settingItemTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    settingItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chevron: {
        marginLeft: 8,
    }
});

export default SettingsScreen;