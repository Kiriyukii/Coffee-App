import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors, fontSize } from '@/constants/tokens';
import { commonStyles } from '@/styles/common/common.styles';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { router } from 'expo-router';

export default function ForgotPassword() {
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <LinearGradient
      colors={[colors.primary, '#111111']}
      style={commonStyles.container}
    >
      <Text style={styles.headerText}>
        Enter your email to reset your password.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="support@gmail.com"
        keyboardType="email-address"
        placeholderTextColor={'#a1a1a1'}
      />
      <TouchableOpacity style={styles.buttonContainer}>
        <Text
          style={{
            color: colors.text,
            fontSize: fontSize.sm,
            fontFamily: 'SoraRegular',
          }}
        >
          Send
        </Text>
      </TouchableOpacity>
      <View style={styles.Redirect}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.text,
            fontFamily: 'SoraThin',
          }}
        >
          Back to?
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push('/(routes)/login');
          }}
        >
          <Text
            style={{
              marginLeft: 5,
              textAlign: 'center',
              color: '#4286f4',
              fontFamily: 'SoraThin',
            }}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontFamily: 'SoraBold',
    fontSize: fontSize.base,
    color: colors.text,
  },
  input: {
    paddingLeft: 10,
    height: 50,
    width: widthPercentageToDP(80),
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    width: widthPercentageToDP(80),
    alignSelf: 'center',
    alignItems: 'center',
  },
  Redirect: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});
