import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSettings } from '@/context/SettingsContext';
import ExitConfirmation from '@/components/ExitConfirmation';

const TabLayout = () => {
  const { theme } = useSettings();

  return (
    <>
      <ExitConfirmation
        showLogoutOption={true}
        message="Do you want to logout and exit?"
      />

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
    </>
  );
};

export default TabLayout;