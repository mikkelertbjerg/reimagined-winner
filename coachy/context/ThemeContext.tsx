import { Theme } from "@/types/theme";
import { dark } from "@/themes/dark";
import { light } from "@/themes/light";
import { createContext, ReactNode, useState, useEffect, useContext } from "react";
import { useColorScheme } from "react-native";

type ThemeContextType = {
    theme: Theme;
    isDark: boolean;
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
type ThemeProviderProps = {
    initialTheme?: 'light' | 'dark' | 'system';
    children: ReactNode;
};

export const ThemeProvider = ({ initialTheme = 'system', children }: ThemeProviderProps) => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState<boolean>(
        initialTheme === 'system'
            ? colorScheme === 'dark'
            : initialTheme === 'dark'
    );

    // Update theme when system theme changes
    useEffect(() => {
        if (initialTheme === 'system') {
            setIsDark(colorScheme === 'dark');
        }
    }, [colorScheme, initialTheme]);

    // Toggle theme function
    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    // Set specific theme
    const setTheme = (theme: 'light' | 'dark') => {
        setIsDark(theme === 'dark');
    };

    // Get current theme
    const theme = isDark ? dark : light;

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook to use the theme
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context.theme;
};

// Hook to access full theme context (including toggle functions)
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};