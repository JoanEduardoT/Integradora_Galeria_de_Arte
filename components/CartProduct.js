import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';


// Iconos
import Feather from '@expo/vector-icons/Feather';

const CartProduct = ({ id ,nombre, precio, imageSource, product, removeFromCart }) => {
  
  const navigation = useNavigation();

  const handlePress = () => {
    //navigation.navigate('Producto', { product });
  };

  return (
    <TouchableOpacity style={styles.containerPrincipal} onPress={handlePress}>
      <View style={styles.containerSecundario}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <View>
          <Text style={styles.titulo}>{nombre}</Text>
          <Text style={styles.precio}>${precio} MXN</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.eliminarBtn} 
        onPress={() => {
          if (id) {
            removeFromCart(id);
          } else {
            console.log("ID",id)
            console.error("Error: el producto no tiene un ID válido", product);
          }
        }}
      >
        <Feather name="trash-2" size={30} color="#FFFFF3" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};


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
    shadowColor: 'black',
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
    alignSelf: 'center',
    margin: 10,
  },
  containerSecundario: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  titulo: {
    fontSize: 20,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    color: '#1A1A1A',
  },
  precio: {
    fontSize: 20,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    color: '#44634E',
  },
  eliminarBtn: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E3298F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartProduct;
