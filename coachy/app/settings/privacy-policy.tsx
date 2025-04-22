import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '@/context/SettingsContext';

const PrivacyPolicyScreen = () => {
    const { theme } = useSettings();

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
                    Privacy Policy
                </Text>

                <Text style={[styles.lastUpdated, { color: theme.colors.text.muted }]}>
                    Last Updated: April 22, 2025
                </Text>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Introduction
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        This Privacy Policy explains how Coachy ("we", "us", or "our") collects, uses, and discloses your
                        information when you use our mobile application (the "App").
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        We respect your privacy and are committed to protecting your personal data. Please read this
                        Privacy Policy carefully to understand our practices regarding your personal data.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Information We Collect
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        When you use our App, we may collect the following types of information:
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • <Text style={styles.bold}>Account Information:</Text> When you register an account, we collect your email address.
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • <Text style={styles.bold}>Usage Data:</Text> Information about how you use the App, such as the features you use and the time spent on the App.
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • <Text style={styles.bold}>Device Information:</Text> Information about your mobile device, including device model, operating system, and unique device identifiers.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        How We Use Your Information
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        We use the information we collect to:
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Provide, maintain, and improve the App
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Authenticate your account and maintain your session
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Send you technical notices, updates, and support messages
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Monitor and analyze trends, usage, and activities in connection with the App
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Data Storage and Security
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        We use secure, encrypted storage to maintain your account information. Your personal data is
                        stored only as long as necessary to provide you with the services.
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        We implement appropriate security measures to protect against unauthorized access, alteration,
                        disclosure, or destruction of your personal data.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Your Rights
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        Depending on your location, you may have certain rights regarding your personal data, including:
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • The right to access personal data we hold about you
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • The right to request correction or deletion of your personal data
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • The right to restrict or object to our processing of your personal data
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • The right to data portability
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Contact Us
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        privacy@coachy.app
                    </Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    lastUpdated: {
        fontSize: 14,
        marginBottom: 20,
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
    bulletPoint: {
        fontSize: 16,
        marginBottom: 8,
        paddingLeft: 8,
        lineHeight: 22,
    },
    bold: {
        fontWeight: 'bold',
    },
});

export default PrivacyPolicyScreen;