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
  ScrollView
} from 'react-native';
import axios from 'axios';

import { styleTarefa } from './style';

const API_URL = 'http://192.168.56.1:8000/api/tarefa'; 

export default function TarefasScreen() {
  const imageFundo = require('../../assets/fundo.png');

  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Campos do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [usuario_id, setUsuario_id] = useState('');

  // Buscar tarefas da API
  const fetchTarefas = async () => {
    try {
      const response = await axios.get(API_URL);
      setTarefas(response.data);
    } catch (error) {
      console.log("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  // Enviar nova tarefa
  const handleEnviar = () => {
  setLoading(true);

  const dadosContato = {
      titulo: titulo, 
      descricao: descricao, 
      dataInicio: new Date().toISOString().split("T")[0], // hoje
      dataTermino: new Date().toISOString().split("T")[0], // se permitido
      status: "Pendente",
      prioridade: prioridade, 
      categoria: categoria, 
      usuario_id: usuario_id, 
  };

  console.log("===== DADOS ENVIADOS =====");
  console.log(JSON.stringify(dadosContato, null, 2));

  axios.post(API_URL, dadosContato)
    .then((response) => {
      console.log("===== SUCESSO =====");
      console.log("Status:", response.status);

      console.log(
        "Resposta:",
        JSON.stringify(response.data, null, 2)
      );

      setTitulo('');
      setDescricao('');
      setPrioridade('');
      setCategoria('');
      setUsuario_id('');
      setModalVisible(false); // fecha o modal
      fetchTarefas();
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
    <SafeAreaView style={styleTarefa.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <ImageBackground source={imageFundo} resizeMode="cover" style={styleTarefa.imageBackground}>
          <Text style={styleTarefa.title1}>Minhas Tarefas</Text>
          <Text style={styleTarefa.title2}>Explore, organize e gerencie suas tarefas.</Text>
        </ImageBackground>

        <View style={styleTarefa.card}>
          <TouchableOpacity 
          style={styleTarefa.botaoAdicionar} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styleTarefa.botaoAdicionar}><Text style={styleTarefa.botaoAdicionarText}>+</Text> Adicionar Tarefa</Text>
        </TouchableOpacity>

        <FlatList
          data={tarefas}
          inverted
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styleTarefa.ListItem}>
              <Text style={styleTarefa.tituloTarefa}>{item.titulo}</Text>
              <Text style={styleTarefa.descTarefa}>{item.descricao}</Text>
            </View>
          )}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styleTarefa.modalContainer}>
            <View style={styleTarefa.modalCard}>
              <Text style={styleTarefa.title}>Nova Tarefa</Text>
              <TextInput
                style={styleTarefa.input}
                placeholder="Título"
                placeholderTextColor="#fff"
                value={titulo}
                onChangeText={setTitulo}
              />
              <TextInput
                style={styleTarefa.input}
                placeholder="Descrição"
                placeholderTextColor="#fff"
                value={descricao}
                onChangeText={setDescricao}
              />
              <TextInput
                style={styleTarefa.input}
                placeholder="Prioridade"
                placeholderTextColor="#fff"
                value={prioridade}
                onChangeText={setPrioridade}
              />
              <TextInput  
                style={styleTarefa.input}
                placeholder="Categoria"
                placeholderTextColor="#fff"
                value={categoria}
                onChangeText={setCategoria}
              />
              <TextInput 
                style={styleTarefa.input}
                placeholder="Digite id do usuário"
                placeholderTextColor="#fff"
                value={usuario_id}
                onChangeText={setUsuario_id}
              />
              <TouchableOpacity 
                style={styleTarefa.botao} 
                onPress={handleEnviar}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styleTarefa.textBotao}>Salvar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styleTarefa.botaoX, { backgroundColor: '#FF0000' }]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styleTarefa.textBotao}>Cancelar Tarefa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

