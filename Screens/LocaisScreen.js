import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Linking, Image } from 'react-native';
import { Provider as PaperProvider, Text, Card, Button, TextInput } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import dados from '../Dados/Locais.json';

export default function App(){
    const { hospitais, caps_recife, apoio_emocional_nacional, } = dados;

    const [busca, setBusca] = useState('');

    const ligar = (telefone) => {
        const numero = telefone.replace(/[^\d]/g, '');
        Linking.openURL(`tel:${numero}`);
    };

    const filtrarDados = (lista) => {
        return lista.filter(item => 
            item.nome.toLowerCase().includes(busca.toLowerCase()) || 
            item.endereco.toLowerCase().includes(busca.toLowerCase())
        );
    };

    const hospitaisFiltrados = filtrarDados(hospitais);
    const capsFiltrados = filtrarDados(caps_recife);

    return(
        <PaperProvider>
            <ScrollView style={styles.container}>

                <TextInput 
                label="Buscar por nome ou endereço"
                value={busca}
                placeholderTextColor="#888"
                onChangeText={setBusca}
                mode="outlined"
                textColor="#000000"
                style={styles.input}
                />


            {busca.trim() === '' && (
                <>
                    <Text style={styles.titulo}>Apoio Emocional Nacional</Text>
                    <Card style={styles.card}>
                        <Card.Title titleStyle={styles.title} title={apoio_emocional_nacional.nome}/>
                        <Card.Content>
                            {apoio_emocional_nacional.imagem && (
                                <Image 
                                    source={{ uri: apoio_emocional_nacional.imagem}}
                                    style={styles.imagem}
                                />
                            )}
                            <Text style={styles.txt}> 📝 {apoio_emocional_nacional.descricao}</Text>
                            <Text style={styles.txt}> 🌐 {apoio_emocional_nacional.site}</Text>
                            <View style={styles.row}>
                                <MaterialIcons name="phone" size={20} color="#007aff" />
                                <Button onPress={() => ligar(apoio_emocional_nacional.telefone)}> Ligar </Button>
                            </View>
                        </Card.Content>
                    </Card>
                </>
            )}

                <Text style={styles.titulo}>Hospitais</Text>
                {hospitaisFiltrados.map((item, index) =>(
                    <Card key={index} style={styles.card}>
                        <Card.Title titleStyle={styles.title} title={item.nome}/>
                        <Card.Content>
                            {item.imagem && (
                                <Image 
                                    source={{ uri: item.imagem}}
                                    style={styles.imagem}
                                />
                            )}
                            <Text style={styles.txt}> 📍 {item.endereco}</Text>
                            <Text style={styles.txt}> 📝 {item.descricao}</Text>
                            <Text style={styles.txt}>     {item.telefone}</Text>
                            <View style={styles.row}>
                                <MaterialIcons name="phone" size={20} color="#007aff" />
                                <Button onPress={() => ligar(item.telefone)}> Ligar </Button>
                            </View>
                        </Card.Content>
                    </Card>
                ))}

                <Text style={styles.titulo}>CAPS Recife</Text>
                {capsFiltrados.map((caps, index) =>(
                    <Card key={index} style={styles.card}>
                        <Card.Title titleStyle={styles.title} title={caps.nome}/>
                        <Card.Content>

                            {caps.imagem && (
                                <Image 
                                    source={{ uri: caps.imagem}}
                                    style={styles.imagem}
                                />
                            )}
                            <Text style={styles.txt}>📍 {caps.endereco}</Text>
                            <Text style={styles.txt}>🕐 {caps.horario}</Text>
                            <Text style={styles.txt}>    {caps.telefone}</Text>

                            <View style={styles.row}>
                                <MaterialIcons name="phone" size={20} color="#7A00B3" />
                                <Button onPress={() => ligar(caps.telefone)}> Ligar </Button>
                            </View>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 10,
        marginTop:40,
        backgroundColor: '#f7e6ff',
    },
    titulo:{
        fontSize:22,
        fontWeight: 'bold',
        marginVertical: 10,
        marginBottom: 5,
        color: '#000000'
    },
    txt:{
        marginTop: 7,
        color: '#000000'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000'

    },
    card: {
        marginBottom: 10,
        paddingBottom: 5,
        backgroundColor:'#fff'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input:{
        marginBottom:5,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    imagem:{
        width: '100%',
        height: 180,
        borderRadius: 8,
        marginBottom: 10,
    }
});