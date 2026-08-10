import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ImageBackground,
  ScrollView
} from 'react-native';

import axios from 'axios';

import { styleTarefa } from './style';

const API_URL = 'http://192.168.15.5:8000/api/tarefa';

export default function TarefasScreen() {
  const imageFundo = require('../../assets/fundo.png');

  const [tarefas, setTarefas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [tarefaExcluir, setTarefaExcluir] = useState(null);

  // Controla se o modal está criando ou editando uma tarefa
  const [editandoId, setEditandoId] = useState(null);

  // Campos do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [usuario_id, setUsuario_id] = useState('');

  // Campos do filtro
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [prioridadeFiltro, setPrioridadeFiltro] = useState("");

  // Buscar tarefas da API
  const fetchTarefas = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          busca: busca,
          categoria: categoriaFiltro,
          status: statusFiltro,
          prioridade: prioridadeFiltro
        }
      });
      console.log("TAREFAS RECEBIDAS:", JSON.stringify(response.data.tarefas, null, 2));
      setTarefas(response.data.tarefas || []);
      setCategorias(response.data.categorias || []);
    } catch (error) {
      console.log("Erro ao buscar tarefas:", error);
      setTarefas([]);
      setCategorias([]); // garante array mesmo em erro
    }
  };

  useEffect(() => {
    fetchTarefas();
  }, []);

  // Abre o modal já preenchido com os dados da tarefa clicada
  const abrirEdicao = (item) => {
    setEditandoId(item.id);
    setTitulo(item.titulo);
    setDescricao(item.descricao);
    setPrioridade(item.prioridade);
    setCategoria(item.categoria);
    setUsuario_id(item.usuario_id ? String(item.usuario_id) : '');
    setModalVisible(true);
  };

  // Abre o modal limpo para criar uma nova tarefa
  const abrirCriacao = () => {
    setEditandoId(null);
    limparFormulario(false); // não fecha o modal, só limpa os campos
    setModalVisible(true);
  };

  // Abre o modal de confirmação de exclusão
  const handleExcluir = (item) => {
    console.log(" Solicitação para excluir:", item.id);

    setTarefaExcluir(item);
    setModalExcluirVisible(true);
  };

  // Executa a exclusão depois da confirmação
  const confirmarExclusao = async () => {
    if (!tarefaExcluir) return;

    try {
      console.log("Excluindo:", tarefaExcluir.id);

      const response = await axios.delete(
        `${API_URL}/${tarefaExcluir.id}`
      );

      console.log("Resposta:", response.data);

      setModalExcluirVisible(false);
      setTarefaExcluir(null);

      await fetchTarefas();

    } catch (error) {
      console.log(
        "Erro ao excluir:",
        error.response?.data || error.message
      );
    }
  };

  // Criar ou editar
  const handleSalvar = () => {
    setLoading(true);

    if (editandoId) {
      // PUT -> só os campos que updateApi valida
      const dadosEdicao = { titulo, descricao, categoria, status: "Pendente", prioridade };
      axios.put(`${API_URL}/${editandoId}`, dadosEdicao)
        .then(() => {
          limparFormulario(true);
          fetchTarefas();
        })
        .catch((err) => {
          console.log("Erro ao editar:", err.response?.data || err.message);
          Alert.alert("Erro", err.response?.data?.message || "Não foi possível salvar as alterações.");
        })
        .finally(() => setLoading(false));
    } else {
      // POST -> pode mandar tudo, storeApi aceita via fill()
      const dadosCriacao = {
        titulo, descricao, prioridade, categoria, usuario_id,
        dataInicio: new Date().toISOString().split("T")[0],
        dataTermino: new Date().toISOString().split("T")[0],
        status: "Pendente",
      };
      axios.post(API_URL, dadosCriacao)
        .then(() => {
          limparFormulario(true);
          fetchTarefas();
        })
        .catch((err) => {
          console.log("Erro ao criar:", err.response?.data || err.message);
          Alert.alert("Erro", err.response?.data?.message || "Não foi possível criar a tarefa.");
        })
        .finally(() => setLoading(false));
    }
  };

  // fecharModal: true fecha o modal e reseta o modo de edição (usado após salvar/cancelar)
  const limparFormulario = (fecharModal = true) => {
    setTitulo(''); setDescricao(''); setPrioridade(''); setCategoria(''); setUsuario_id('');
    if (fecharModal) {
      setEditandoId(null);
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styleTarefa.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <ImageBackground source={imageFundo} resizeMode="cover" style={styleTarefa.imageBackground}>
          <Text style={styleTarefa.title1}>Minhas Tarefas</Text>
          <Text style={styleTarefa.title2}>Explore, organize e gerencie suas tarefas.</Text>
        </ImageBackground>

        <View style={styleTarefa.cardFiltros}>
          <Text style={styleTarefa.filtroTitulo}>Categoria</Text>
          <View style={styleTarefa.pickerContainer}>
            <Picker
              selectedValue={categoriaFiltro}
              onValueChange={(valor) => setCategoriaFiltro(valor)}
              dropdownIconColor="#8B5CF6"
              style={styleTarefa.picker}
            >
              <Picker.Item label="Todas as categorias" value="" />
              {categorias.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
          </View>

          <Text style={styleTarefa.filtroTitulo}>Status</Text>
          <View style={styleTarefa.pickerContainer}>
            <Picker
              selectedValue={statusFiltro}
              onValueChange={(valor) => setStatusFiltro(valor)}
              dropdownIconColor="#8B5CF6"
              style={styleTarefa.picker}
            >
              <Picker.Item label="Todos os status" value="" />
              <Picker.Item label="Pendente" value="Pendente" />
              <Picker.Item label="Em Andamento" value="Em Andamento" />
              <Picker.Item label="Concluída" value="Concluída" />
            </Picker>
          </View>

          <Text style={styleTarefa.filtroTitulo}>Prioridade</Text>
          <View style={styleTarefa.pickerContainer}>
            <Picker
              selectedValue={prioridadeFiltro}
              onValueChange={(valor) => setPrioridadeFiltro(valor)}
              dropdownIconColor="#8B5CF6"
              style={styleTarefa.picker}
            >
              <Picker.Item label="Todas as prioridades" value="" />
              <Picker.Item label="Alta" value="Alta" />
              <Picker.Item label="Média" value="Média" />
              <Picker.Item label="Baixa" value="Baixa" />
            </Picker>
          </View>

          <TouchableOpacity style={styleTarefa.botaoFiltro} onPress={fetchTarefas}>
            <Text style={styleTarefa.textBotao}>Aplicar filtros</Text>
          </TouchableOpacity>
        </View>

        <View style={styleTarefa.card}>
          {/* Adicionar tarefa */}
          <TouchableOpacity style={styleTarefa.botaoAdicionar} onPress={abrirCriacao}>
            <Text style={styleTarefa.botaoAdicionar}>
              <Text style={styleTarefa.botaoAdicionarText}>+</Text> Adicionar Tarefa
            </Text>
          </TouchableOpacity>

          {tarefas.slice().reverse().map((item) => (
            <View key={item.id.toString()} style={styleTarefa.ListItem}>
              <Text style={styleTarefa.tituloTarefa}>{item.titulo}</Text>
              <Text style={styleTarefa.descTarefa}>{item.descricao}</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity onPress={() => abrirEdicao(item)}>
                  <Text style={{ color: '#8B5CF6' }}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleExcluir(item)}>
                  <Text style={{ color: '#FF0000' }}>
                    Excluir
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styleTarefa.modalContainer}>
              <View style={styleTarefa.modalCard}>
                <Text style={styleTarefa.title}>
                  {editandoId ? 'Editar Tarefa' : 'Nova Tarefa'}
                </Text>
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
                {/* usuario_id só é usado na criação (POST); updateApi não aceita esse campo */}
                {!editandoId && (
                  <TextInput
                    style={styleTarefa.input}
                    placeholder="Digite id do usuário"
                    placeholderTextColor="#fff"
                    value={usuario_id}
                    onChangeText={setUsuario_id}
                  />
                )}
                <TouchableOpacity
                  style={styleTarefa.botao}
                  onPress={handleSalvar}
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
                  onPress={() => {
                    limparFormulario(true);
                  }}
                >
                  <Text style={styleTarefa.textBotao}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            visible={modalExcluirVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => {
              setModalExcluirVisible(false);
              setTarefaExcluir(null);
            }}
          >
            <View style={styleTarefa.modalExcluirContainer}>

              <View style={styleTarefa.modalExcluirCard}>

                <Text style={styleTarefa.modalExcluirTitulo}>
                  Excluir tarefa?
                </Text>

                <Text style={styleTarefa.modalExcluirTexto}>
                  Tem certeza que deseja excluir esta tarefa?
                </Text>

                {tarefaExcluir && (
                  <Text style={styleTarefa.modalExcluirTarefa}>
                    "{tarefaExcluir.titulo}"
                  </Text>
                )}

                <View style={styleTarefa.modalExcluirBotoes}>

                  <TouchableOpacity
                    style={styleTarefa.botaoCancelarExcluir}
                    onPress={() => {
                      setModalExcluirVisible(false);
                      setTarefaExcluir(null);
                    }}
                  >
                    <Text style={styleTarefa.textoCancelarExcluir}>
                      Cancelar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styleTarefa.botaoConfirmarExcluir}
                    onPress={confirmarExclusao}
                  >
                    <Text style={styleTarefa.textoConfirmarExcluir}>
                      Excluir
                    </Text>
                  </TouchableOpacity>

                </View>

              </View>

            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
