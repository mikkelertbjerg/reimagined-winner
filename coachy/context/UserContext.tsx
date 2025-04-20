import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, UserContextType } from '../types/user';

// Create the context with initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Storage keys
const USER_STORAGE_KEY = 'app_user_data';
const GUEST_STORAGE_KEY = 'app_guest_mode';

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isGuest, setIsGuest] = useState<boolean>(false);

    // Derived state
    const isAuthenticated = Boolean(user) || isGuest;

    // Load user data from storage on mount
    useEffect(() => {
        const loadUserFromStorage = async () => {
            try {
                // Check for user data
                const userDataString = await SecureStore.getItemAsync(USER_STORAGE_KEY);
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    setUser(userData);
                }

                // Check for guest status
                const guestStatus = await SecureStore.getItemAsync(GUEST_STORAGE_KEY);
                setIsGuest(guestStatus === 'true');
            } catch (error) {
                console.error('Failed to load user data:', error);
            }
        };

        loadUserFromStorage();
    }, []);

    // Save user data to storage whenever it changes
    useEffect(() => {
        const saveUserToStorage = async () => {
            try {
                if (user) {
                    await SecureStore.setItemAsync(USER_STORAGE_KEY, JSON.stringify(user));
                } else {
                    await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
                }
            } catch (error) {
                console.error('Failed to save user data:', error);
            }
        };

        saveUserToStorage();
    }, [user]);

    // Save guest status to storage whenever it changes
    useEffect(() => {
        const saveGuestStatus = async () => {
            try {
                await SecureStore.setItemAsync(GUEST_STORAGE_KEY, String(isGuest));
            } catch (error) {
                console.error('Failed to save guest status:', error);
            }
        };

        saveGuestStatus();
    }, [isGuest]);

    const login = async (email: string) => {
        try {
            // In a real app, you'd call your API to handle authentication here
            const newUser: User = {
                id: Date.now().toString(), // In a real app, this would come from your backend
                email,
            };

            setUser(newUser);
            setIsGuest(false); // Ensure guest mode is off when logging in
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const continueAsGuest = async () => {
        try {
            // Set guest mode to true and clear any user data
            setUser(null);
            setIsGuest(true);
        } catch (error) {
            console.error('Continue as guest error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Clear all auth data
            setUser(null);
            setIsGuest(false);
            await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
            await SecureStore.deleteItemAsync(GUEST_STORAGE_KEY);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const value = {
        user,
        isAuthenticated,
        isGuest,
        login,
        continueAsGuest,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};