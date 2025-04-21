import { Theme } from "@/types/theme";

export const light: Theme = {
    colors: {
        border: {
            DEFAULT: '#e0e0e0',
            muted: '#f0f0f0',
            strong: '#d0d0d0',
        },
        text: {
            DEFAULT: '#333333',
            muted: '#757575',
        },
        background: {
            DEFAULT: '#ffffff',
            card: '#f8f8f8',
        },
        primary: {
            DEFAULT: '#2563eb', // Blue accent
            foreground: '#ffffff',
            hover: '#1d4ed8',
        },
        secondary: {
            DEFAULT: '#64748b',
            foreground: '#ffffff',
            hover: '#475569',
        },
        destructive: {
            DEFAULT: '#d32f2f',
            foreground: '#ffffff',
            hover: '#b91c1c',
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