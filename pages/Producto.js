import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';  // Importamos useRoute para obtener los parámetros
import NavbarBack from '../components/NavbarBack';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useCart } from '../context/CartContext';

const Producto = () => {
  // Obtenemos los parámetros de navegación
  const route = useRoute();
  const { nombre, precio, imageSource, descripcion } = route.params;

  // Agregar un log para verificar qué valor tiene imageSource
  console.log("imageSource en Producto:", imageSource);  // Verifica el valor de imageSource

  // Configuramos la imagen dependiendo si se tiene un URL o una imagen local
  const imageUri = imageSource && imageSource.uri 
    ? { uri: imageSource.uri }  // Si tiene URI
    : require('../assets/producto.jpg'); // Si no tiene URI, usar imagen por defecto

  return (
    <View style={{flex :1,  backgroundColor: '#FFFFF3' }}>
      <NavbarBack  />
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollPadding}>
          <Image source={imageUri} style={styles.image} />
          <View style={styles.containerPrincipal}>
            <Text style={styles.nombre}>{nombre}</Text>
            <View style={styles.containerPrecioCarrito}>
              <Text style={styles.precio}>${precio}</Text>
              <TouchableOpacity style={styles.boton}>
                <FontAwesome6 name="add" size={10} color="#FFFFF3" />
                <AntDesign name="shoppingcart" size={20} color="#fffff3" />
              </TouchableOpacity>
            </View>
            <Text style={styles.descripcionTitulo}>Descripción</Text>
            <Text style={styles.descripcion}>{descripcion}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Producto;

const styles = StyleSheet.create({
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
