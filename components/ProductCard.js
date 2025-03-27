import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { useCart } from '../context/CartContext';

const ProductCard = ({ productId, nombre, precio, descripcion, imageSource, categoria }) => {
    const navigation = useNavigation();

    const {addToCart} = useCart();

    const handlePress = () => {
        console.log("imageSource en ProductCard:", imageSource);  // Revisar el valor de imageSource antes de navegar

        if (navigation && navigation.navigate) {
            navigation.navigate('Producto', { 
                productId, 
                nombre, 
                precio, 
                descripcion, 
                imageSource,  // Pasando la fuente de la imagen
                categoria
            });
        } else {
            console.error("Error: Navigation no está disponible");
        }
    };

    const handleAddToCart = () =>{
        const newProduct ={
            id: productId,
            nombre: nombre,
            precio: Number(precio),
            imageSource
        };
        addToCart(newProduct);
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <Image source={imageSource?.uri ? imageSource : require('../assets/producto.jpg')} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.nombre} numberOfLines={1}>{nombre}</Text>
                {categoria && <Text style={styles.categoria}></Text>}
                <View style={styles.bottomContainer}>
                    <Text style={styles.precio}>${precio}</Text>
                    <TouchableOpacity style={styles.boton} onPress={handleAddToCart}>
                        <FontAwesome6 name="add" size={12} color="#FFFFF3" style={{ marginRight: 5 }} onPress={handleAddToCart} />
                        <AntDesign name="shoppingcart" size={20} color="#FFFFF3" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#FFF9F9',
        margin: 10,
        borderRadius: 15,
        shadowColor: "black",
        shadowOffset: { height: 2 },
        shadowOpacity: 0.2,
        elevation: 5,
        padding: 10,
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    nombre: {
        fontFamily: 'MadeTommyBold',
        fontSize: 14,
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 5,
    },
    categoria: {
        fontSize: 12,
        color: '#777',
        marginBottom: 5,
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    precio: {
        fontFamily: 'MadeTommyBold',
        fontSize: 18,
        color: '#44634E',
    },
    boton: {
        flexDirection: 'row',
        backgroundColor: '#E3289F',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 10,
        alignItems: 'center',
    }
});
