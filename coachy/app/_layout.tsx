import { SettingsProvider } from '@/context/SettingsContext';
import { UserProvider } from '@/context/UserContext';
import AuthGuard from '@/guards/AuthGuard';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import AppHeader from '@/components/AppHeader';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Prepare app resources and check initial auth state
    const prepare = async () => {
      try {
        // You can load fonts, assets, etc. here
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };

    prepare();
  }, []);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <UserProvider>
          <AuthGuard>
            <Stack
              screenOptions={{
                header: (props) => {
                  if (props.route.name === 'auth') {
                    return null;
                  }

                  // For other screens, use custom header with title
                  return (
                    <AppHeader
                      title={props.options.title || ''}
                      showBackButton={!['(tabs)'].includes(props.route.name)}
                    />
                  );
                },
                // Configure the header shadow - matches design system better
                headerShadowVisible: false,
                // Add consistent background color
                headerStyle: {
                  backgroundColor: '#FFFFFF',
                },
              }}
            >
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="auth"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="+not-found"
                options={{ title: "Oops!" }}
              />
            </Stack>
          </AuthGuard>
          <StatusBar style="auto" />
        </UserProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}