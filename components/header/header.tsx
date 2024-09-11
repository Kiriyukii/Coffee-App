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

export default function Header() {
  const { user } = useUser();
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity>
          <Image
            source={
              user?.avatar ? user.avatar : require('@/assets/icons/Unknown.png')
            }
            style={styles.image}
          />
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
      <TouchableOpacity style={styles.bellButton}>
        <View>
          <Feather name="shopping-bag" size={26} color={'white'} />
          <View style={styles.bellContainer}></View>
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
    width: 15,
    height: 15,
    backgroundColor: '#2467EC',
    position: 'absolute',
    borderRadius: 50,
    right: 0,
    top: 0,
  },

  helloText: { color: '#7C7C80', fontSize: 14 },
});
