import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Loader from '@/components/loader/loader';
import useUser from '@/hooks/auth/useUser';
import { SERVER_URI } from '@/utils/uri';
import axios from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { colors } from '@/constants/tokens';

export default function ProfileScreen() {
  const { user, loading, setRefetch } = useUser();
  const [image, setImage] = useState<any>(null);
  const [loader, setLoader] = useState(false);
  const logoutHandler = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    router.push('/(routes)/login');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setLoader(true);
      const base64Image = `data:image/jpeg;base64,${base64}`;
      setImage(base64Image);

      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      try {
        const response = await axios.put(
          `${SERVER_URI}/update-profile-picture`,
          {
            avatar: base64Image,
          },
          {
            headers: {
              'access-token': accessToken,
              'refresh-token': refreshToken,
            },
          },
        );
        if (response.data) {
          setRefetch(true);
          console.log('Profile picture updated successfully:', response.data);
        }
      } catch (error: any) {
        console.error(
          'Error updating profile picture:',
          error.response?.data || error.message,
        );
      } finally {
        setLoader(false);
      }
    }
  };
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {loader || loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={[colors.background, colors.background]}
          style={{ flex: 1, paddingTop: 80 }}
        >
          <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <View style={{ position: 'relative' }}>
                <Image
                  source={{
                    uri:
                      image ||
                      user?.avatar?.url ||
                      'https://res.cloudinary.com/dzm8tbpxf/image/upload/v1725933208/avatars/d6cwja5ketyeohqxyk83.jpg',
                  }}
                  style={{ width: 90, height: 90, borderRadius: 100 }}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 0,
                    width: 30,
                    height: 30,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={pickImage}
                >
                  <Ionicons name="camera-outline" size={25} />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                paddingTop: 10,
                color: colors.text,
                fontWeight: '600',
              }}
            >
              {user?.name}
            </Text>
            <View style={{ marginHorizontal: 16, marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 16,
                  fontFamily: 'SoraRegular',
                  color: colors.text,
                }}
              >
                Account Details
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: '#dde2ec',
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: 'center' }}
                      name="user-o"
                      size={20}
                      color={colors.text}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'SoraRegular',
                        color: colors.text,
                      }}
                    >
                      Detail Profile
                    </Text>
                    <Text
                      style={{
                        color: '#AEAEAE',
                        fontFamily: 'SoraRegular',
                      }}
                    >
                      Information Account
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={26} color={'#CBD5E0'} />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
                onPress={() => {
                  router.push('/(tabs)/favorites');
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: '#dde2ec',
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ alignSelf: 'center' }}
                      name="book-account-outline"
                      size={20}
                      color={colors.text}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'SoraRegular',
                        color: colors.text,
                      }}
                    >
                      Favorites
                    </Text>
                    <Text
                      style={{
                        color: '#AEAEAE',
                        fontFamily: 'SoraRegular',
                      }}
                    >
                      The all favorites
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={26} color={'#CBD5E0'} />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 20,
                }}
                onPress={() => logoutHandler()}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: '#dde2ec',
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <Ionicons
                      style={{ alignSelf: 'center' }}
                      name="log-out-outline"
                      size={20}
                      color={colors.text}
                    />
                  </View>
                  <TouchableOpacity onPress={() => logoutHandler()}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: 'SoraRegular',
                        color: colors.text,
                      }}
                    >
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={26} color={'#CBD5E0'} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      )}
    </>
  );
}
