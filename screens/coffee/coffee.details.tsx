import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, fontSize } from '@/constants/tokens';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { useStore } from '@/store/store';
import Loader from '@/components/loader/loader';
import { useFocusEffect } from '@react-navigation/native';

export default function CoffeeDetailScreen() {
  const { item } = useLocalSearchParams();
  const coffeeData: CoffeesType = JSON.parse(item as string);
  const [isFavorite, setIsFavorite] = useState(coffeeData.favorites);
  const [fullDesc, setFullDesc] = useState(false);
  const [price, setPrice] = useState<{ size: string; price: number }>(
    coffeeData.prices[0],
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const imageFallback = require('@/assets/images/portrait.jpg');
  const imageSource = coffeeData.imagelink_portrait?.url
    ? { uri: coffeeData.imagelink_portrait.url }
    : imageFallback;
  const toggleFavorites = useCallback(async () => {
    try {
      const newStatus = !isFavorite;
      await axios.patch(`${SERVER_URI}/patch-coffee/${coffeeData._id}`, {
        favorites: newStatus,
      });
      setIsFavorite(newStatus);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  }, [isFavorite]);
  const addToCartHandler = ({
    _id,
    name,
    roasted,
    imagelink_portrait,
    imagelink_square,
    special_ingredient,
    type,
    price,
  }: any) => {
    addToCart({
      _id,
      name,
      roasted,
      imagelink_portrait,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{ ...price, quantity: 1 }],
    });
    calculateCartPrice();
    router.push('/cart');
  };
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.ScreenContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View>
          <ImageBackground source={imageSource} style={styles.BackgroundImage}>
            <View style={styles.headerBar}>
              <TouchableOpacity onPress={router.back}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    backgroundColor: colors.background,
                  }}
                >
                  <AntDesign name="left" size={16} color="#52555A" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFavorites}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                    backgroundColor: colors.background,
                  }}
                >
                  <AntDesign
                    name="heart"
                    size={16}
                    color={isFavorite ? colors.primary : '#52555A'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.infoOuterContainer}>
              <View style={styles.infoInnerContainer}>
                <View style={styles.infoRowContainer}>
                  <View>
                    <Text style={styles.titleText}>{coffeeData.name}</Text>
                    <Text style={styles.subtitleText}>
                      {coffeeData.special_ingredient}
                    </Text>
                  </View>
                  <View style={styles.itemPropsContainer}>
                    <View style={styles.firstProp}>
                      <FontAwesome
                        name="coffee"
                        size={24}
                        color={colors.primary}
                      />
                      <Text style={styles.firstPropText}>
                        {coffeeData.type}
                      </Text>
                    </View>
                    <View style={styles.firstProp}>
                      <Entypo name="drop" size={24} color={colors.primary} />
                      <Text style={styles.firstPropText}>
                        {coffeeData.ingredients}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.infoRowContainer}>
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={24} color={colors.primary} />
                    <Text style={styles.ratingText}>
                      {coffeeData.average_rating}
                    </Text>
                    <Text style={styles.ratingSubtext}>
                      ({coffeeData.ratings_count})
                    </Text>
                  </View>
                  <View style={styles.roastedContainer}>
                    <Text style={styles.roastedText}>{coffeeData.roasted}</Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.footerContainer}>
            <Text style={styles.infoTitle}>Description</Text>
            {fullDesc ? (
              <TouchableWithoutFeedback
                onPress={() => setFullDesc((prev) => !prev)}
              >
                <Text style={styles.descriptionText}>
                  {coffeeData.description}
                </Text>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => setFullDesc((prev) => !prev)}
              >
                <Text style={styles.descriptionText} numberOfLines={3}>
                  {coffeeData.description}
                </Text>
              </TouchableWithoutFeedback>
            )}
            <Text style={styles.infoTitle}>Size</Text>
            <View style={styles.sizeOuterContainer}>
              {coffeeData.prices.map(
                (data: { size: string; price: number }, index: number) => (
                  <TouchableOpacity
                    key={data.size}
                    style={[
                      styles.sizeBox,
                      {
                        borderColor:
                          data.size === price.size
                            ? colors.primary
                            : colors.inActiveText,
                      },
                    ]}
                    onPress={() => setPrice(data)}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        {
                          color:
                            data.size === price.size
                              ? colors.primary
                              : colors.inActiveText,
                        },
                      ]}
                    >
                      {data.size}
                    </Text>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>
        </View>
        <View style={styles.priceFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>Price</Text>
            <Text style={styles.priceText}>
              <Text style={{ color: colors.primary }}>$ </Text> {price.price}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              addToCartHandler({
                _id: coffeeData._id,
                name: coffeeData.name,
                roasted: coffeeData.roasted,
                imagelink_portrait: coffeeData.imagelink_portrait,
                imagelink_square: coffeeData.imagelink_square,
                special_ingredient: coffeeData.special_ingredient,
                type: coffeeData.type,
                price: price,
              });
            }}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  ScrollViewFlex: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  BackgroundImage: {
    width: widthPercentageToDP(100),
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  headerBar: {
    paddingTop: 50,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoOuterContainer: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(12,15,20,0.5)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  infoInnerContainer: {
    justifyContent: 'space-between',
    gap: 15,
  },
  infoRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPropsContainer: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  titleText: {
    color: colors.text,
    fontFamily: 'SoraBold',
    fontSize: fontSize.base,
    marginVertical: 8,
  },
  subtitleText: {
    color: colors.text,
    fontFamily: 'SoraThin',
    fontSize: fontSize.xs,
  },
  firstProp: {
    height: 55,
    width: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141921',
  },
  firstPropText: {
    color: colors.text,
    fontFamily: 'SoraThin',
    fontSize: fontSize.xs - 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  ratingText: {
    color: colors.text,
    fontFamily: 'SoraBold',
    fontSize: fontSize.sm,
  },
  ratingSubtext: {
    color: colors.text,
    fontFamily: 'SoraThin',
    fontSize: fontSize.xs - 2,
  },
  roastedContainer: {
    height: 55,
    width: 130,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141921',
  },
  roastedText: {
    color: colors.text,
    fontFamily: 'SoraThin',
    fontSize: fontSize.xs,
  },
  footerContainer: {
    padding: 20,
  },
  infoTitle: {
    color: '#AEAEAE',
    fontSize: fontSize.sm,
    fontFamily: 'SoraRegular',
    marginBottom: 10,
  },
  descriptionText: {
    color: colors.text,
    fontSize: fontSize.xs,
    fontFamily: 'SoraThin',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  sizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  sizeBox: {
    flex: 1,
    backgroundColor: '#141921',
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  sizeText: {
    fontFamily: 'SoraRegular',
  },
  priceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    padding: 20,
  },
  priceContainer: {
    alignItems: 'center',
    width: 100,
  },
  priceTitle: {
    color: '#AEAEAE',
    fontSize: fontSize.xs,
    fontFamily: 'SoraThin',
    marginBottom: 10,
  },
  priceText: {
    color: colors.text,
    fontSize: fontSize.base,
    fontFamily: 'SoraBold',
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: colors.primary,
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontFamily: 'SoraBold',
  },
});
