import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import React from 'react';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { colors, fontSize } from '@/constants/tokens';
import { TouchableOpacity } from 'react-native';
import useUser from '@/hooks/auth/useUser';
import { router } from 'expo-router';

export default function HeaderWithTitle({ title }: { title: string }) {
  const { user } = useUser();
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const imageFallback = require('@/assets/icons/Unknown.png');
  const imageSource = user?.avatar?.url
    ? { uri: user.avatar.url }
    : imageFallback;
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => {
            router.push('/(tabs)/profile');
          }}
        >
          <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={[styles.text, { fontFamily: 'SoraBold' }]}>{title}</Text>
        </View>
        <View>
          <View style={styles.bellContainer}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    width: '90%',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    fontSize: fontSize.base,
    color: colors.text,
  },
  bellButton: {
    borderWidth: 1,
    borderColor: '#E1E2E5',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },

  textWrapper: {
    flex: 1,
    alignItems: 'center',
  },

  bellContainer: {
    width: 45,
    height: 45,
    right: 0,
    top: 0,
  },

  helloText: { color: '#7C7C80', fontSize: 14 },
});
