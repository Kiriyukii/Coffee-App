import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';
import React from 'react';
import { useStore } from '@/store/store';
import HeaderWithTitle from '@/components/header/headerWithTitle';
import { colors, fontSize } from '@/constants/tokens';
import EmptyList from '@/components/empty/empty.list';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';

export default function CartScreen() {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const incrementQuantityHandler = (_id: string, size: string) => {
    incrementCartItemQuantity(_id, size);
    calculateCartPrice();
  };
  const decrementQuantityHandler = (_id: string, size: string) => {
    decrementCartItemQuantity(_id, size);
    calculateCartPrice();
  };
  const buttonPressHandler = () => {
    router.push('/(routes)/payments');
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
    <View style={styles.screenContainer}>
      <HeaderWithTitle title={'Cart'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={styles.scrollViewInnerView}>
          <View style={styles.itemContainer}>
            {CartList.length == 0 ? (
              <EmptyList title={'Cart is empty'} />
            ) : (
              <View style={styles.listItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity onPress={() => {}} key={data._id}>
                    <View>
                      {data.prices.length != 1 ? (
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          colors={['#252A32', '#0C0F14']}
                          style={styles.cartItemLinear}
                        >
                          <View style={styles.cartItemRow}>
                            <Image
                              source={{ uri: data.imagelink_square.url }}
                              style={styles.cartItemImage}
                            />
                            <View style={styles.cartItemInfo}>
                              <View>
                                <Text style={styles.cartItemTitle}>
                                  {data.name}
                                </Text>
                                <Text style={styles.cartItemSubtext}>
                                  {data.special_ingredient}
                                </Text>
                              </View>
                              <View style={styles.cardItemRoastedContainer}>
                                <Text style={styles.cartItemSubtext}>
                                  {data.roasted}
                                </Text>
                              </View>
                            </View>
                          </View>
                          {data.prices.map((priceData: any, index: number) => (
                            <View
                              key={index.toString()}
                              style={styles.sizeRowContainer}
                            >
                              <View style={styles.sizeValueContainer}>
                                <View style={styles.sizeBox}>
                                  <Text
                                    style={[
                                      styles.sizeText,
                                      {
                                        fontSize:
                                          data.type == 'Bean'
                                            ? fontSize.xs
                                            : fontSize.sm,
                                      },
                                    ]}
                                  >
                                    {priceData.size}
                                  </Text>
                                </View>
                                <Text style={styles.currencyText}>
                                  ${' '}
                                  <Text
                                    style={[
                                      styles.priceText,
                                      { fontSize: fontSize.sm },
                                    ]}
                                  >
                                    {priceData.price}
                                  </Text>
                                </Text>
                              </View>
                              <View style={styles.sizeValueContainer}>
                                <TouchableOpacity
                                  style={styles.cartItemIcon}
                                  onPress={() => {
                                    console.log(data);
                                    decrementQuantityHandler(
                                      data._id,
                                      priceData.size,
                                    );
                                  }}
                                >
                                  <AntDesign
                                    name="minus"
                                    size={16}
                                    color={colors.text}
                                  />
                                </TouchableOpacity>
                                <View style={styles.quantityContainer}>
                                  <Text style={styles.quantityText}>
                                    {priceData.quantity}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  style={styles.cartItemIcon}
                                  onPress={() => {
                                    incrementQuantityHandler(
                                      data._id,
                                      priceData.size,
                                    );
                                  }}
                                >
                                  <AntDesign
                                    name="plus"
                                    size={16}
                                    color={colors.text}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ))}
                        </LinearGradient>
                      ) : (
                        <LinearGradient
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 1 }}
                          colors={['#252A32', '#0C0F14']}
                          style={styles.cartSingleItemLinear}
                        >
                          <View>
                            <Image
                              source={{ uri: data.imagelink_square.url }}
                              style={styles.cartItemSingleImage}
                            />
                          </View>
                          <View style={styles.cartItemSingleInfoContainer}>
                            <View>
                              <Text style={styles.cartItemTitle}>
                                {data.name}
                              </Text>
                              <Text style={styles.cartItemSubtext}>
                                {data.special_ingredient}
                              </Text>
                              <View></View>
                            </View>
                            {data.prices.map((priceData: any) => {
                              const { _id, price, quantity, size } = priceData; // Extract relevant fields

                              return (
                                <View
                                  key={_id}
                                  style={styles.cartSingleSizeValueContainer}
                                >
                                  <View
                                    style={styles.SizeAndPriceSingleContainer}
                                  >
                                    <View style={styles.sizeBox}>
                                      <Text
                                        style={[
                                          styles.sizeText,
                                          {
                                            fontSize:
                                              data.type === 'Bean'
                                                ? fontSize.xs
                                                : fontSize.sm,
                                          },
                                        ]}
                                      >
                                        {size}
                                      </Text>
                                    </View>
                                    <Text style={styles.currencyText}>
                                      ${' '}
                                      <Text
                                        style={[
                                          styles.priceText,
                                          { fontSize: fontSize.sm },
                                        ]}
                                      >
                                        {price}
                                      </Text>
                                    </Text>
                                  </View>
                                  <View style={styles.singleQuantityContainer}>
                                    <TouchableOpacity
                                      style={styles.cartItemIcon}
                                      onPress={() => {
                                        decrementQuantityHandler(
                                          data._id,
                                          size,
                                        );
                                      }}
                                    >
                                      <AntDesign
                                        name="minus"
                                        size={16}
                                        color={colors.text}
                                      />
                                    </TouchableOpacity>
                                    <View style={styles.quantityContainer}>
                                      <Text style={styles.quantityText}>
                                        {quantity}
                                      </Text>
                                    </View>
                                    <TouchableOpacity
                                      style={styles.cartItemIcon}
                                      onPress={() => {
                                        incrementQuantityHandler(
                                          data._id,
                                          size,
                                        );
                                      }}
                                    >
                                      <AntDesign
                                        name="plus"
                                        size={16}
                                        color={colors.text}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              );
                            })}
                          </View>
                        </LinearGradient>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {CartList.length != 0 ? (
            <View style={styles.priceFooter}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceTitle}>Price</Text>
                <Text style={styles.priceText}>
                  <Text style={{ color: colors.primary }}>$ </Text> {CartPrice}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.payButton}
                onPress={() => {
                  buttonPressHandler();
                }}
              >
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 90,
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    paddingHorizontal: 20,
    gap: 20,
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
  cartItemLinear: {
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 23,
  },
  cartItemImage: {
    height: 130,
    width: 130,
    borderRadius: 16,
  },
  cartItemRow: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  cartItemInfo: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  cartItemTitle: {
    fontFamily: 'SoraRegular',
    fontSize: fontSize.sm,
    color: colors.text,
  },
  cartItemSubtext: {
    fontFamily: 'SoraRegular',
    fontSize: fontSize.xs,
    color: '#AEAEAE',
  },
  cardItemRoastedContainer: {
    height: 50,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#141921',
    borderRadius: 10,
  },
  sizeRowContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  sizeValueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  sizeBox: {
    backgroundColor: '#0C0F14',
    height: 35,
    width: 72,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontFamily: 'SoraRegular',
    fontSize: fontSize.sm,
    color: colors.text,
  },
  currencyText: {
    fontFamily: 'SoraBold',
    fontSize: fontSize.sm,
    color: colors.primary,
  },
  cartItemIcon: {
    backgroundColor: colors.primary,
    borderRadius: 7,
    padding: 8,
  },
  quantityContainer: {
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colors.primary,
    width: 50,
    height: 30,
    alignItems: 'center',
    paddingVertical: 4,
  },
  quantityText: {
    fontFamily: 'SoraBold',
    fontSize: fontSize.sm,
    color: colors.text,
  },
  cartSingleItemLinear: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 25,
  },
  cartItemSingleImage: {
    height: 150,
    width: 150,
    borderRadius: 16,
  },
  cartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  cartSingleSizeValueContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  singleQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 16,
  },
  SizeAndPriceSingleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
  },
});
