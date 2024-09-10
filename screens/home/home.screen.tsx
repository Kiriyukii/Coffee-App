import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { commonStyles } from '@/styles/common/common.styles';
import { colors } from '@/constants/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/components/header/header';
import SearchInput from '@/components/common/search.input';
import HomeBannerSlider from '@/components/home/home.banner.slider';
import Coffees from '@/components/coffees/coffees';

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={[colors.background, colors.background]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header />
      <ScrollView>
        <SearchInput />
        <HomeBannerSlider />
        <Coffees />
      </ScrollView>
    </LinearGradient>
  );
}
