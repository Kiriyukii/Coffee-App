import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
import EmptyList from '@/components/empty/empty.list';
import FavoriteCard from '@/components/card/favorite.card';
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
    const intervalId = setInterval(fetchFavorites, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

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
      <View style={{ flex: 1, marginBottom: 90 }}>
        {favorites.length == 0 ? (
          <EmptyList title={'No Favorites'} />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={favorites}
            contentContainerStyle={styles.FlatlistContainer}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => {}}>
                  <FavoriteCard item={item} />
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  FlatlistContainer: {
    gap: 20,
  },
});
