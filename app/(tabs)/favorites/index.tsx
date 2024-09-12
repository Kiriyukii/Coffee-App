import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import FavoriteScreen from '@/screens/favorites/favorite.screen';
import { colors } from '@/constants/tokens';
import { LinearGradient } from 'expo-linear-gradient';
import HeaderWithTitle from '@/components/header/headerWithTitle';

export default function Favorites() {
  return <FavoriteScreen />;
}
