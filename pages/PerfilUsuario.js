import React, { useState, useEffect,useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Navbar from '../components/Navbar'
import { useFonts } from 'expo-font'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const PerfilUsuario = () => {
  const navigation = useNavigation()
  const { user, logout } = useContext(AuthContext) // Obtenemos el estado y la función logout


  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true) // Añadido estado de carga

  // Fuentes Personalizadas
  const [fontsLoaded] = useFonts({
    MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
    MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
    MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        if (!user) {
          navigation.navigate('Login') // Si no hay usuario autenticado, ir al login
          return
        }


        const userToken = await AsyncStorage.getItem('userToken')
        const userId = await AsyncStorage.getItem('userId')

        if (!userToken || !userId) {
          console.log('No hay token o userId disponibles') // Depuración
          navigation.navigate('Login')
          return // Si no hay token o ID, no seguir con la solicitud
        }

        // Realiza la solicitud al servidor para obtener los datos del usuario
        const response = await axios.get(`http://dog0s0gwksgs8osw04csg0cs.31.170.165.191.sslip.io/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`, // En caso de usar JWT o algún token
          },
        })


        setUserData(response.data[0])
        setLoading(false) // Cambia el estado de carga a false cuando se obtienen los datos

      } catch (error) {
        console.error('Error al obtener los datos del usuario', error)
        setLoading(false) // Cambia el estado de carga a false en caso de error
      }
    }

    fetchUserData()
  }, [user,navigation])

  if (loading) {
    // Si los datos aún están cargando, muestra un mensaje de carga
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    )
  }

  if (!userData) {
    // Si no se han recibido datos del usuario, mostrar mensaje de error
    return (
      <View style={styles.loadingContainer}>
        <Text>No se pudo obtener la información del usuario.</Text>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: '#FFFFF3' }}>
      <Navbar />
      <Text style={styles.titulo}>Mi Perfil</Text>

      <View style={styles.containerPrincipal}>
        <View style={styles.centerContainer}>
          <TouchableOpacity>
            <Image source={require('../assets/images.jpg')} style={styles.image} />
          </TouchableOpacity>

          <Text style={styles.nombre}>{userData.name}</Text>

          <Text style={styles.informacionTitulo}>Información</Text>
          <Text style={styles.informacion}>•Email: {userData.email}</Text>
          <Text style={styles.informacion}>•Direccion: {userData.address}</Text>
          <Text style={styles.informacion}>•Ciudad: {userData.city}</Text>
          <Text style={styles.informacion}>•Telefono: {userData.phone}</Text>
        </View>

        <View style={styles.containerBotones}>

          <TouchableOpacity
            style={styles.cerrarBtn}
            onPress={() => logout()}>
            <Text style={styles.textoBoton}>Cerrar Sesion</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default PerfilUsuario

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFF3',
  },
  titulo: {
    fontSize: 30,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    marginTop: 20,
  },
  containerPrincipal: {
    paddingBottom: 140,
  },
  centerContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  nombre: {
    fontSize: 25,
    fontFamily: 'MadeTommyBold',
    marginTop: 20,
  },
  informacionTitulo: {
    fontSize: 20,
    fontFamily: 'MadeTommyBold',
    color: '#634455',
    margin: 10,
  },
  informacion: {
    fontSize: 15,
    fontFamily: 'MalgunGothic',
    color: '#634455',
    margin: 2,
  },
  containerBotones: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-evenly',
  },
  editarBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 50,
    backgroundColor: '#634455',
    borderRadius: 20,
  },
  cerrarBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 50,
    backgroundColor: '#E3298F',
    borderRadius: 20,
  },
  textoBoton: {
    fontSize: 15,
    fontFamily: 'MalgunGothic',
    color: '#fffff3',
  },
})
