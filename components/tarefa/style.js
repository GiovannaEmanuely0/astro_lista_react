import { StyleSheet } from "react-native";

export const styleTarefa  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000515',
    padding: 0,
  },
  imageBackground: {
    flex: 1, 
    width: 400,
    height: 300,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    flex: 9, 
    width: '100%',
    padding: 16,
  },
  botaoAdicionar:{
    backgroundColor: '#643ad1',
    padding: 10,
    borderRadius: 5,
  },
  ListItem:{
    backgroundColor: '#070d22',
    padding: 15,
    marginVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#643ad1',
    borderRadius: 10,
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard:{
    width: '80%',
    backgroundColor: '#070d22',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#643ad1',
  },
  botao:{
    backgroundColor: '#643ad1',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoX:{
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    color: '#fff',
    marginTop: 10,
  },
  textBotao:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoAdicionarText:{
    backgroundColor: '#000515',
    color: '#fff',
    paddingHorizontal: 5,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 30,
  },
  tituloTarefa:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#643ad1',
    marginBottom: 5,
  },
  descTarefa:{
    fontSize: 14,
    color: '#949494',
  },
  input:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#643ad1',
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#643ad1',
    marginBottom: 20,
    textAlign: 'center',
  },
  title1:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#643ad1',
    marginBottom: 10,
  },
  title2:{
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cardFiltros:{
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
  },
  filtroContainer: {
    backgroundColor: '#131A2C',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },
  filtroBusca: {
    backgroundColor: '#0A0E1A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#EEF1F8',
    fontSize: 14,
    marginBottom: 15,
  },
  filtroTitulo: {
    color: '#9AA4BF',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 8,
  },
  pickerContainer: {
    backgroundColor: '#0A0E1A',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  botaoFiltro: {
    backgroundColor: '#411d9c',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#8B5CF6',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  textBotao: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  picker: {
    color: '#C7CEDB',
    backgroundColor: '#0A0E1A',
    height: 50,
    border: 5,
  },
  modalExcluirContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
},

modalExcluirCard: {
  width: '85%',
  backgroundColor: '#1E1B2E',
  borderRadius: 20,
  padding: 25,
  alignItems: 'center',
},

modalExcluirTitulo: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#FFFFFF',
  marginBottom: 12,
},

modalExcluirTexto: {
  fontSize: 15,
  color: '#CCCCCC',
  textAlign: 'center',
  marginBottom: 10,
},

modalExcluirTarefa: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#8B5CF6',
  textAlign: 'center',
  marginBottom: 25,
},

modalExcluirBotoes: {
  flexDirection: 'row',
  gap: 12,
  width: '100%',
},

botaoCancelarExcluir: {
  flex: 1,
  padding: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#666',
  alignItems: 'center',
},

textoCancelarExcluir: {
  color: '#FFFFFF',
  fontWeight: 'bold',
},

botaoConfirmarExcluir: {
  flex: 1,
  padding: 12,
  borderRadius: 10,
  backgroundColor: '#FF0000',
  alignItems: 'center',
},

textoConfirmarExcluir: {
  color: '#FFFFFF',
  fontWeight: 'bold',
},
});
