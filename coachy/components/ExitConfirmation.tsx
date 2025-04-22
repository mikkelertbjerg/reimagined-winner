import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { useUser } from '@/context/UserContext';
import { useRouter, useSegments } from 'expo-router';
import Dialog from './ui/Dialog';

type ExitConfirmationProps = {
    onExit?: () => void;
    showLogoutOption?: boolean;
    message?: string;
    title?: string;
};

/**
 * A component that handles app exit confirmation but only at the root level.
 * Uses Expo Router's segments to know where we are in the navigation hierarchy.
 */
const ExitConfirmation: React.FC<ExitConfirmationProps> = ({
    onExit,
    showLogoutOption = false,
    message = "Are you sure you want to exit the app?",
    title = "Exit App",
}) => {
    const { logout } = useUser();
    const [dialogVisible, setDialogVisible] = useState(false);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        const backAction = () => {
            // Check if we're at the root tab level - that's when we want to show the exit dialog
            // The segments array structure when at root tabs will be ['(tabs)', 'index'] or similar
            const isAtRootLevel =
                segments.length > 0 &&
                segments[0] === '(tabs)' &&
                !segments.some(segment => segment.includes('[') || segment.includes(']'));

            if (isAtRootLevel) {
                setDialogVisible(true);
                return true; // Prevent default back behavior
            }

            // Otherwise, let the system handle back navigation
            if (router.canGoBack()) {
                router.back();
                return true;
            }

            return false; // Let system handle back if we can't
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [segments, router]);

    const handleCancel = () => {
        setDialogVisible(false);
    };

    const handleExit = () => {
        setDialogVisible(false);
        BackHandler.exitApp();
        if (onExit) onExit();
    };

    const handleLogout = async () => {
        setDialogVisible(false);
        try {
            await logout();
            if (onExit) onExit();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const buttons = showLogoutOption
        ? [
            {
                text: "Cancel",
                onPress: handleCancel,
                intent: "secondary" as const,
                variant: "outline" as const,
            },
            {
                text: "Logout",
                onPress: handleLogout,
                intent: "destructive" as const,
            },
        ]
        : [
            {
                text: "Cancel",
                onPress: handleCancel,
                intent: "secondary" as const,
                variant: "outline" as const,
            },
            {
                text: "Exit",
                onPress: handleExit,
                intent: "destructive" as const,
            },
        ];

    return (
        <Dialog
            visible={dialogVisible}
            title={title}
            message={message}
            buttons={buttons}
            onDismiss={handleCancel}
        />
    );
};

export default ExitConfirmation;