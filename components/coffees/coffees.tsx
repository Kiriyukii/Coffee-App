import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
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
import CoffeeCard from '../card/coffee.card';
import BeanCard from '../card/bean.card';
import { router } from 'expo-router';

export default function Coffees() {
  const [coffees, setCoffees] = useState<CoffeesType[]>([]);
  const [originalCoffees, setOriginalCoffees] = useState<CoffeesType[]>([]);
  const [beans, setBeans] = useState<BeansType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    axios
      .get(`${SERVER_URI}/get-layout/Categories`)
      .then((res) => {
        setCategories(res.data.layout.categories);
        fetchCoffees();
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${SERVER_URI}/get-beans`)
      .then((res) => {
        setBeans(res.data.beans);
        fetchBeans();
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
        setOriginalCoffees(res.data.coffees);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const fetchBeans = () => {
    axios
      .get(`${SERVER_URI}/get-beans`)
      .then((res) => {
        setBeans(res.data.beans);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const handleCategories = (e: string) => {
    setActiveCategory(e);
    if (e === 'All') {
      setCoffees(originalCoffees);
    } else {
      const filterCoffees = originalCoffees.filter(
        (i: CoffeesType) => i.categories === e,
      );
      setCoffees(filterCoffees);
    }
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={[colors.background, colors.background]}
          style={{ flex: 1, marginTop: -15 }}
        >
          {/* ScrollView coffee */}
          <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                key="All"
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
                  key={i?.title || index}
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
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={coffees}
            contentContainerStyle={styles.FlatlistContainer}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: '/(routes)/coffee-details',
                      params: { item: JSON.stringify(item) },
                    })
                  }
                >
                  <CoffeeCard item={item} />
                </TouchableOpacity>
              );
            }}
          />
          {/* Scroll view Bean */}
          <Text style={styles.beanTitleText}>Coffee Beans</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={beans}
            contentContainerStyle={[
              styles.FlatlistContainer,
              { marginBottom: 90 },
            ]}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity>
                  <BeanCard item={item} />
                </TouchableOpacity>
              );
            }}
          />
        </LinearGradient>
      )}
    </>
  );
}
