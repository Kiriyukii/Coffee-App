import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { createRef, useRef, useState } from 'react';
import { commonStyles } from '@/styles/common/common.styles';
import { colors, fontSize } from '@/constants/tokens';
import Button from '@/components/buttons/button';
import { router } from 'expo-router';
import {
  Sora_700Bold,
  Sora_400Regular,
  Sora_200ExtraLight,
} from '@expo-google-fonts/sora';
import { useFonts } from 'expo-font';
import { widthPercentageToDP } from 'react-native-responsive-screen';

export default function VerifyAccountScreen() {
  let [fontsLoaded, fontError] = useFonts({
    SoraBold: Sora_700Bold,
    SoraRegular: Sora_400Regular,
    SoraThin: Sora_200ExtraLight,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }
  const [code, setCode] = useState(new Array(4).fill(''));

  const inputs = useRef<any>([...Array(4)].map(() => React.createRef()));

  const handleInput = (text: any, index: any) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputs.current[index + 1].current.focus();
    }

    if (text === '' && index > 0) {
      inputs.current[index - 1].current.focus();
    }
  };
  const handleSubmit = () => {};

  return (
    <View style={[commonStyles.container, { gap: 10 }]}>
      <Text style={styles.headerText}>Verification Code</Text>
      <Text style={styles.subText}>
        We have sent you verification code through your email!
      </Text>
      <View style={styles.inputContainer}>
        {code.map((_, index) => (
          <TextInput
            key={index}
            style={styles.inputBox}
            keyboardType="number-pad"
            maxLength={1}
            value={code[index]}
            ref={inputs.current[index]}
            returnKeyType="done"
            autoFocus={index === 0}
            onChangeText={(text) => handleInput(text, index)}
          ></TextInput>
        ))}
      </View>
      <View>
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text
            style={{
              color: colors.text,
              fontSize: fontSize.base,
              fontFamily: 'SoraRegular',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Redirect}>
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontFamily: 'SoraThin',
          }}
        >
          Back to?
        </Text>
        <TouchableOpacity
          onPress={() => {
            router.push('(routes)/login');
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
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: fontSize.lg,
    textAlign: 'center',
    fontFamily: 'SoraBold',
  },
  Redirect: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  subText: {
    textAlign: 'center',
    fontSize: fontSize.sm,
    fontFamily: 'SoraThin',
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  inputBox: {
    width: 45,
    height: 45,
    borderWidth: 1,
    textAlign: 'center',
    borderRadius: 8,
    borderColor: '#ddd',
    padding: 5,
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    width: widthPercentageToDP(53),
    alignSelf: 'center',
    alignItems: 'center',
  },
});
