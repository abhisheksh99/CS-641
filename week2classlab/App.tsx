import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, Image, ActivityIndicator, Button, View } from 'react-native'
import {TextComponent }from "./components/Text"
import {NumberComponent} from  "./components/Number"



export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextComponent initialText="Hello World" />
      <NumberComponent initialNumber={0} />
      
      
      <Image 
        source={{uri: "https://cdn.vox-cdn.com/thumbor/RvcSv_hd-VrlfPg8Tl_JOfhoIoU=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/19534169/171109_08_11_37_5DS_0545__1_.jpg"}} 
        style={styles.tinyLogo}
      />
    </ScrollView>
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