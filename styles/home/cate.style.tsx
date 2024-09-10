import { colors, fontSize } from '@/constants/tokens';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  categoryScrollViewItem: {
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  categoryText: {
    fontFamily: 'SoraRegular',
    fontSize: fontSize.sm,
    color: colors.text,
  },
  FlatlistContainer: {
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  beanTitleText: {
    fontSize: fontSize.base,
    color: colors.text,
    fontFamily: 'SoraRegular',
    marginLeft: 16,
  },
});
