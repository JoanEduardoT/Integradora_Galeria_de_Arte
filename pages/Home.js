import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CategoryContainer from '../components/CategoryContainer';
import axios from 'axios';

const Home = () => {
  const [productos, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('http://192.168.1.232:4000/artworks')
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Marcar como cargado cuando los productos se hayan recibido
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('http://192.168.1.232:4000/categorias')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  return (
    <View style={{ backgroundColor: '#fffff3' }}>
      <Navbar />
      <ScrollView>
        <View style={styles.contenedorTitulo}>
          <Text style={styles.tituloBold}>Bienvenido, </Text>
          <Text style={styles.tituloRegular}>Usuario</Text>
        </View>

        <View style={styles.contenedorPrincipal}>
          <Text style={styles.tituloCategorias}>Nuestros Productos</Text>
          
          <ScrollView horizontal={false} showsVerticalScrollIndicator={true} style={styles.scrollHorizontal}>
              {productos.slice(0, 5).map((product, index) => (
                <TouchableOpacity 
                    key={product.id ? product.id.toString() : `product-${index}`} 
                    onPress={() => {
                      console.log("Producto enviado:", product);  // Verifica que se llama
                      navigation.navigate('Producto', { product });
                    }}
                  >
                    <Text>Ver mas</Text>

                    <ProductCard
                      nombre={product.title}
                      precio={product.firstprice}
                      imageSource={product.image ? { uri: `http://192.168.1.232:4000/images/${product.image}` } : require('../assets/producto.jpg')}
                      product={product}
                    />
                  </TouchableOpacity>
              ))}

          </ScrollView>

          <Text style={styles.tituloCategorias}>Busca en nuestras categorías</Text>

          {categories.map((category, index) => (
            <CategoryContainer
              key={category.id ? category.id.toString() : `category-${index}`}
              titulo={category.name}
              descripcion={category.descripcion}
              imageSource={require('../assets/images.jpg')} 
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  contenedorTitulo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tituloBold: {
    fontSize: 30,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    marginTop: 20,
    color: '#1A1A1A',
  },
  tituloRegular: {
    fontSize: 30,
    fontFamily: 'MadeTommy',
    marginTop: 20,
    color: '#1A1A1A',
  },
  contenedorPrincipal: {
    paddingBottom: 140,
  },
  tituloCategorias: {
    fontSize: 20,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10,
    color: '#1A1A1A',
  },
  scrollHorizontal: {
    paddingLeft: 20,
    marginBottom: 20,
  },
});

export default Home;
