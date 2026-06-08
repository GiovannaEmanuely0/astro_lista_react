import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  FlatList, 
  Modal,
  StyleSheet,
  SafeAreaView,
  Alert,
  ImageBackground,
  ScrollView,
  Image
} from 'react-native';
import axios from 'axios';

import { styleDeveloper } from './style';
const num = 1;
const ImagePerfil1 = require('../../assets/astronauta.jpg');
const ImagePerfil2 = {uri: 'https://t3.ftcdn.net/jpg/15/45/41/92/360_F_1545419234_qajckdg0lPFVkWQ4pwzZzyEbRNYzFy2d.jpg'};
const ImagePerfil3 = {uri: 'https://i.etsystatic.com/49380077/r/il/f4422e/7166233513/il_fullxfull.7166233513_tp1a.jpg'};
const ImagePerfil4 = {uri: 'https://images.vexels.com/media/users/3/235233/isolated/preview/be93f74201bee65ad7f8678f0869143a-cracha-de-perfil-de-capacete-de-astronauta.png'};

// IP do seu PC
const API_URL = 'http://192.168.56.1:8000/api/admin';

export default function DeveloperScreen() {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Buscar o administrador da API
  const fetchAdmin = async () => {
    try {
      const response = await axios.get(API_URL);
      setAdmin(response.data);
    } catch (error) {
      console.log("Erro ao buscar Administrador:", error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  // Enviar novo Administrador para a API
  const handleEnviar = () => {
  setLoading(true);

  const dados = {
      nome: nome,
      email: email,
      senha: senha
  };

  console.log("===== DADOS ENVIADOS =====");
  console.log(JSON.stringify(dados, null, 2));

  axios.post(API_URL, dados)
    .then((response) => {
      console.log("===== SUCESSO =====");
      console.log("Status:", response.status);

      console.log(
        "Resposta:",
        JSON.stringify(response.data, null, 2)
      );

      setNome('');
      setEmail('');
      setSenha('');
      setModalVisible(false); // fecha o modal
      fetchAdmin();
    })
    .catch((err) => {
      console.log("===== ERRO AXIOS =====");

      if (err.response) {
        console.log("Status:", err.response.status);

        console.log(
          "Headers:",
          JSON.stringify(err.response.headers, null, 2)
        );

        console.log(
          "Data:",
          JSON.stringify(err.response.data, null, 2)
        );
      } else if (err.request) {
        console.log("Sem resposta do servidor");
        console.log(err.request);
      } else {
        console.log("Mensagem:", err.message);
      }

      console.log("Erro completo:", err);
    })
    .finally(() => {
      setLoading(false);
    });
};


  return (
    <SafeAreaView style={styleDeveloper.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, width: '100%', padding: 20 }}>
          <Text style={styleDeveloper.title}>Desenvolvedores do Astrolist</Text>
          <View style={styleDeveloper.card}>
            <TouchableOpacity 
            style={styleDeveloper.botaoAdicionar} 
            onPress={() => setModalVisible(true)}
          >
            <Text style={styleDeveloper.botaoAdicionar}><Text style={styleDeveloper.botaoAdicionarText}>+</Text> Adicionar Administrador</Text>
          </TouchableOpacity>
        </View>
        <View style={styleDeveloper.cards}>
          <FlatList
            data={admin}
            inverted
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styleDeveloper.ListItem}>
                <Image source={ImagePerfil1} style={styleDeveloper.imagemPerfil} />
                <Text style={styleDeveloper.tituloAdm}>{item.nome}</Text>
                <Text style={styleDeveloper.emailAdm}>{item.email}</Text>
              </View>
            )}
          />
        </View>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styleDeveloper.modalContainer}>
            <View style={styleDeveloper.modalCard}>
              <Text style={styleDeveloper.title}>Novo Administrador</Text>
              <TextInput
                style={styleDeveloper.input}
                placeholder="Nome"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styleDeveloper.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styleDeveloper.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
              <TouchableOpacity 
                style={styleDeveloper.botao} 
                onPress={handleEnviar}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styleDeveloper.textBotao}>Salvar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styleDeveloper.botaoX, { backgroundColor: '#FF0000' }]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styleDeveloper.textBotao}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

