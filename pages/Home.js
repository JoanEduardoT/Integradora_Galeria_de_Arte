import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import { useFonts } from 'expo-font';
import ProductCard from '../components/ProductCard';
import CategoryContainer from '../components/CategoryContainer';
import axios from 'axios';

const Home = () => {
  // Estado para productos y categorías
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fuentes Personalizadas
  const [fontsLoaded] = useFonts({
    MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
    MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
    MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
  });

  // Obtener los productos de la API
  useEffect(() => {
    axios.get('http://192.168.1.222:4000/artworks')
      .then((response) => {
        setProducts(response.data); // Guardamos los productos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      });
  }, []);

  // Obtener las categorías de la API
  useEffect(() => {
    axios.get('http://192.168.1.222:4000/categorias')
      .then((response) => {
        setCategories(response.data); // Guardamos las categorías en el estado
      })
      .catch((error) => {
        console.error("Error al obtener categorías:", error);
      });
  }, []);

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

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
            {products.slice(0, 4).map((product, index) => (  
              <ProductCard
                key={product.id ? product.id.toString() : `product-${index}`}
                nombre={product.title}
                precio={product.firstprice}
                imageSource={product.image ? { uri: `http://192.168.137.6:4000/images/${product.image}` } : require('../assets/producto.jpg')} // Imagen dinámica
              />
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

export default Home;

const styles = StyleSheet.create({
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
