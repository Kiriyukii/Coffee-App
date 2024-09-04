import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);
  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      await axios
        .get(`${SERVER_URI}/me`, {
          headers: {
            'access-token': accessToken,
            'refresh-token': refreshToken,
          },
        })
        .then((res) => {
          console.log(res.data.user);
        })
        .catch((error) => {
          console.log(error, 'error');
        });
    };
    subscription();
  }, []);
  return { loading, user };
}
