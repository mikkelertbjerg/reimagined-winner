import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';

import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import InputField from '@/components/ui/InputField';
import LinkText from '@/components/ui/LinkText';
import ExitConfirmation from '@/components/ExitConfirmation';
import { useSettings } from '@/context/SettingsContext';

const AuthScreen = () => {
    const { login, continueAsGuest } = useUser();
    const { theme } = useSettings();

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    // Keyboard event listeners - platform-specific to prevent flickering
    useEffect(() => {
        // Use different event names based on platform
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(showEvent, () => {
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleLogin = async () => {
        if (!email.trim() || !validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            await login(email);
            // Navigation will be handled by the AuthGuard
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleContinueAsGuest = async () => {
        setIsLoading(true);

        try {
            await continueAsGuest();
            // Success will be handled by AuthGuard navigation
        } catch (err) {
            setError('Failed to continue as guest. Please try again.');
            console.error('Guest login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: theme.colors.background.DEFAULT }
        ]}>
            {/* Exit confirmation - without logout option since we're not logged in */}
            <ExitConfirmation showLogoutOption={false} />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header with Background - Always shown but adjusted for keyboard */}
                    <View style={[
                        styles.header,
                        { backgroundColor: theme.colors.primary.DEFAULT },
                        keyboardVisible && styles.headerCompact
                    ]}>
                        <Text style={[
                            styles.headerTitle,
                            { color: theme.colors.primary.foreground },
                            keyboardVisible && styles.headerTitleCompact
                        ]}>
                            Welcome Back
                        </Text>
                        {!keyboardVisible && (
                            <Text style={[
                                styles.headerSubtitle,
                                { color: theme.colors.primary.foreground }
                            ]}>
                                Sign in to continue
                            </Text>
                        )}
                    </View>

                    {/* Form Section */}
                    <View style={[
                        styles.formContainer
                    ]}>
                        {/* Email Input using our InputField component */}
                        <InputField
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            error={error}
                            size="md"
                        />

                        <Button
                            intent="primary"
                            size="md"
                            fullWidth
                            disabled={isLoading}
                            loading={isLoading}
                            onPress={handleLogin}
                        >
                            Login
                        </Button>

                        <View style={{ marginVertical: theme.spacing[4] }}>
                            <Divider text="OR" variant="strong" />
                        </View>

                        <Button
                            intent="primary"
                            variant='outline'
                            size="md"
                            fullWidth
                            loading={isLoading}
                            onPress={handleContinueAsGuest}
                        >
                            Continue without an account
                        </Button>
                    </View>

                    {/* Registration option with visibility control */}
                    <View style={[
                        styles.registerContainer,
                        keyboardVisible && { opacity: 0, height: 0, margin: 0 }
                    ]}>
                        <Text style={[
                            styles.registerText,
                            { color: theme.colors.text.muted, fontSize: theme.fontSizes.sm }
                        ]}>
                            Don't have an account?{' '}
                        </Text>
                        <LinkText
                            onPress={() => {/* Handle registration */ }}
                            variant="primary"
                            bold
                            style={{ fontSize: theme.fontSizes.sm }}
                        >
                            Register here
                        </LinkText>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    header: {
        padding: 24,
        paddingTop: 48,
        paddingBottom: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerCompact: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    headerTitleCompact: {
        fontSize: 22,
        marginBottom: 0,
    },
    headerSubtitle: {
        fontSize: 16,
        opacity: 0.8,
    },
    formContainer: {
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderRadius: 8,
    },
    registerContainer: {
        marginTop: 24,
        marginBottom: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        textAlign: 'center',
    }
});

export default AuthScreen;