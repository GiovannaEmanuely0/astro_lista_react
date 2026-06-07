import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Cadastro from './components/cadastro/cadastro';
import Menu from './components/tarefa/tarefa';
import Developer from './components/developer/developer';
import Perfil from './components/usuario/conta';

function CadastroScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Cadastro navigation={navigation}/>
    </View>
  );
}

function PerfilScreen() {
  return (
    <View style={styles.container}>
      <Perfil />
    </View>
  );
}

function TarefasScreen() {
  return (
    <View style={styles.container}>
      <Menu />
    </View>
  );
}

function DeveloperScreen() {
  return (
    <View style={styles.container}>
      <Developer />
    </View>
  );
}

const Drawer = createDrawerNavigator();
function AppDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Desenvolvedores">
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
      <Drawer.Screen name="Tarefas" component={TarefasScreen} />
      <Drawer.Screen name="Desenvolvedores" component={DeveloperScreen} />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="AppDrawer" component={AppDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
