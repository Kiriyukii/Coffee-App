import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/constants/tokens';

export default function SearchInput() {
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.filteringContainer}>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchIconContainer}>
          <AntDesign name="search1" size={20} color={'#fff'} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { fontFamily: 'SoraThin' }]}
          placeholder="Find your coffee..."
          placeholderTextColor={'#52555A'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filteringContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141921',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#141921',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    paddingVertical: 10,
    width: 271,
    height: 48,
  },
});
