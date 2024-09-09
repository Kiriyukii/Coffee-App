import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri';
import Loader from '../loader/loader';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/tokens';
import { styles } from '@/styles/home/cate.style';

export default function Coffees() {
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const [coffees, setCoffees] = useState<CoffeesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  useEffect(() => {
    axios
      .get(`${SERVER_URI}/get-layout/Categories`)
      .then((res) => {
        setLoading(false);
        setCategories(res.data.layout.categories);
        fetchCoffees();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchCoffees = () => {
    axios
      .get(`${SERVER_URI}/get-coffees`)
      .then((res) => {
        setCoffees(res.data.coffees);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleCategories = (e: string) => {
    setActiveCategory(e);
    // const filterCoffees = coffees?.filter(
    //   (i: CoffeesType) => i.categories === e,
    // );
    // console.log(filterCoffees);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={[colors.background, colors.background]}
          style={{ flex: 1, marginTop: -15 }}
        >
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={[styles.categoryScrollViewItem]}
                onPress={() => handleCategories('All')}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        activeCategory === 'All'
                          ? '#D17842'
                          : colors.inActiveText,
                    },
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              {categories?.map((i: any, index: number) => (
                <TouchableOpacity
                  style={styles.categoryScrollViewItem}
                  onPress={() => handleCategories(i?.title)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color:
                          activeCategory === i?.title
                            ? '#D17842'
                            : colors.inActiveText,
                      },
                    ]}
                  >
                    {i?.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </LinearGradient>
      )}
    </>
  );
}
