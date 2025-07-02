import React, { use, useState } from 'react';
import {SafeAreaView, ScrollView, StyleSheet,View, KeyboardAvoidingView,Platform, Image} from 'react-native';
import {TextInput, Button, Text,Card, Provider as PaperProvider, ActivityIndicator, } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function ChatScreen(){
  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([]);// histórico de mensagens
  const [carregando, setCarregando] = useState(false);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    const novaMensagem = {texto: mensagem, autor: 'usuário'};
    setMensagens((prev) => [...prev, novaMensagem]);//array com todas as mensagens
    setMensagem('');//limpando o campo de texto
    setCarregando(true);//carregamento da pagina

    try{
      const respostaApi = await axios.post('http://192.168.0.17:3000/chat', {
        mensagem: novaMensagem.texto,
      });

      const respostaEvo = {
        texto: respostaApi.data.resposta,
        autor: 'haku',
      };
      setMensagens((prev) => [...prev, respostaEvo]);
    } catch (error) {
      console.error(error);
      setMensagens((prev) => [
        ...prev,
        {texto: 'Desculpe, Evo não conseguiu responder agora.', autor: 'evo'},
      ]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <PaperProvider>

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80: 0}>

          <ScrollView contentContainerStyle={styles.chatContainer}>
            {mensagens.map((msg, index) => (
              <View
              key={index}
              style={[
                styles.mensagemContainer,
                msg.autor === 'usuário' 
                ? styles.user : styles.let,

              ]}
              >
                {msg.autor !== 'usuário' && (
                  <Image
                    source={require('../assets/logo.jpg')}
                    style={styles.avatar}
                    />
                )}
                <View 
                style={[
                  styles.mensagem,
                  msg.autor === 'usuário' ? styles.usuario : styles.evo,
                ]}>
                  <Text style={styles.textoMensagem}>{msg.texto}</Text>
                </View>
                {msg.autor === 'usuário' && (
                  <View style={styles.userAvatar}>
                    <MaterialIcons
                    name="person"
                    size={20}
                    color="#8000c9"
                    />
                    </View>
                )}
              </View>
            ))}
            {carregando && (
              <ActivityIndicator animating={true} color="#00796b" style={{marginTop: 10}} />
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChangeText={setMensagem}
            mode="outlined"
            style={styles.input}
            multiline
            />
            <Button
             mode="contained" 
            onPress={enviarMensagem} 
            disabled={carregando}
            contentStyle={styles.btn}
            style={styles.rdBtn}
            > <MaterialIcons 
            name="send" size={20} color="#fff" /> </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7e6ff',
  },
  user:{
    justifyContent:'flex-end',
  },
  let:{
    justifyContent: 'flex-start',
  },
  chatContainer: {
  paddingHorizontal: 20,
  paddingBottom: 10,
  },
  mensagemContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
  },
  mensagem: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%' , 
  },
  usuario:{
    backgroundColor: '#8000c9',
    borderTopRightRadius: 0,
  },
  evo:{
    backgroundColor: '#8000c9',
    borderTopLeftRadius:0,
  },
  textoMensagem:{
    fontSize: 16,
    color: '#fff',
  },
  avatar:{
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 6,
    backgroundColor: '#fff',
  },
  userAvatar:{
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  inputContainer:{
   flexDirection: 'row',
   alignItems: 'center',
   padding: 10,
   borderTopWidth: 1,
   borderColor: '#ccc',
   backgroundColor: '#fff'
  },
  input:{
    flex:1,
    marginBottom: 10,
    height: 55,
  },
  rdBtn:{
    marginLeft: 10,
    borderRadius: 50,
  },
});