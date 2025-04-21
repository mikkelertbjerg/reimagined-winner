import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from 'react-native';
import { Theme } from '@/types/theme';
import { dark } from '@/themes/dark';
import { light } from '@/themes/light';

// Storage keys
const THEME_STORAGE_KEY = 'app_theme_preference';
const MEASUREMENT_STORAGE_KEY = 'app_measurement_system';

// Settings context type
type SettingsContextType = {
    // Theme settings
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;

    // Measurement system settings
    isMetric: boolean;
    toggleMeasurementSystem: () => void;
};

// Create context with undefined initial value
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Provider props
type SettingsProviderProps = {
    initialTheme?: 'light' | 'dark' | 'system';
    children: ReactNode;
};

export const SettingsProvider = ({ initialTheme = 'system', children }: SettingsProviderProps) => {
    const colorScheme = useColorScheme();

    // Theme state
    const [isDark, setIsDark] = useState<boolean>(
        initialTheme === 'system'
            ? colorScheme === 'dark'
            : initialTheme === 'dark'
    );

    // Measurement system state (default to metric)
    const [isMetric, setIsMetric] = useState<boolean>(true);

    // Load settings from storage on mount
    useEffect(() => {
        const loadSettings = async () => {
            try {
                // Load theme preference
                const themePreference = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
                if (themePreference) {
                    if (themePreference === 'system') {
                        setIsDark(colorScheme === 'dark');
                    } else {
                        setIsDark(themePreference === 'dark');
                    }
                }

                // Load measurement system preference
                const measurementPreference = await SecureStore.getItemAsync(MEASUREMENT_STORAGE_KEY);
                if (measurementPreference) {
                    setIsMetric(measurementPreference === 'metric');
                }
            } catch (error) {
                console.error('Failed to load settings:', error);
            }
        };

        loadSettings();
    }, []);

    // Update theme when system theme changes (if set to follow system)
    useEffect(() => {
        if (initialTheme === 'system') {
            setIsDark(colorScheme === 'dark');
        }
    }, [colorScheme, initialTheme]);

    // Save theme preference when it changes
    useEffect(() => {
        const saveThemePreference = async () => {
            try {
                await SecureStore.setItemAsync(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
            } catch (error) {
                console.error('Failed to save theme preference:', error);
            }
        };

        saveThemePreference();
    }, [isDark]);

    // Save measurement system preference when it changes
    useEffect(() => {
        const saveMeasurementPreference = async () => {
            try {
                await SecureStore.setItemAsync(MEASUREMENT_STORAGE_KEY, isMetric ? 'metric' : 'imperial');
            } catch (error) {
                console.error('Failed to save measurement system preference:', error);
            }
        };

        saveMeasurementPreference();
    }, [isMetric]);

    // Toggle theme
    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    // Toggle measurement system
    const toggleMeasurementSystem = () => {
        setIsMetric(prev => !prev);
    };

    // Get current theme object
    const theme = isDark ? dark : light;

    // Context value
    const value: SettingsContextType = {
        theme,
        isDark,
        toggleTheme,
        isMetric,
        toggleMeasurementSystem,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

// Hook to use the settings context
export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);

    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }

    return context;
};

// Utility functions for common conversions
export const convertDistance = (value: number, toMetric: boolean): number => {
    if (toMetric) {
        // Miles to Kilometers
        return value * 1.60934;
    } else {
        // Kilometers to Miles
        return value * 0.621371;
    }
};

export const convertWeight = (value: number, toMetric: boolean): number => {
    if (toMetric) {
        // Pounds to Kilograms
        return value * 0.453592;
    } else {
        // Kilograms to Pounds
        return value * 2.20462;
    }
};