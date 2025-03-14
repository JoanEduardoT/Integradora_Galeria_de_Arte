import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../components/Navbar';
import { useFonts } from 'expo-font';
import CategoryContainer from '../components/CategoryContainer';
import axios from 'axios';

const Categorias = () => {
  const [fontsLoaded] = useFonts({
    MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
    MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
    MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const obtenerCategorias = async () => {
    try {
      const response = await axios.get('http://192.168.33.5:4000/categorias');
      if (response.status === 200) {
        setCategorias(response.data);
      } else {
        setError('Error al obtener categorías');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      setError('Error al obtener categorías');
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: '#FFFFF3' }}>
      <Navbar />

      <ScrollView>
        <View style={styles.containerPadding}>
          <Text style={styles.titulo}>Categorias</Text>
          {categorias.map((categoria) => (
            <CategoryContainer
              key={categoria.id}
              titulo={categoria.name}
              descripcion={categoria.descripcion}
              imageSource={require('../assets/images.jpg')}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Categorias;

const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    color: '#1A1A1A',
  },
  containerPadding: {
    paddingBottom: 140,
  },
});
