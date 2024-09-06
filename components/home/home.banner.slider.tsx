import { View, Text, Image } from 'react-native';
import React from 'react';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { styles } from '@/styles/home/banner.style';
import Swiper from 'react-native-swiper';
import { BannerData } from '@/constants/constants';

export default function HomeBannerSlider() {
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
      <Swiper
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay={true}
        autoplayTimeout={5}
      >
        {BannerData.map((item: BannerDataTypes, index: number) => (
          <View key={index} style={styles.slide}>
            <Image
              source={item.bannerImageUrl!}
              style={{ width: 450, height: 250 }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}
