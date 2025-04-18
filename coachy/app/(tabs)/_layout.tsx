import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

const TabLayout = () => {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home'
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts'
        }}
      />
      <Tabs.Screen 
        name="exercises"
        options={{
          title: 'Exercises'
        }}
      />
    </Tabs>
  );
}

export default TabLayout;