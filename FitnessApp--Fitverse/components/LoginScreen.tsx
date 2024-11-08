import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../context/authContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth() || {};  // Use fallback to handle potential null
  const navigation = useNavigation<NavigationProp<any>>();

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('HomeTabs' as never);
    } catch (error: any) {  // Cast error to any to access .message
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black px-6 space-y-8">
      <View className="w-full items-center space-y-4">
        <Text className="text-white text-5xl font-extrabold tracking-wider">
          Fitverse
        </Text>
        <Text className="text-gray-400 text-lg">Welcome back!</Text>
      </View>

      <View className="w-full space-y-4">
        <TextInput
          className="bg-gray-800/60 rounded-2xl py-4 px-6 text-white text-lg"
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-gray-800/60 rounded-2xl py-4 px-6 text-white text-lg"
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity 
        className="w-full bg-rose-500 rounded-2xl py-4 shadow-lg" 
        onPress={handleLogin}
      >
        <Text className="text-white text-lg font-bold text-center">
          LOGIN
        </Text>
      </TouchableOpacity>

      <View className="flex-row space-x-2 items-center">
        <Text className="text-gray-400 text-base">
          Don't have an Account?
        </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('SignUp' as never)}
        >
          <Text className="text-rose-500 text-base font-semibold">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
