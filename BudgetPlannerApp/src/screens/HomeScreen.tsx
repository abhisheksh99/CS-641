
import React from 'react';
import { View, StyleSheet } from 'react-native';

import TabNavigator from '../navigation/TabNavigation';


const HomeScreen = () => {
    return (
    <View style={styles.container}>
      <TabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },

});

export default HomeScreen;
