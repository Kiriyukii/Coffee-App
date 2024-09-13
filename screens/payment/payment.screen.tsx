import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { colors, fontSize } from '@/constants/tokens';
import HeaderWithTitle from '@/components/header/headerWithTitle';
import { router, useLocalSearchParams } from 'expo-router';
import {
  AntDesign,
  Fontisto,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import PaymentMethod from '@/components/payment/payment.method';
import { useStore } from '@/store/store';
import PopUpAnimation from '@/components/animation/pop.animation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../../assets/images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../../assets/images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../../assets/images/amazonpay.png'),
    isIcon: false,
  },
];

export default function PaymentScreen() {
  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const setCartList = useStore((state: any) => state.setCartList);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const { amount } = useLocalSearchParams();
  const [showAnimation, setShowAnimation] = useState(false);
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
    } catch (e) {
      console.error('Failed to clear AsyncStorage:', e);
    }
  };

  const clearPersistedState = () => {
    useStore.persist.clearStorage();
    console.log('Persisted state cleared');
  };

  const clearCartList = () => {
    setCartList([]);
  };

  const handleClearStorage = () => {
    clearPersistedState();
    clearAsyncStorage();
    clearCartList();
  };
  const buttonPressHandler = () => {
    setShowAnimation(true),
      calculateCartPrice(),
      setTimeout(() => {
        setShowAnimation(false);
        router.push('/(tabs)');
        handleClearStorage();
      }, 2000);
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
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={router.back}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#252A32', '#0C0F14']}
            style={{
              height: 30,
              width: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.inActiveText,
            }}
          >
            <AntDesign name="left" size={16} color="#52555A" />
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.titleText}>Payments</Text>
        <View style={styles.emptyView}></View>
      </View>
      {showAnimation ? (
        <PopUpAnimation
          style={styles.lottieAnimation}
          source={require('../../lottie/successful.json')}
        />
      ) : (
        <></>
      )}
      <ScrollView
        style={styles.scrollViewFlex}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}
          >
            <View
              style={[
                styles.creditCardContainer,
                {
                  borderColor:
                    paymentMode == 'Credit Card' ? colors.primary : '#242A32',
                },
              ]}
            >
              <Text style={styles.creditCardTitle}>Credit Card</Text>
              <View style={styles.creaditCardBackground}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={['#252A32', '#0C0F14']}
                  style={styles.LinearGradientStyle}
                >
                  <View style={styles.creditCardRow}>
                    <MaterialCommunityIcons
                      name="credit-card-chip"
                      size={40}
                      color={colors.primary}
                    />
                    <Fontisto name="visa" size={26} color={colors.text} />
                  </View>
                  <View style={styles.creditCardNumberContainer}>
                    <Text style={styles.creditCardNumber}>1234</Text>
                    <Text style={styles.creditCardNumber}>1234</Text>
                    <Text style={styles.creditCardNumber}>1234</Text>
                    <Text style={styles.creditCardNumber}>1234</Text>
                  </View>
                  <View style={styles.creditCardRow}>
                    <View style={styles.creditCardNameContainer}>
                      <Text style={styles.creditCardNameSubtitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.creditCardNameTitle}>
                        Loren Ipsum
                      </Text>
                    </View>
                    <View style={styles.creditCardDateContainer}>
                      <Text style={styles.creditCardNameSubtitle}>
                        Expiry Date
                      </Text>
                      <Text style={styles.creditCardNameTitle}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}
            >
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.priceFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price</Text>
          <Text style={styles.priceText}>
            <Text style={{ color: colors.primary }}>$ </Text> {amount}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => {
            buttonPressHandler();
          }}
        >
          <Text style={styles.buttonText}>{`Pay with ${paymentMode}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  lottieAnimation: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: 'SoraBold',
    fontSize: fontSize.base,
    color: colors.text,
  },
  emptyView: {
    height: 36,
    width: 36,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  paymentOptionsContainer: {
    gap: 15,
    padding: 15,
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
  creditCardContainer: {
    padding: 10,
    gap: 10,
    borderRadius: 25,
    borderWidth: 3,
  },
  creditCardTitle: {
    fontFamily: 'SoraRegular',
    fontSize: fontSize.sm,
    color: colors.text,
    marginLeft: 10,
  },
  creaditCardBackground: {
    backgroundColor: '#252A32',
    borderRadius: 25,
  },
  LinearGradientStyle: {
    borderRadius: 15,
    gap: 36,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  creditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditCardNumberContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  creditCardNumber: {
    fontFamily: 'SoraBold',
    fontSize: fontSize.sm,
    color: colors.text,
    letterSpacing: 4,
  },
  creditCardNameSubtitle: {
    fontFamily: 'SoraRegular',
    fontSize: fontSize.xs,
    color: '#AEAEAE',
  },
  creditCardNameTitle: {
    fontFamily: 'SoraBold',
    fontSize: fontSize.sm,
    color: colors.text,
  },
  creditCardNameContainer: {
    alignItems: 'flex-start',
  },
  creditCardDateContainer: {
    alignItems: 'flex-end',
  },
});
