import {
  ActivityIndicator,
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
import React, { useRef, useState } from 'react';
import { commonStyles } from '@/styles/common/common.styles';
import { colors, fontSize } from '@/constants/tokens';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { Fontisto, Entypo, AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-notifications';

export default function SignUpScreen() {
  const [isPasswordVisible, setIspasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [error, setError] = useState({
    password: '',
  });
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
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
  const handleSignUp = async () => {
    setButtonSpinner(true);
    await axios
      .post(`${SERVER_URI}/registration`, {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      })
      .then(async (res) => {
        const stringToken = JSON.stringify(res.data.activationToken);
        await AsyncStorage.setItem('activation_token', stringToken);
        Toast.show(res.data.message, { type: 'success' });
        setUserInfo({
          name: '',
          email: '',
          password: '',
        });
        setButtonSpinner(false);
        router.push('/(routes)/verifyAccount');
      })
      .catch((error) => {
        console.log(error);
        setButtonSpinner(false);
        Toast.show('Email already exist', { type: 'danger' });
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
            Let's get started!
          </Text>
          <Text style={[styles.smallText, { fontFamily: 'SoraThin' }]}>
            Create an account to CoffeeMall to enjoy your day!
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
              <AntDesign name="user" size={18} color="black" />
              <TextInput
                style={[styles.input, { width: widthPercentageToDP(70) }]}
                keyboardType="default"
                placeholder="Name"
                placeholderTextColor="#cccccc"
                value={userInfo.name}
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, name: value })
                }
              />
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
          </View>
          <TouchableOpacity
            style={{
              marginTop: 30,
              backgroundColor: colors.primary,
              borderRadius: 8,
              paddingVertical: 15,
              width: widthPercentageToDP(85),
              alignSelf: 'center',
            }}
            onPress={handleSignUp}
          >
            {buttonSpinner ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.text,
                  fontFamily: 'SoraThin',
                }}
              >
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.signupRedirect}>
            <Text
              style={{
                textAlign: 'center',
                color: colors.text,
                fontFamily: 'SoraThin',
              }}
            >
              Already have an account?
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
    rowGap: 10,
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
  inputBox: {
    width: '100%',
    height: 40,
    backgroundColor: '#f5f5f5',
    borderColor: '#cccccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
function setError(arg0: any) {
  throw new Error('Function not implemented.');
}
