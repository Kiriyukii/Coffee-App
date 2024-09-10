import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { colors } from '@/constants/tokens';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function CoffeeDetailScreen() {
  const { item } = useLocalSearchParams();
  const coffeeData: CoffeesType = JSON.parse(item as string);
  const imageFallback = require('@/assets/images/portrait.jpg');
  const imageSource = coffeeData.imagelink_portrait?.url
    ? { uri: coffeeData.imagelink_portrait.url }
    : imageFallback;
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
              <TouchableOpacity>
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
                    color={coffeeData.favorites ? colors.primary : '#52555A'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
});
