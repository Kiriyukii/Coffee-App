import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors, fontSize } from '@/constants/tokens';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function Button({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, { width: widthPercentageToDP(60) }]}
      onPress={onPress}
    >
      <Text style={{ color: colors.text, fontSize: fontSize.base }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    width: widthPercentageToDP(85),
    alignSelf: 'center',
    alignItems: 'center',
  },
});
