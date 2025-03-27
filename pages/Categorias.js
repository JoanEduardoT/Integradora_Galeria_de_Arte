import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import { useFonts } from 'expo-font';
import ProductCard from '../components/ProductCard';
import CategoryContainer from '../components/CategoryContainer';
import axios from 'axios';

const Home = () => {
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
   
  const [fontsLoaded] = useFonts({
    MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
    MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
    MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
  });

  
  useEffect(() => {
    axios.get('http://192.168.1.79:4000/categorias')
      .then((response) => {
        setCategories(response.data); // Guardamos las categorías en el estado
        //console.log("Categorias:", response.data);
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
          <Text style={styles.tituloBold}>Categorias </Text>
          
        </View>

        <View style={styles.contenedorPrincipal}>

          

          {categories.map((category, index) => (
            <CategoryContainer
              key={category.id ? category.id.toString() : `category-${index}`}
              name={category.name}
              descripcion={category.descripcion}
              imageSource={category.image ? { uri: category.image } : require('../assets/producto.jpg')} 
              categoryId={category.id}  
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

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
