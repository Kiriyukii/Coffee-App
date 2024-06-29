import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@/styles/onboarding/onboard';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import { colors, fontSize } from '@/constants/tokens';
import { router } from 'expo-router';

export default function OnboardingScreen() {
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LinearGradient
      colors={[colors.primary, '#111111']}
      style={styles.container}
    >
      <View style={styles.firstContainer}>
        <View style={{ paddingBottom: 80 }}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.titleText}>
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text
            style={[
              styles.titleText,
              {
                fontSize: fontSize.sm,
                fontFamily: 'SoraThin',
                marginTop: 20,
              },
            ]}
          >
            Welcome to our cozy coffee corner, where erery cup of coffee is a
            delightful for you.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonWrapper}
          onPress={() => router.push('/(routes)/welcome')}
        >
          <Text style={[styles.titleText, { fontSize: fontSize.base }]}>
            Getting Started
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
