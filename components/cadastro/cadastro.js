//Instalar o Axios - npm install axios

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

import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {styleCadastro} from './style';

// IP do seu PC
const API_URL = 'http://192.168.15.9:8000/api/usuario'; 

const imageFundo = require('../../assets/fundo.png');
const image = {uri: 'https://img.magnific.com/fotos-premium/um-astronauta-senta-se-sozinho-numa-rocha-no-espaco-a-olhar-para-as-estrelas-e-os-planetas_1022970-50631.jpg?semt=ais_hybrid&w=740&q=80'};

export default function CadastroScreen({ navigation }) {
  // Estados para gerenciar os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  
  // Estados de controle de fluxo
  const [loading, setLoading] = useState(false);

  // Função para enviar os dados (POST)
  const handleEnviar = () => {
    // Validação simples
    // if (!nome || !email || !assunto || !mensagem) {
    //   Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
    //   return;
    // }

    setLoading(true);

    const dadosContato = {
      nome: nome,
      email: email,
      senha: senha
    };

    axios.post(API_URL, dadosContato)
      .then((response) => {
        //Alert.alert('Sucesso', 'Contato enviado com sucesso!');
        // Limpa o formulário após o envio bem-sucedido
        setNome('');
        setEmail('');
        setSenha('');
      })
      .catch((err) => {
        console.error("Erro na requisição POST Axios:", err);
        //Alert.alert('Erro', 'Não foi possível enviar o contato. Verifique a conexão.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styleCadastro.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <ImageBackground source={imageFundo} resizeMode="cover" style={styleCadastro.ImageBackground}>
            <Text style={styleCadastro.title1}>Criar</Text>
            <Text style={styleCadastro.title2}>Conta</Text>
            <Text style={styleCadastro.title}>Junte-se a nós e organize suas tarefas.</Text>
        </ImageBackground>        
        <View style={styleCadastro.card}>

          <View style={styleCadastro.inputContainer}>
            <Text style={styleCadastro.bold}>Nome:</Text>
            <TextInput 
                style={styleCadastro.input}
                placeholder="Digite seu nome"
                placeholderTextColor="#aaa" 
                value={nome}
                onChangeText={setNome}
            />
          </View>

          <View style={styleCadastro.inputContainer}>
            <Text style={styleCadastro.bold}>E-mail:</Text>
            <TextInput 
                style={styleCadastro.input}
                placeholder="exemplo@email.com"
                placeholderTextColor="#aaa" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
          </View>

          <View style={styleCadastro.inputContainer}>
            <Text style={styleCadastro.bold}>Senha:</Text>
            <TextInput 
                style={styleCadastro.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#aaa" 
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
            />
            <TouchableOpacity
                style={styleCadastro.icon}
                onPress={() => setMostrarSenha(!mostrarSenha)}
            >
            <Ionicons
                name={mostrarSenha ? 'eye-off' : 'eye'}
                size={24}
                color="#d6cfcf"
            />
            </TouchableOpacity>
          </View>  

          <TouchableOpacity 
            style={styleCadastro.botao} 
            onPress={async () => {
                await handleEnviar();   // envia os dados para a API
                navigation.replace('AppDrawer'); // depois navega para a Home/Drawer
            }}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styleCadastro.textBotao}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          <View>
            <Text style={{textAlign: 'center', color: '#949494',fontSize: 14}}>Já tem uma conta? Faça login.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

