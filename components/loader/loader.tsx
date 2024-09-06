import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedLoader from 'react-native-animated-loader';
import { colors } from '@/constants/tokens';

export default function Loader() {
  return (
    <LinearGradient
      colors={[colors.background, colors.background]}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <AnimatedLoader
        visible={true}
        overlaycolor="rbga(255,255,255,0.75)"
        source={require('@/assets/animation/coffeeloading.json')}
        animationStyle={{ width: 250, height: 250 }}
        speed={1.5}
      />
    </LinearGradient>
  );
}
