import React from 'react';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="home/index" />
      <Tabs.Screen name="favorites/index" />
      <Tabs.Screen name="cart/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
