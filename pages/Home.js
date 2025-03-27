import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import { useFonts } from 'expo-font';
import ProductCard from '../components/ProductCard';
import CategoryContainer from '../components/CategoryContainer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';

const Home = () => {
  // Estado para productos y categorías
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  

  // Fuentes Personalizadas
  const [fontsLoaded] = useFonts({
    MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
    MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
    MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
  });

  // Obtener los productos de la API
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
        const response = await axios.get(`http://192.168.1.79:4000/user/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]);
        } else {
          console.log("No se encontraron datos para el usuario.");
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
    axios.get('http://192.168.1.79:4000/artworks')
      .then((response) => {
        setProducts(response.data); 
      })
      .catch((error) => {
       
      });
  }, []);

  // Obtener las categorías de la API
  useEffect(() => {
    axios.get('http://192.168.1.79:4000/categorias')
      .then((response) => {
        setCategories(response.data); 
        
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
        {userData ? (
          <Text style={styles.tituloRegular}>{userData.name} {userData.lastname}</Text>
        ) : (
          <Text style={styles.tituloRegular}>Cargando...</Text>
        )}
      </View>

        <View style={styles.contenedorPrincipal}>
          <Text style={styles.tituloCategorias}>Nuestros Productos</Text>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollHorizontal}>
            {products.slice(0, 7).map((product, index) => (  
              <ProductCard
                key={product.id ? product.id.toString() : `product-${index}`}
                nombre={product.title}
                precio={product.firstprice}
                imageSource={product.image ? { uri: product.image } : require('../assets/producto.jpg')} 
                productId={product.id}  
                descripcion={product.descripcion}
                categoria={product.categoriaid}  
              />
            ))}
          </ScrollView>

          <Text style={styles.tituloCategorias}>Busca en nuestras categorías</Text>

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
