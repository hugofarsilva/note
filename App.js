import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Body from './components/Body'

const App = () => {

  const [state, setState] = useState('read')
  const [note, setNote] = useState('')
  
  useEffect(()=>{

    //Quando inicializar o app queremos que leia a key anotacao.

    (async () => {
        try{
            const anotacaoLeitura = await AsyncStorage.getItem('note');
            setNote(anotacaoLeitura);
        }catch(error){}
    })();

},[])


setData = async() => {
    try{
        await AsyncStorage.setItem('note',note);
    }catch(error){

    }

    alert('Sua anotação foi salva!');
}

  function textUpdate() {
    setState('read');
    setData();
  }

  if(state == 'read'){
    return(
      <View style = {styles.container}>
        <View style = {styles.header}>
          <Text style = {styles.textHeader}>Minhas Anotações</Text>
        </View>

        {
        (note != '')?
        <View style = {{padding: 20}}>
          <Text style = {styles.note}>{note}</Text>
          <Text></Text>
        </View>
        :
        <View style = {{padding: 20, opacity: 0.3}}>
          <Text>Nenhuma anotação encontrada!</Text>
        </View>
        }

        <TouchableOpacity onPress={() => setState('updating')} style = {styles.btnNote}>
          {
          (note == '')?
          <Text style = {styles.btnAddNote}>+</Text>
          :
          <Text style = {{color: 'white'}}>Editar</Text>
          }
        </TouchableOpacity>

      </View>
    );
  }else if(state == 'updating'){
    return(
      <View style = {styles.container}>
        <View style = {styles.header}>
          <Text style = {styles.textHeader}>Minhas Anotações</Text>
        </View>

        <TextInput onChangeText={(text) => setNote(text)}
          autoFocus = {true}
          style = {styles.setNoteStyle} 
          multiline = {true} 
          value = {note}>
        </TextInput>

        <TouchableOpacity onPress={() => textUpdate()} style = {styles.btnSaveNote}>
          <Text style = {{color: 'white'}}>Salvar</Text>
        </TouchableOpacity>

      </View>
    );
  }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight
    },

    header: {
      width: '100%',
      padding: 10,
      backgroundColor: '#069'
    },

    textHeader: {
      textAlign: 'center',
      fontSize: 18,
      color: 'white'
    },

    note: {
      fontSize: 14,
      textAlign: 'justify'
    },

    btnNote: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 50,
      height: 50,
      backgroundColor: '#069',
      borderRadius: 25,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

    },

    btnAddNote: {
      color: 'white',
      fontSize: 30, 
    },

    btnSaveNote: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      backgroundColor: '#069',
      width: 100,
      height: 50,
      borderRadius: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    setNoteStyle: {
      padding: 20,
      textAlignVertical: 'top',
      height: 300,
    }
  });

export default App;