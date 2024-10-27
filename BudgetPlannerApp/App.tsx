import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignUpScreen';
import { AuthContext, AuthProvider } from './src/context/authContext';


const Stack = createStackNavigator();

const AppNavigator = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) return null;

  const { user } = authContext;

  return (
    <Stack.Navigator>
      {user ? (

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      ) : (

        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
