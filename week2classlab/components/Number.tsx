import React, { useState } from 'react'
import {Text, Button, View,StyleSheet } from 'react-native'
export const NumberComponent = ({ initialNumber }) => {
    const [number, setNumber] = useState(initialNumber)
  
    return (
      <View style={styles.componentContainer}>
        <Text>Number: {number}</Text>
        <Button 
          title="Increment" 
          onPress={() => setNumber(prevNumber => prevNumber + 1)}
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