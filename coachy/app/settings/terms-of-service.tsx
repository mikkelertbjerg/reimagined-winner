import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '@/context/SettingsContext';

const TermsOfServiceScreen = () => {
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
                    Terms of Service
                </Text>

                <Text style={[styles.lastUpdated, { color: theme.colors.text.muted }]}>
                    Last Updated: April 22, 2025
                </Text>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Agreement to Terms
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        By accessing or using the Coachy mobile application ("App"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the App.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Use License
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        Permission is granted to temporarily download and use the App for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Modify or copy the materials
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Use the materials for any commercial purpose
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Attempt to decompile or reverse engineer any software contained in the App
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Remove any copyright or other proprietary notations from the materials
                    </Text>
                    <Text style={[styles.bulletPoint, { color: theme.colors.text.DEFAULT }]}>
                        • Transfer the materials to another person or "mirror" the materials on any other server
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        User Accounts
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        When you create an account with us, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account and password, and for restricting access to your device.
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any breach of security or unauthorized use of your account.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Content
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        Any content you create, upload, or share through the App remains your property. However, by uploading content, you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, modify, publicly display, and distribute such content in connection with our services.
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        You are solely responsible for the content you share and must ensure that you have all necessary rights to that content.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Disclaimer
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        The App is provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        We do not warrant that the App will function uninterrupted, that defects will be corrected, or that the App is free of viruses or other harmful components.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Limitation of Liability
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        In no event shall Coachy, its officers, directors, employees, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages whatsoever, arising out of or in connection with your use of the App.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Governing Law
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        These Terms shall be governed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Changes to Terms
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on the App. You are advised to review these Terms periodically for any changes.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.colors.text.DEFAULT }]}>
                        Contact Us
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        If you have any questions about these Terms, please contact us at:
                    </Text>
                    <Text style={[styles.paragraph, { color: theme.colors.text.DEFAULT }]}>
                        terms@coachy.app
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

export default TermsOfServiceScreen;