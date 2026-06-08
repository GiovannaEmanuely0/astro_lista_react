import { StyleSheet } from "react-native";


export const styleCadastro  = StyleSheet.create({
  container:{
    flex: 1,
    padding: 0,
    backgroundColor: '#000515',
  },
  ImageBackground: {
    flex: 1, 
    width: 400,
    height: 300,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    flex: 2, 
    width: '100%',
    padding: 16,
  },
  title1: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
  title2: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#643ad1',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  botao: {
    backgroundColor: '#643ad1',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  textBotao: {
    color: '#fff',
    fontSize: 16, 
    fontWeight: 'bold',
  },
  inputContainer:{
    marginBottom: 15,
    backgroundColor: '#070d22',
    padding: 15,
    borderRadius: 10,
  },
  bold:{
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    fontSize: 20,
  },
  input: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
  },
  icon: {
    padding: 8,
  },
});
