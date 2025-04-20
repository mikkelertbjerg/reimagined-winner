export type User = {
    id: string;
    email: string;
}

export type UserContextType = {
    user: User | null;
    login: (email: string) => Promise<void>;
    continueAsGuest: () => Promise<void>;
    logout: () => Promise<void>;
};