import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { colors, fontSize } from '@/constants/tokens';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { useStore } from '@/store/store';
import { router } from 'expo-router';
import { Toast } from 'react-native-toast-notifications';

const imageFallback = require('@/assets/images/test.jpg');

export default function CoffeeCard({ item }: { item: CoffeesType }) {
  const [price, setPrice] = useState<{ size: string; price: number }>(
    item.prices[2],
  );

  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const HomeAddToCartHandler = ({
    _id,
    name,
    roasted,
    imagelink_portrait,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      _id,
      name,
      roasted,
      imagelink_portrait,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    Toast.show(`${name} has been add to Cart`, { type: 'success' });
  };
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const imageSource = item.imagelink_square?.url
    ? { uri: item.imagelink_square.url }
    : imageFallback;
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardLinearContainer}
      colors={['#252A32', '#0C0F14']}
    >
      <ImageBackground
        source={imageSource}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.cardRatingContainer}>
          <AntDesign name="star" size={14} color={colors.primary} />
          <Text style={styles.ratingText}>{item.average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.textTitle}>{item.name}</Text>
      <Text style={styles.subtextTitle}>{item.special_ingredient}</Text>
      <View style={styles.cardFooterRow}>
        <Text style={styles.cardCurrency}>
          $ <Text style={styles.cardPrice}>{price.price}</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            HomeAddToCartHandler({
              _id: item._id,
              name: item.name,
              roasted: item.roasted,
              imagelink_portrait: item.imagelink_portrait,
              imagelink_square: item.imagelink_square,
              special_ingredient: item.special_ingredient,
              type: item.type,
              prices: [{ ...price, quantity: 1 }],
            });
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              backgroundColor: colors.primary,
            }}
          >
            <MaterialIcons name="add" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardLinearContainer: {
    padding: 15,
    borderRadius: 25,
  },
  imageBackground: {
    width: widthPercentageToDP(32),
    height: widthPercentageToDP(32),
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
  },
  cardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(12,15,20,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 12,
    position: 'absolute',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    top: 0,
    right: 0,
  },
  ratingText: {
    fontFamily: 'SoraRegular',
    color: colors.text,
    fontSize: fontSize.xs,
    lineHeight: 22,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  textTitle: {
    fontFamily: 'SoraRegular',
    color: colors.text,
    fontSize: fontSize.sm,
  },
  subtextTitle: {
    fontFamily: 'SoraThin',
    color: colors.text,
    fontSize: fontSize.xs,
  },
  cardCurrency: {
    fontFamily: 'SoraBold',
    color: colors.primary,
    fontSize: fontSize.xs,
  },
  cardPrice: {
    fontFamily: 'SoraBold',
    color: colors.text,
    fontSize: fontSize.xs,
  },
});
