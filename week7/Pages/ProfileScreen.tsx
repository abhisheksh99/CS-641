
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Profile Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
        color="#841584"
      />
      <Button
        title="Open Drawer"
        onPress={() => navigation.navigate("Deatils")}
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffe4e1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 10,  
    width: '100%',  
  },
});

export default ProfileScreen;