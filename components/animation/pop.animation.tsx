import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { colors } from '@/constants/tokens';

interface PopUpAnimationProps {
  style: any;
  source: any;
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({ style, source }) => {
  return (
    <View style={styles.LottieAnimationContainer}>
      <LottieView style={style} source={source} autoPlay loop={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  LottieAnimationContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
  },
});
export default PopUpAnimation;
