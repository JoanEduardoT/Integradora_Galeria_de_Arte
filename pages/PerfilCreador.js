import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { useRoute } from '@react-navigation/native';
import NavbarBack from '../components/NavbarBack';
import CreatorProductContainer from '../components/CreatorProductContainer';

const PerfilCreador = () => {
    const route = useRoute();
    const creador = route.params?.creador; // 🔥 Evita error si params no existe
    const product = route.params?.product;
    

    if (!creador) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>No se encontró el creador</Text>
            </View>
        );
    }

    // Fuentes personalizadas
    const [fontsLoaded] = useFonts({
        MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
        MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
        MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
    });

    return (
        <View style={{ backgroundColor: '#FFFFF3' }}>
            <NavbarBack />

            <ScrollView>
                <View style={styles.containerPrincipal}>
                    <View style={styles.centerContainer}>
                        <Image source={{ uri: creador.imagen }} style={styles.image} />

                        <Text style={styles.nombre}>{creador.name} {creador.lastname}</Text>

                        <Text style={styles.informacionTitulo}>Información</Text>
                        <Text style={styles.informacion}>• {creador.email}</Text>
                        <Text style={styles.informacion}>• {creador.address}</Text>
                        <Text style={styles.informacion}>• {creador.city}, {creador.state}</Text>
                        <Text style={styles.informacion}>• {creador.birthdate}</Text>
                        <Text style={styles.informacion}>• {creador.phone}</Text>

                        <Text style={styles.tituloProductos}>Productos de {creador.name}</Text>

                        {creador.products?.length > 0 ? (
                            creador.products.map((product) => (
                                <CreatorProductContainer 
                                    key={product.id} 
                                    nombre={product.name} 
                                    precio={product.price} 
                                    imageSource={{ uri: product.image }} 
                                />
                            ))
                        ) : (
                            <Text style={styles.noProducts}>No hay productos disponibles</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PerfilCreador;

const styles = StyleSheet.create({
    containerPrincipal: {
        paddingTop: 20,
        paddingBottom: 140,
    },
    centerContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    nombre: {
        fontSize: 25,
        fontFamily: 'MadeTommyBold',
        marginTop: 20,
    },
    informacionTitulo: {
        fontSize: 20,
        fontFamily: 'MadeTommyBold',
        color: '#634455',
        margin: 10,
    },
    informacion: {
        fontSize: 15,
        fontFamily: 'MalgunGothic',
        color: '#634455',
        margin: 2,
    },
    tituloProductos: {
        fontSize: 20,
        marginLeft: 20,
        fontFamily: 'MadeTommyBold',
        alignSelf: 'flex-start',
        marginTop: 60,
        marginBottom: 10,
        color: '#1A1A1A',
    },
    noProducts: {
        fontSize: 16,
        fontFamily: 'MalgunGothic',
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
});
