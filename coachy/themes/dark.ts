import { Theme } from "@/types/theme";

export const dark: Theme = {
    colors: {
        border: {
            DEFAULT: '#2e2e2e',
            muted: '#1f1f1f',
            strong: '#3d3d3d',
        },
        text: {
            DEFAULT: '#ffffff',
            muted: '#a1a1a1',
        },
        background: {
            DEFAULT: '#121212',
            card: '#1c1c1c',
        },
        primary: {
            DEFAULT: '#e11d48', // Red accent
            foreground: '#ffffff',
            hover: '#be123c',
        },
        secondary: {
            DEFAULT: '#3f3f46', // Dark gray for secondary actions
            foreground: '#ffffff',
            hover: '#303034',
        },
        tertiary: {
            DEFAULT: '#0d9488', // Teal
            foreground: '#ffffff',
            hover: '#0f766e',
        },
        destructive: {
            DEFAULT: '#ef4444',
            foreground: '#ffffff',
            hover: '#dc2626',
        },
    },
    spacing: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
        6: 24,
    },
    radii: {
        sm: 2,
        md: 4,
        lg: 8,
    },
    fontSizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
    },
};