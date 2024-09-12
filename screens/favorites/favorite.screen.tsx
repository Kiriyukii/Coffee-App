import { Platform, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { SERVER_URI } from '@/utils/uri';
import axios from 'axios';
import HeaderWithTitle from '@/components/header/headerWithTitle';
import { colors } from '@/constants/tokens';
export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<CoffeesType[] | BeansType[]>([]);
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const [coffeesData, beansData] = await Promise.all([
          axios.get(`${SERVER_URI}/get-favorite-coffees`),
          axios.get(`${SERVER_URI}/get-favorite-beans`),
        ]);
        const coffees = coffeesData.data.coffees || [];
        const beans = beansData.data.beans || [];
        const combinedList = [...coffees, ...beans];
        setFavorites(combinedList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, [favorites]);

  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.screenContainer}>
      <HeaderWithTitle title={'Favorites'} />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
});
