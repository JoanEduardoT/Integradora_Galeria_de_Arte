import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';
import { useFonts } from 'expo-font';
import CreatorContainer from '../components/CreatorContainer';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Creadores = () => {
    const [creadores, setCreadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // 👈 Para manejar la navegación

    // Fuentes personalizadas
    const [fontsLoaded] = useFonts({
        MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
        MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
        MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
    });

    // Obtener los datos de usuarios
    useEffect(() => {
        const fetchCreadores = async () => {
            try {
                const response = await axios.get('http://192.168.33.5:4000/users'); // Reemplaza con tu API
                setCreadores(response.data);
            } catch (error) {
                console.error('Error al obtener los creadores:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCreadores();
    }, []);

    return (
        <View style={{ backgroundColor: '#FFFFF3', flex: 1 }}>
            <Navbar />
            <ScrollView style={styles.scroll}>
                <View style={styles.scrollPadding}>
                    <Text style={styles.titulo}>Creadores</Text>

                    {loading ? (
                        <ActivityIndicator size="large" color="#000" />
                    ) : (
                        creadores.map((creador) => (
                            <TouchableOpacity 
                                key={creador.id} 
                                onPress={() => navigation.navigate('PerfilCreador', { creador })} // 👈 Navega con datos
                            >
                                <Text>Presiona Aqui</Text>
                                <CreatorContainer
                                    nombre={creador.name} 
                                    apellido={creador.lastname}
                                    imageSource={{ uri: creador.imagen }} 
                                />
                            </TouchableOpacity>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Creadores;

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
        fontFamily: 'MadeTommyBold',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        color: '#1A1A1A',
    },
    scrollPadding: {
        paddingBottom: 140,
    },
});
