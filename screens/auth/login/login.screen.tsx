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
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri';
import { Toast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [isPasswordVisible, setIspasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
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
  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacter.test(password)) {
      setError({
        ...error,
        password: 'Write at least one special character',
      });
      setUserInfo({ ...userInfo, password: '' });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: 'Write at least one number',
      });
      setUserInfo({ ...userInfo, password: '' });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: 'Write at least 6 characters',
      });
      setUserInfo({ ...userInfo, password: '' });
    } else {
      setError({
        ...error,
        password: '',
      });
      setUserInfo({ ...userInfo, password: value });
    }
  };
  const handleSignIn = async () => {
    await axios
      .post(`${SERVER_URI}/login`, {
        email: userInfo.email,
        password: userInfo.password,
      })
      .then(async (res) => {
        await AsyncStorage.setItem('access_token', res.data.accessToken);
        await AsyncStorage.setItem('refresh_token', res.data.refreshToken);
        router.push('/(tabs)/home');
      })
      .catch((error) => {
        Toast.show('Email or password is incorrect', { type: 'danger' });
      });
  };

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
                  paddingLeft: 20,
                },
              ]}
            >
              <Fontisto name="email" size={18} color="black" />
              <TextInput
                style={[styles.input, { width: widthPercentageToDP(70) }]}
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
                  paddingLeft: 20,
                },
              ]}
            >
              <Fontisto name="locked" size={18} color="black" />
              <TextInput
                style={[
                  styles.input,
                  { width: widthPercentageToDP(70), flex: 1 },
                ]}
                keyboardType="default"
                defaultValue=""
                secureTextEntry={!isPasswordVisible}
                placeholder="Password"
                placeholderTextColor="#cccccc"
                onChangeText={handlePasswordValidation}
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
                <View style={[commonStyles.errorContainer, { top: 55 }]}>
                  <Entypo name="cross" size={18} color={'red'} />
                  <Text style={{ color: 'red', fontSize: 11, marginTop: -1 }}>
                    {error.password}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push('/(routes)/forgotPassword');
              }}
            >
              <Text
                style={[
                  styles.forgotText,
                  { fontFamily: 'SoraThin', marginTop: 10 },
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
            onPress={handleSignIn}
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
                router.push('/(routes)/signUp');
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
    fontSize: fontSize.sm,
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
