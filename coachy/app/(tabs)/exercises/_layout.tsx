import { Stack } from "expo-router";

const ExercisesLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Exercises", headerShown: true }} />
            <Stack.Screen name="[exercise]" />
        </Stack>
    )
}

export default ExercisesLayout;