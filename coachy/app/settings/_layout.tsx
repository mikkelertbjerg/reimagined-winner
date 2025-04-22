import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Settings",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="privacy-policy"
                options={{
                    title: "Privacy Policy",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="terms-of-service"
                options={{
                    title: "Terms of Service",
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="data-privacy"
                options={{
                    title: "Data & Privacy",
                    headerShown: false
                }}
            />
        </Stack>
    );
}