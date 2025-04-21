import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    BackHandler,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@/context/UserContext';
import { useThemeContext } from '@/context/ThemeContext';
import Button from '@/components/ui/Button';
import Divider from '@/components/ui/Divider';
import LinkText from '@/components/ui/LinkText';
import InputField from '@/components/ui/InputField';

const AuthScreen = () => {
    const { login, continueAsGuest } = useUser();
    const { theme } = useThemeContext();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Back handler for the auth screen
    useEffect(() => {
        const backAction = () => {
            Alert.alert(
                "Exit App",
                "Are you sure you want to exit the app?",
                [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "Exit",
                        onPress: () => BackHandler.exitApp()
                    }
                ],
                { cancelable: true }
            );
            return true; // Prevent default back behavior
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
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
            // Navigation will be handled by the AuthGuard
        } catch (err) {
            setError('Failed to continue as guest. Please try again.');
            console.error(err);
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flex}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Header with Background */}
                    <View style={[
                        styles.header,
                        { backgroundColor: theme.colors.primary.DEFAULT }
                    ]}>
                        <Text style={[
                            styles.headerTitle,
                            { color: theme.colors.primary.foreground }
                        ]}>
                            Welcome Back
                        </Text>
                        <Text style={[
                            styles.headerSubtitle,
                            { color: theme.colors.primary.foreground }
                        ]}>
                            Sign in to continue
                        </Text>
                    </View>

                    {/* Form Section */}
                    <View style={[
                        styles.formContainer,
                        {
                            backgroundColor: theme.colors.background.card,
                            borderColor: theme.colors.border.DEFAULT,
                            borderRadius: theme.radii.lg,
                            padding: theme.spacing[4],
                            marginTop: -theme.spacing[6]
                        }
                    ]}>
                        {/* Email Input using our FormInput component */}
                        <InputField
                            label="Email"
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            error={error}
                        />

                        {/* Forgot Password - using LinkText */}
                        <View style={styles.forgotPasswordContainer}>
                            <LinkText
                                onPress={() => {/* Handle forgot password */ }}
                                variant="primary"
                                bold
                            >
                                Forgot password?
                            </LinkText>
                        </View>

                        {/* Login Button */}
                        <Button.Root onPress={handleLogin} disabled={isLoading}>
                            <Button.Element
                                intent="primary"
                                size="lg"
                                fullWidth
                                disabled={isLoading}
                            >
                                <Button.Content>
                                    {isLoading ? (
                                        <Button.Spinner color={theme.colors.primary.foreground} />
                                    ) : (
                                        <Button.Text size="lg">Login</Button.Text>
                                    )}
                                </Button.Content>
                            </Button.Element>
                        </Button.Root>

                        {/* Divider */}
                        <View style={{ marginVertical: theme.spacing[4] }}>
                            <Divider.Root>
                                <Divider.Separator variant="muted" />
                                <Divider.Text variant="muted">OR</Divider.Text>
                                <Divider.Separator variant="muted" />
                            </Divider.Root>
                        </View>

                        {/* Continue as Guest Button */}
                        <Button.Root onPress={handleContinueAsGuest} disabled={isLoading}>
                            <Button.Element
                                intent="secondary"
                                variant="outline"
                                size="lg"
                                fullWidth
                                disabled={isLoading}
                            >
                                <Button.Content>
                                    <Button.Text intent="secondary" variant="outline" size="lg">
                                        Continue as Guest
                                    </Button.Text>
                                </Button.Content>
                            </Button.Element>
                        </Button.Root>
                    </View>

                    {/* Register Link - using LinkText with custom rendering */}
                    <View style={styles.registerContainer}>
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
    },
    header: {
        padding: 24,
        paddingTop: 48,
        paddingBottom: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        opacity: 0.8,
    },
    formContainer: {
        marginHorizontal: 16,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    registerContainer: {
        marginTop: 24,
        marginBottom: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        textAlign: 'center',
    }
});

export default AuthScreen;