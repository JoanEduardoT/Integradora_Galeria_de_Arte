import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';


// Iconos
import Feather from '@expo/vector-icons/Feather';

const CartProduct = ({ nombre, precio, imageSource, product, addToCart }) => {
  const navigation = useNavigation();
  console.log("valor del item", product)


  const handlePress = () => {
    navigation.navigate('Producto', { product });
  };

  // Fuentes personalizadas
  const [fontsLoaded] = useFonts({
    MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
    MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
    MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
  });

  // Verificar si las fuentes están cargadas
  if (!fontsLoaded) {
    return <Text>Cargando fuentes...</Text>;
  }

  return (
    <TouchableOpacity style={styles.containerPrincipal} onPress={handlePress}>
      <View style={styles.containerSecundario}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <View>
          <Text style={styles.titulo}>{nombre}</Text>
          <Text style={styles.precio}>${precio} MXN</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.eliminarBtn} onPress={() => addToCart(product)}>
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
