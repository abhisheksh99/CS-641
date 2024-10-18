import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import RefreshControlExample from './components/RefreshControlExample';
import VirtualList from './components/VirtualList';
import FlatListExample from './components/FlatList';
import SectionListExample from './components/SectionList';
import ModalExample from './components/Modal';

export default function App() {
  const [displayText, setDisplayText] = useState('Press or long press the button!');
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = () => {
    setDisplayText('Button pressed!');
  };

  const handleLongPress = () => {
    setDisplayText('Button long pressed!');
  };

  const handleHoverIn = () => {
    setIsHovered(true);
    setDisplayText('Button hovered!');
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    setDisplayText('Press or long press the button!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <RefreshControlExample />
      </View>
      
      <View style={styles.section}>
        <Text>{displayText}</Text>
        <Pressable 
          style={styles.button}
          onPress={handlePress} 
          onLongPress={handleLongPress}
          delayLongPress={2000}
          onHoverIn={handleHoverIn}
          onHoverOut={handleHoverOut}
        >
          <Text style={[styles.buttonText, isHovered && styles.hoveredText]}>Press Me</Text>
        </Pressable>
      </View>
      
      <View style={styles.section}>
        <FlatListExample />
      </View>
      
      <View style={styles.section}>
        <SectionListExample />
      </View>
      
      <View style={styles.section}>
        <ModalExample />
      </View>
      
      <View style={styles.section}>
        <VirtualList />
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  hoveredText: {
    color: 'yellow',
  },
});