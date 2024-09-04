import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import useUser from '@/hooks/auth/useUser';

export default function TabsLayout() {
  const { loading, user } = useUser();
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen name="home/index" />
      <Tabs.Screen name="favorites/index" />
      <Tabs.Screen name="cart/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
