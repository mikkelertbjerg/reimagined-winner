export type User = {
    id: string;
    email: string;
};

export type UserContextType = {
    user: User | null;
    isAuthenticated: boolean; // Track authenticated state (includes guests)
    isGuest: boolean; // Track guest state specifically
    login: (email: string) => Promise<void>;
    continueAsGuest: () => Promise<void>;
    logout: () => Promise<void>;
};