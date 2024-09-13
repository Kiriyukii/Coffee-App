import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontSize } from '@/constants/tokens';
import { FontAwesome5 } from '@expo/vector-icons';

interface PaymentMethodProps {
  paymentMode: string;
  name: string;
  icon: any;
  isIcon: boolean;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMode,
  name,
  icon,
  isIcon,
}) => {
  return (
    <View
      style={[
        styles.paymentCardContainer,
        { borderColor: paymentMode == name ? colors.primary : '#242A32' },
      ]}
    >
      {isIcon ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#252A32', '#0C0F14']}
          style={styles.LinearGradientWallet}
        >
          <View style={styles.walletRow}>
            <FontAwesome5 name="wallet" size={30} color={colors.primary} />
            <Text style={styles.paymentTitle}>{name}</Text>
            <Text style={styles.paymentPrice}>$ 100.50</Text>
          </View>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#252A32', '#0C0F14']}
          style={styles.LinearGradientRegular}
        >
          <Image source={icon} style={styles.paymentImage} />
          <Text style={styles.paymentTitle}>{name}</Text>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paymentCardContainer: {
    borderRadius: 25,
    backgroundColor: '#252A32',
    borderWidth: 3,
  },
  LinearGradientWallet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    paddingHorizontal: 24,
    gap: 24,
    borderRadius: 25,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  LinearGradientRegular: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 24,
    gap: 24,
    borderRadius: 25,
  },
  paymentTitle: {
    fontFamily: 'SoraRegular',
    fontSize: fontSize.sm,
    color: colors.text,
  },
  paymentPrice: {
    fontFamily: 'SoraThin',
    fontSize: fontSize.sm,
    color: '#AEAEAE',
  },
  paymentImage: {
    height: 30,
    width: 30,
  },
});

export default PaymentMethod;
