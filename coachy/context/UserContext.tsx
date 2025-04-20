import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User, UserContextType } from '@/types/User';

// Create the context with initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Storage key
const USER_STORAGE_KEY = 'app_user_data';

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user data from storage on mount
    useEffect(() => {
        const loadUserFromStorage = async () => {
            try {
                const userDataString = await SecureStore.getItemAsync(USER_STORAGE_KEY);
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    setUser(userData);
                }
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

    const login = async (email: string) => {
        try {
            // In a real app, you'd call your API to handle authentication here
            // This is just a simplified example
            const newUser: User = {
                id: Date.now().toString(), // In a real app, this would come from your backend
                email,
            };

            setUser(newUser);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const continueAsGuest = async () => {
        try {
            // Guest users simply have a null user value
            // We don't need to create a User object since guests don't have an email
            setUser(null);

            // Make sure we clear any existing user data in storage
            await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
        } catch (error) {
            console.error('Continue as guest error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Clear user data
            setUser(null);
            await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const value = {
        user,
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