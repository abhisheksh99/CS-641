// src/components/ProfileScreen.tsx
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/authContext';


const ProfileScreen = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) return null;

  const { user, logout } = authContext;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.userInfo}>Username: {user?.displayName }</Text>
      <Text style={styles.userEmail}>Email: {user?.email}</Text>
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
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProfileScreen;
