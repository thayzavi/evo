import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
                    <Image source={require('../assets/logo.jpg')} style={styles.avatar}/>
                <Text style={styles.titulo}>Olá! Eu sou o Evo, seu assistente emocional.</Text>
                <Text style={styles.subtitulo}>
                   “  Tudo bem não estar bem. Vamos dar um passo de cada vez. ”
                </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#7A00B3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content:{
        alignItems: 'center',

    },
    avatar:{
        height: 290,
        width: 380,
        marginBottom: 16,
    },
    titulo:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign:'center',
    },
    subtitulo:{
        fontSize: 14,
        color: '#fff',
        marginBottom: 40,
        marginTop: 20,
        textAlign: 'center',
    },
    btn:{
        marginTop: 10,
        whidth: '100%',
    },
});