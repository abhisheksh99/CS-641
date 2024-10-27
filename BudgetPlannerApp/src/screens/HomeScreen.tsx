// src/components/HomeScreen.tsx
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/authContext';


const HomeScreen = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { user, logout } = authContext;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.email}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
