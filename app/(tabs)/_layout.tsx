import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '@/constants/tokens';
import { Image, StyleSheet } from 'react-native';
import useUser from '@/hooks/auth/useUser';

export default function TabsLayout() {
  const { user } = useUser();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'index') {
            iconName = require('@/assets/icons/Home.png');
          } else if (route.name === 'favorites/index') {
            iconName = require('@/assets/icons/Favorites.png');
          } else if (route.name === 'cart/index') {
            iconName = require('@/assets/icons/Cart.png');
          } else if (route.name === 'profile/index') {
            iconName = user?.avatar || require('@/assets/icons/User.png');
          }
          return (
            <Image
              style={{ width: 20, height: 20, tintColor: color }}
              source={iconName}
            />
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyles,
        tabBarActiveTintColor: colors.primary,
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cart/index" />
      <Tabs.Screen name="favorites/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyles: {
    height: 80,
    position: 'absolute',
    backgroundColor: colors.background,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
});
