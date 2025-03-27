import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import NavbarBack from '../components/NavbarBack';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const ListaProducto = ({ route }) => {
  const { categoryId } = route.params;
  console.log('categoryId recibido en ListaProducto:', categoryId);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.32:4000/artworks')
      .then((response) => {
        //console.log('Productos recibidos:', response.data);
        const filteredProducts = categoryId
          ? response.data.filter(product => product.categoriaid == categoryId)
          : response.data;
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, [categoryId]);  

  return (
    <View style={styles.container}>
      <NavbarBack />
      <Text style={styles.titulo}>Productos en esta categoría</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <ProductCard
            nombre={item.title}
            precio={item.firstprice}
            imageSource={item.image ? { uri: item.image } : require('../assets/producto.jpg')}
            productId={item.id}
            descripcion={item.descripcion}
            categoria={item.categoria}
          />
        )}
        ListEmptyComponent={<Text style={styles.noProducts}>No hay productos disponibles para esta categoría.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff3',
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#1A1A1A',
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  noProducts: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
});

export default ListaProducto;