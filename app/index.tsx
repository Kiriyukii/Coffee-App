import React, { useState } from 'react';
import { Redirect } from 'expo-router';
import useUser from '@/hooks/auth/useUser';
import { View, Text } from 'react-native';
import Loader from '@/components/loader/loader';

export default function TabsIndex() {
  const { loading, user } = useUser();
  console.log(loading);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Redirect href={!user ? '/(routes)/onboarding' : '/(tabs)/home'} />
      )}
    </>
  );
}
