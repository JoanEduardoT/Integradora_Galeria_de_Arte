import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import CategoryContainer from '../components/CategoryContainer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

const Home = () => {
  const [productos, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken')
        const userId = await AsyncStorage.getItem('userId')


        if (!userToken || !userId) {
          console.log('No hay token o userId disponibles') // Depuración
          navigation.navigate('Login')
          return // Si no hay token o ID, no seguir con la solicitud
        }

        // Realiza la solicitud al servidor para obtener los datos del usuario
        const response = await axios.get(`http://192.168.1.241:4000/user/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]);
        } else {
          console.log("⚠️ No se encontraron datos para el usuario.");
          setUserData(null); // Evita errores en la UI
        }
        setLoading(false) // Cambia el estado de carga a false cuando se obtienen los datos

      } catch (error) {
        console.error('Error al obtener los datos del usuario', error)
        setLoading(false) // Cambia el estado de carga a false en caso de error
      }
    }

    fetchUserData()
  }, [])


  useEffect(() => {
    axios.get('http://192.168.1.241:4000/artworks')
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
    axios.get('http://192.168.1.241:4000/categorias')
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
        {userData ? (
          <Text style={styles.tituloRegular}>{userData.name} {userData.lastname}</Text>
        ) : (
          <Text style={styles.tituloRegular}>Cargando...</Text>
        )}
      </View>

        <View style={styles.contenedorPrincipal}>
          <Text style={styles.tituloCategorias}>Nuestros Productos</Text>
          
          <ScrollView horizontal={false} showsVerticalScrollIndicator={true} style={styles.scrollHorizontal}>
              {productos.slice(0, 5).map((product, index) => (
                <TouchableOpacity 
                    key={product.id ? product.id.toString() : `product-${index}`} 
                    onPress={() => {
                      navigation.navigate('Producto', { product });
                    }}
                  >
                    <Text>Ver mas</Text>

                    <ProductCard
                      id={product.id}
                      nombre={product.title}
                      precio={product.firstprice}
                      imageSource={product.image ? { uri: `http://192.168.1.241:4000/images/${product.image}` } : require('../assets/producto.jpg')}
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
