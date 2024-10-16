import React, { useState } from 'react'
import {Text, Button,StyleSheet, View } from 'react-native'
export const TextComponent = ({ initialText }) => {
    const [text, setText] = useState(initialText)
  
    return (
      <View style={styles.componentContainer}>
        <Text>{text}</Text>
        <Button 
          title="Change Text" 
          onPress={() => setText(`Hello React Navtive ${new Date().toLocaleDateString()}`)}
        />
      </View>
    )
  }


  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    componentContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    tinyLogo: {
      width: 300,
      height: 300,
    },
  })