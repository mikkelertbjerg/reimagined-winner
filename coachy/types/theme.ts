export type Theme = {
    colors: {
        border: {
            DEFAULT: string;
            muted: string;
            strong: string;
        };
        text: {
            DEFAULT: string;
            muted: string;
        };
        background: {
            DEFAULT: string;
            card?: string;
        };
        primary: {
            DEFAULT: string;
            foreground: string;
            hover?: string;
        };
        secondary: {
            DEFAULT: string;
            foreground: string;
            hover?: string;
        };
        tertiary: {
            DEFAULT: string;
            foreground: string;
            hover?: string;
        };
        destructive: {
            DEFAULT: string;
            foreground: string;
            hover?: string;
        };
        // Add more color tokens as needed
    };
    spacing: {
        1: number;
        2: number;
        3: number;
        4: number;
        6: number;
        // Add more spacing tokens as needed
    };
    radii: {
        sm: number;
        md: number;
        lg: number;
        // Add more radii tokens as needed
    };
    fontSizes: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        // Add more font size tokens as needed
    };
};