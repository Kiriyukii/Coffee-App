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
import { Feather } from '@expo/vector-icons';
import { useStore } from '@/store/store';
import { router } from 'expo-router';

export default function Header() {
  const { user } = useUser();
  const CartList = useStore((state: any) => state.CartList);
  const cartLength = CartList.length;
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
        <View>
          <Text style={[styles.helloText, { fontFamily: 'SoraBold' }]}>
            Hello,
          </Text>
          <Text style={[styles.text, { fontFamily: 'SoraBold' }]}>
            {user?.name}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bellButton}
        onPress={() => {
          router.push('/(tabs)/cart');
        }}
      >
        <View>
          <Feather name="shopping-bag" size={26} color={'white'} />
          <View style={styles.bellContainer}>
            <Text
              style={{ color: '#fff', fontSize: 14, fontFamily: 'SoraBold' }}
            >
              {cartLength}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    width: '90%',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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

  bellIcon: {
    alignSelf: 'center',
  },

  bellContainer: {
    width: 20,
    height: 20,
    backgroundColor: colors.primary,
    position: 'absolute',
    borderRadius: 50,
    right: -3,
    top: -3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  helloText: { color: '#7C7C80', fontSize: 14 },
});
