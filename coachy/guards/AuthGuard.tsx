import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useUser } from '@/context/UserContext';

type AuthGuardProps = {
    children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
    const { isAuthenticated } = useUser();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const inAuthGroup = segments[0] === 'auth';

        if (!isAuthenticated && !inAuthGroup) {
            // If not authenticated and not on auth screen, redirect to auth
            router.replace('/auth');
        } else if (isAuthenticated && inAuthGroup) {
            // If authenticated and on auth screen, redirect to home
            router.replace('/');
        }
    }, [isAuthenticated, segments]);

    return <>{children}</>;
};

export default AuthGuard;