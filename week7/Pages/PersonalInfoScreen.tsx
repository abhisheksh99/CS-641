
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PersonalInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Personal Information</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PersonalInfoScreen;