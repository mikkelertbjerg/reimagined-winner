import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Settings",
                    // The header is already managed by the root layout
                    headerShown: false
                }}
            />
            {/* Add other settings-related screens here if needed */}
            {/* For example:
      <Stack.Screen name="privacy" options={{ title: "Privacy Settings" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      */}
        </Stack>
    );
}