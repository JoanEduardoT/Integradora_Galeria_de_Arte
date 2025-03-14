import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavbarBack from '../components/NavbarBack';


// Iconos
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Producto = () => {
    const route = useRoute();
    const product = route.params?.product; // 🔥 Evita el error si `params` no existe
    console.log("Producto recibido en detalles:", product);  // 🔍 Verifica si se recibe correctamente

    if (!product) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>No se encontró el producto</Text>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: '#FFFFF3' }}>
            <NavbarBack />
            <ScrollView style={styles.scroll}>
                <View style={styles.scrollPadding}>
                    <Image 
                        source={product.image 
                            ? { uri: `http://192.168.33.5:4000/images/${product.image}` } 
                            : require('../assets/producto.jpg')} 
                        style={styles.image} 
                        resizeMode="center"
                    />
                    
                    <View style={styles.containerPrincipal}>
                        <Text style={styles.nombre}>{product.title}</Text>
                        
                        <View style={styles.containerPrecioCarrito}>
                            <Text style={styles.precio}>${product.firstprice} MXN</Text>

                            <TouchableOpacity style={styles.boton}>
                                <FontAwesome6 name="add" size={10} color="#FFFFF3" />
                                <AntDesign name="shoppingcart" size={20} color="#fffff3" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.descripcionTitulo}>Descripción</Text>
                        <Text style={styles.descripcion}>{product.descripcion || "Sin descripción disponible."}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Producto;

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    nombre: {
        fontSize: 30,
        fontFamily: 'MadeTommyBold',
        color: '#1A1A1A',
    },
    scrollPadding: {
        paddingBottom: 140,
    },
    image: {
        marginTop: 30,
        marginBottom: 20,
        height: 350,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: { height: 2 },
        shadowOpacity: 0.3,
    },
    containerPrincipal: {
        width: '80%',
        alignSelf: 'center',
    },
    containerPrecioCarrito: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    precio: {
        fontSize: 30,
        fontFamily: 'MadeTommyBold',
        marginRight: 10,
        color: '#44634E',
    },
    boton: {
        flexDirection: 'row',
        width: '15%',
        height: 35,
        backgroundColor: '#E3289F',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descripcionTitulo: {
        fontSize: 20,
        fontFamily: 'MadeTommyBold',
        textAlign: 'justify',
        color: '#634455',
        marginVertical: 5,
    },
    descripcion: {
        fontSize: 14,
        fontFamily: 'MalgunGothic',
        textAlign: 'justify',
        color: '#634455',
    },
});
