import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { colors, fontSize } from '@/constants/tokens';

export default function EmptyList({ title }: { title: string }) {
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.emptyContainer}>
      <LottieView
        style={styles.lottieStyle}
        source={require('../../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text style={styles.lottieText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  lottieStyle: {
    height: 300,
  },
  lottieText: {
    fontFamily: 'SoraRegular',
    fontSize: fontSize.sm,
    color: colors.primary,
    textAlign: 'center',
  },
});
