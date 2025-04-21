import { ThemeToggle } from '@/components/ThemeToggle';
import { useUser } from '@/context/UserContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen = () => {
    const { user, isGuest, logout } = useUser();

    const handleLogout = async () => {
        try {
            await logout();
            // Navigation will be handled by the AuthGuard
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Account</Text>
                <ThemeToggle />

                {user ? (
                    <>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.value}>{user.email}</Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>User ID</Text>
                            <Text style={styles.value}>{user.id}</Text>
                        </View>
                    </>
                ) : isGuest ? (
                    <View style={styles.infoContainer}>
                        <Text style={styles.guestText}>You are browsing as a guest</Text>
                    </View>
                ) : (
                    <View style={styles.infoContainer}>
                        <Text style={styles.guestText}>Not authenticated</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogout}
                >
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    infoContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        color: '#6c757d',
        marginBottom: 8,
    },
    value: {
        fontSize: 18,
    },
    guestText: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#6c757d',
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AccountScreen;