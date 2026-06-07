import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Alert,
  ImageBackground
} from 'react-native';
import axios from 'axios';

import { stylePerfil } from './style';
const imageFundo = require('../../assets/fundo2.png');

export default function App() {
  return (
    <SafeAreaView style={stylePerfil.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <ImageBackground source={imageFundo} resizeMode="cover" style={stylePerfil.imageBackground}>
          <Text style={stylePerfil.title1}>Meu Perfil</Text>
          <Text style={stylePerfil.title}>Explore, organize e gerencie suas tarefas.</Text>
        </ImageBackground>
        <View style={stylePerfil.card}>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
