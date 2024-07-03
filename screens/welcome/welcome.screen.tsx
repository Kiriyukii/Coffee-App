import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
  useFonts,
} from '@expo-google-fonts/sora';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/tokens';
import AppIntroSlider from 'react-native-app-intro-slider';
import { OnBoadingSwiperData } from '@/constants/constants';
import { router } from 'expo-router';
import { commonStyles } from '@/styles/common/common.styles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export default function WelcomeScreen() {
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const renderItem = ({ item }: { item: onBoardingSwiperDataType }) => (
    <LinearGradient
      colors={[colors.primary, '#111111']}
      style={{ flex: 1, paddingHorizontal: 16 }}
    >
      <View style={{ marginTop: 80 }}>
        <Image
          source={item.image}
          style={{ alignSelf: 'center', height: 300, width: 300 }}
        />
        <Text style={[commonStyles.title, { color: 'white' }]}>
          {item.title}
        </Text>
      </View>
      <View style={{ paddingTop: 24 }}>
        <Text style={commonStyles.text}>{item.description}</Text>
      </View>
    </LinearGradient>
  );
  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={OnBoadingSwiperData}
      onDone={() => {
        router.push('/(routes)/login');
      }}
      onSkip={() => {
        router.push('/(routes)/login');
      }}
      renderNextButton={() => (
        <View style={styles.buttonContainer}>
          <Text style={commonStyles.text}>Next</Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.buttonContainer}>
          <Text style={commonStyles.text}>Done</Text>
        </View>
      )}
      dotStyle={commonStyles.dotStyle}
      activeDotStyle={commonStyles.activeDotStyle}
      showSkipButton={false}
      bottomButton={true}
    />
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    width: responsiveWidth(88),
    height: responsiveHeight(5),
    borderRadius: 5,
    marginHorizontal: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
});
