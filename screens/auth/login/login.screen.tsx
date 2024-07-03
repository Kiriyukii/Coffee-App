import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
  useFonts,
} from '@expo-google-fonts/sora';
import { colors, fontSize } from '@/constants/tokens';
import { commonStyles } from '@/styles/common/common.styles';
import { Entypo, Fontisto } from '@expo/vector-icons';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [isPasswordVisible, setIspasswordVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [required, setRequired] = useState('');
  const [error, setError] = useState({
    password: '',
  });
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Image
            style={styles.signInImage}
            source={require('@/assets/images/logo.png')}
          />
          <Text
            style={[
              styles.welcomeText,
              { fontFamily: 'SoraRegular', paddingTop: 20 },
            ]}
          >
            Welcome Back!
          </Text>
          <Text style={[styles.smallText, { fontFamily: 'SoraThin' }]}>
            Login to your existing account of CoffeeMall
          </Text>
          <View style={styles.inputContainer}>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  gap: 10,
                  paddingLeft: 20,
                },
              ]}
            >
              <Fontisto name="email" size={18} color="black" />
              <TextInput
                keyboardType="email-address"
                placeholder="support@gmail.com"
                placeholderTextColor="#cccccc"
                value={userInfo.email}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, email: value })
                }
              />
              {required && (
                <View style={commonStyles.errorContainer}>
                  <Entypo name="cross" size={18} color={'red'} />
                </View>
              )}
            </View>
            <View
              style={[
                styles.input,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  gap: 10,
                  paddingLeft: 20,
                },
              ]}
            >
              <Fontisto name="locked" size={18} color="black" />
              <TextInput
                style={{ flex: 1 }}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                placeholder="Password"
                placeholderTextColor="#cccccc"
                value={userInfo.password}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, password: value })
                }
              />
              <TouchableOpacity
                style={{ paddingRight: 20 }}
                onPress={() => setIspasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Entypo name="eye" size={18} color="black" />
                ) : (
                  <Entypo name="eye-with-line" size={18} color="black" />
                )}
              </TouchableOpacity>
              {error.password && (
                <View style={[commonStyles.errorContainer, { top: 145 }]}>
                  <Entypo name="cross" size={18} color={'red'} />
                  <Text style={{ color: 'red', fontSize: 11, marginTop: -1 }}>
                    {error.password}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push('/(routes)/forgot-password');
              }}
            >
              <Text
                style={[
                  styles.forgotText,
                  { fontFamily: 'SoraThin', marginTop: -10 },
                ]}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: colors.primary,
              borderRadius: 8,
              paddingVertical: 15,
              width: widthPercentageToDP(85),
              alignSelf: 'center',
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                textAlign: 'center',
                color: colors.text,
                fontFamily: 'SoraThin',
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
          <View style={styles.signupRedirect}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.text,
                fontFamily: 'SoraThin',
              }}
            >
              Don't have account yet?
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push('(routes)/sign-up');
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
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 600,
  },
  welcomeText: {
    color: colors.text,
    fontSize: fontSize.lg,
    textAlign: 'center',
    fontFamily: 'SoraBold',
  },
  smallText: {
    textAlign: 'center',
    color: colors.text,
    fontSize: fontSize.sm,
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 20,
  },
  input: {
    height: 50,
    width: widthPercentageToDP(85),
    marginHorizontal: 16,
    borderRadius: 8,
    fontSize: fontSize.base,
    backgroundColor: 'white',
    color: '#A1A1A1',
  },

  forgotText: {
    marginHorizontal: 16,
    textAlign: 'right',
    fontSize: 16,
    color: colors.text,
    marginTop: 10,
  },
  signupRedirect: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
});
