import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useUser } from '@/context/UserContext';
import { useTheme } from '@/context/ThemeContext';

const TabLayout = () => {
  const theme = useTheme();
  const { logout } = useUser();

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Do you want to logout and exit?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          {
            text: "Logout",
            onPress: async () => {
              try {
                await logout();
                // AuthGuard will handle redirection to auth screen
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }
          }
        ],
        { cancelable: true }
      );
      return true; // Prevent default back behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [logout]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary.DEFAULT,
        tabBarInactiveTintColor: theme.colors.text.muted,
        tabBarStyle: {
          backgroundColor: theme.colors.background.card,
          borderTopColor: theme.colors.border.DEFAULT,
        },
        headerShown: false, // We're using our custom header from the root layout
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="rocket-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pulse-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercises',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;