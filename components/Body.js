import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Constants from 'expo-constants';

const Body = props => {

    return(
      <View>
        <Text>{props.text}</Text>
        <Button title={props.titulo}></Button>
      </View>
      
    )
  }


export default Body;