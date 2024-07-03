import { colors, fontSize } from '@/constants/tokens';
import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //   buttonContainer: {
  //     backgroundColor: colors.primary,
  //     width: responsiveWidth(88),
  //     height: responsiveHeight(5.5),
  //     borderRadius: 5,
  //     marginHorizontal: 5,
  //   },
  title: {
    fontSize: fontSize.lg,
    textAlign: 'center',
    fontFamily: 'SoraBold',
  },
  text: {
    fontSize: fontSize.base,
    textAlign: 'center',
    fontFamily: 'SoraRegular',
  },
  dotStyle: {
    backgroundColor: '#C6C7CC',
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDotStyle: {
    backgroundColor: '#2467Ec',
    width: responsiveWidth(2.5),
    height: responsiveWidth(2.5),
    borderRadius: 5,
    marginHorizontal: 5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    position: 'absolute',
    top: 60,
  },
});
