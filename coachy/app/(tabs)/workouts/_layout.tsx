import { Stack } from "expo-router";

const WorkoutsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Workouts", headerShown: false }} />
            <Stack.Screen name="[workout]" />
        </Stack>
    )
}

export default WorkoutsLayout;