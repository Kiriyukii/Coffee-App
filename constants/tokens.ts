import { heightPercentageToDP } from 'react-native-responsive-screen';

export const colors = {
  primary: '#D17842',
  background: '#0C0F14',
  text: '#ffffff',
  inActiveText: '#52555A',
  icon: '#ffffff',
  maximumTrackTintColor: 'rgba(255,255,255,0.4)',
  minimumTrackTintColor: 'rgba(255,255,255,0.6)',
};

export const fontSize = {
  xs: heightPercentageToDP('1.5%'),
  sm: heightPercentageToDP('2%'),
  base: heightPercentageToDP('2.5%'),
  lg: heightPercentageToDP('4%'),
};

export const screenPadding = {
  horizontal: 24,
};
