import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { colors, fontSize } from '@/constants/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstContainer: {
    alignItems: 'center',
  },
  logo: {
    width: wp('23%'),
    height: hp('10%'),
    borderRadius: 40,
  },
  textWrapper: {
    flexDirection: 'column',
  },
  titleText: {
    color: colors.text,
    fontSize: fontSize.lg,
    textAlign: 'center',
    fontFamily: 'SoraBold',
  },
  buttonWrapper: {
    backgroundColor: colors.primary,
    marginTop: 36,
    width: wp('92%'),
    padding: 20,
    borderRadius: 20,
  },
});
