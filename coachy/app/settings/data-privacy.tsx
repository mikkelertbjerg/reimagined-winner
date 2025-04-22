import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '@/context/SettingsContext';
import { useUser } from '@/context/UserContext';
import Button from '@/components/ui/Button';

const DataPrivacyScreen = () => {
    const { theme } = useSettings();
    const { user, isGuest } = useUser();

    // These would be connected to actual user preferences in a real app
    const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
    const [personalizedContent, setPersonalizedContent] = useState(true);
    const [marketingEmails, setMarketingEmails] = useState(false);

    const handleDataExport = () => {
        Alert.alert(
            "Export Your Data",
            "We'll prepare your data export and send it to your email address. This may take up to 48 hours.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Request Export",
                    onPress: () => {
                        // In a real app, this would trigger an API call to request data export
                        Alert.alert(
                            "Export Requested",
                            "Your data export has been requested. You'll receive an email when it's ready."
                        );
                    }
                }
            ]
        );
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete Account",
                    style: "destructive",
                    onPress: () => {
                        // In a real app, this would trigger an API call to delete the account
                        Alert.alert(
                            "Request Submitted",
                            "Your account deletion request has been submitted. Your account will be deleted within 30 days."
                        );
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background.DEFAULT }
            ]}
            edges={['bottom', 'left', 'right']}
        >
            <ScrollView style={styles.content}>
                <Text style={[styles.title, { color: theme.colors.text.DEFAULT }]}>
                    Data & Privacy
                </Text>

                {isGuest ? (
                    <View style={[styles.guestContainer, { borderColor: theme.colors.border.DEFAULT }]}>
                        <Text style={[styles.guestText, { color: theme.colors.text.DEFAULT }]}>
                            You're using Coachy as a guest. Create an account to access all privacy settings and manage your data.
                        </Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                                Privacy Preferences
                            </Text>

                            <View style={[styles.settingItem, { borderBottomColor: theme.colors.border.DEFAULT }]}>
                                <View style={styles.settingTextContainer}>
                                    <Text style={[styles.settingTitle, { color: theme.colors.text.DEFAULT }]}>
                                        Usage Analytics
                                    </Text>
                                    <Text style={[styles.settingDescription, { color: theme.colors.text.muted }]}>
                                        Help us improve by sharing anonymous usage data
                                    </Text>
                                </View>
                                <Switch
                                    value={analyticsEnabled}
                                    onValueChange={setAnalyticsEnabled}
                                    trackColor={{
                                        false: theme.colors.border.DEFAULT,
                                        true: theme.colors.primary.DEFAULT
                                    }}
                                    thumbColor="#FFFFFF"
                                />
                            </View>

                            <View style={[styles.settingItem, { borderBottomColor: theme.colors.border.DEFAULT }]}>
                                <View style={styles.settingTextContainer}>
                                    <Text style={[styles.settingTitle, { color: theme.colors.text.DEFAULT }]}>
                                        Personalized Content
                                    </Text>
                                    <Text style={[styles.settingDescription, { color: theme.colors.text.muted }]}>
                                        Receive workout recommendations based on your activity
                                    </Text>
                                </View>
                                <Switch
                                    value={personalizedContent}
                                    onValueChange={setPersonalizedContent}
                                    trackColor={{
                                        false: theme.colors.border.DEFAULT,
                                        true: theme.colors.primary.DEFAULT
                                    }}
                                    thumbColor="#FFFFFF"
                                />
                            </View>

                            <View style={[styles.settingItem, { borderBottomColor: theme.colors.border.DEFAULT }]}>
                                <View style={styles.settingTextContainer}>
                                    <Text style={[styles.settingTitle, { color: theme.colors.text.DEFAULT }]}>
                                        Marketing Emails
                                    </Text>
                                    <Text style={[styles.settingDescription, { color: theme.colors.text.muted }]}>
                                        Receive updates about new features and promotions
                                    </Text>
                                </View>
                                <Switch
                                    value={marketingEmails}
                                    onValueChange={setMarketingEmails}
                                    trackColor={{
                                        false: theme.colors.border.DEFAULT,
                                        true: theme.colors.primary.DEFAULT
                                    }}
                                    thumbColor="#FFFFFF"
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                                Your Data
                            </Text>

                            <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                                You can export a copy of your data or delete your account at any time.
                            </Text>

                            <View style={styles.buttonContainer}>
                                <Button
                                    intent="secondary"
                                    variant="outline"
                                    onPress={handleDataExport}
                                    fullWidth
                                    style={styles.dataButton}
                                >
                                    Export Your Data
                                </Button>

                                <Button
                                    intent="destructive"
                                    variant="outline"
                                    onPress={handleDeleteAccount}
                                    fullWidth
                                    style={styles.dataButton}
                                >
                                    Delete Account
                                </Button>
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                                Data Storage
                            </Text>

                            <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                                Your email: {user?.email}
                            </Text>

                            <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                                Account created: April 22, 2025
                            </Text>

                            <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                                Data stored on secure servers located in the European Union. Your data is protected using industry-standard encryption.
                            </Text>
                        </View>
                    </>
                )}
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    guestContainer: {
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 24,
    },
    guestText: {
        fontSize: 16,
        lineHeight: 22,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
        lineHeight: 22,
    },
    buttonContainer: {
        marginTop: 16,
    },
    dataButton: {
        marginBottom: 12,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    settingTextContainer: {
        flex: 1,
        paddingRight: 16,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    settingDescription: {
        fontSize: 14,
    },
});

export default DataPrivacyScreen;