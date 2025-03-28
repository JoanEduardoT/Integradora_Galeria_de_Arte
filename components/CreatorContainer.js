import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';

// Iconos
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CreatorContainer = ({ id, nombre, apellido, imageSource }) => {
    const navigation = useNavigation();
    console.log(id)

    // Manejo de navegación con datos del creador
    const handlePress = () => {
        navigation.navigate('PerfilCreador', { id });
    };

    // Fuentes Personalizadas
    const [fontsLoaded] = useFonts({
        MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
        MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
        MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
    });

    return (
        <TouchableOpacity style={styles.containerPrincipal} onPress={handlePress}>
            <View style={styles.containerSecundario}>
                <Image 
                    
                    style={styles.image} 
                />
                <View>
                    <Text style={styles.titulo}>{nombre} {apellido}</Text>
                </View>
            </View>
            <MaterialIcons name="navigate-next" size={50} color="#44634E" />
        </TouchableOpacity>
    );
};

export default CreatorContainer;

const styles = StyleSheet.create({
    containerPrincipal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 100,
        padding: 20,
        backgroundColor: '#FFF9F9',
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
        alignSelf: 'center',
        margin: 10,
    },
    containerSecundario: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 100
    },
    titulo: {
        fontSize: 20,
        fontFamily: 'MadeTommyBold',
        marginLeft: 20,
        color: '#1A1A1A'
    },
});
