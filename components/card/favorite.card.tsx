import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fontSize } from '@/constants/tokens';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SERVER_URI } from '@/utils/uri';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function FavoriteCard({ item }: { item: FavoriteType }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const imageFallback = require('@/assets/images/portrait.jpg');
  const imageSource = item.imagelink_portrait?.url
    ? { uri: item.imagelink_portrait.url }
    : imageFallback;

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await axios.get(
          `${SERVER_URI}/get-coffee/${item._id}`,
        );
        setIsFavorite(response.data.favorites);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavoriteStatus();
  }, [item._id]);
  const toggleFavorites = async () => {
    try {
      const newStatus = !isFavorite;
      await axios.patch(`${SERVER_URI}/patch-coffee/${item._id}`, {
        favorites: newStatus,
      });
      setIsFavorite(newStatus);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };
  return (
    <View style={styles.CardContainer}>
      <View>
        <ImageBackground source={imageSource} style={styles.BackgroundImage}>
          <View style={styles.headerBar}>
            <TouchableOpacity onPress={toggleFavorites}>
              <View></View>
            </TouchableOpacity>
          </View>
          <View style={styles.infoOuterContainer}>
            <View style={styles.infoInnerContainer}>
              <View style={styles.infoRowContainer}>
                <View>
                  <Text style={styles.titleText}>{item.name}</Text>
                  <Text style={styles.subtitleText}>
                    {item.special_ingredient}
                  </Text>
                </View>
                <View style={styles.itemPropsContainer}>
                  <View style={styles.firstProp}>
                    <FontAwesome
                      name="coffee"
                      size={24}
                      color={colors.primary}
                    />
                    <Text style={styles.firstPropText}>{item.type}</Text>
                  </View>
                  <View style={styles.firstProp}>
                    <Entypo name="drop" size={24} color={colors.primary} />
                    <Text style={styles.firstPropText}>{item.ingredients}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.infoRowContainer}>
                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={24} color={colors.primary} />
                  <Text style={styles.ratingText}>{item.average_rating}</Text>
                  <Text style={styles.ratingSubtext}>
                    ({item.ratings_count})
                  </Text>
                </View>
                <View style={styles.roastedContainer}>
                  <Text style={styles.roastedText}>{item.roasted}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#252A32', '#0C0F14']}
        style={styles.containerLinear}
      >
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  BackgroundImage: {
    width: widthPercentageToDP(100),
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
    flex: 1,
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
  containerLinear: { gap: 10, padding: 20, paddingBottom: 90 },
  descriptionTitle: {
    color: '#AEAEAE',
    fontFamily: 'SoraBold',
    fontSize: fontSize.sm,
  },
  descriptionText: {
    color: colors.text,
    letterSpacing: 0.5,
    fontFamily: 'SoraThin',
    fontSize: fontSize.sm - 2,
  },
  CardContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
});
