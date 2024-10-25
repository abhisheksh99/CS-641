import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the Details Screen</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate('Home')}
        color="#841584"
      />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
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
    backgroundColor: '#e6e6fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default DetailsScreen;