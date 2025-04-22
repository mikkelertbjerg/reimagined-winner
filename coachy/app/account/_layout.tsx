import { Stack } from "expo-router";

export default function AccountLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Your Account",
                    // The header is already managed by the root layout
                    headerShown: false
                }}
            />
        </Stack>
    );
}