import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Navbar from '../components/Navbar'
import { useFonts } from 'expo-font'
import ProductCard from '../components/ProductCard'
import CategoryContainer from '../components/CategoryContainer'

const Home = () => {

    //Fuentes Personalizadas
    const [fontsLoaded] = useFonts({
        MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
        MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
        MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
    });

    return (
        <View style={{backgroundColor: '#fffff3'}}>
            <Navbar/>
            <ScrollView>
                <View style={styles.contenedorTitulo}>
                    <Text style={styles.tituloBold}>Bienvenido, </Text>
                    <Text style={styles.tituloRegular}>Usuario</Text>
                </View>

                <View style={styles.contenedorPrincipal}>
                    <View style={styles.contenedorProductos}>
                        <ProductCard nombre='Cuadro de Caballos' precio={300} imageSource={require('../assets/producto.jpg')}></ProductCard>
                        <ProductCard nombre='Pintura Abstracta' precio={1500} imageSource={require('../assets/producto2.jpeg')}></ProductCard>
                        <ProductCard nombre='Pintura Marilyn' precio={1000} imageSource={require('../assets/producto3.jpg')}></ProductCard>
                        <ProductCard nombre='Buho Artesania' precio={80}imageSource={require('../assets/producto4.jpg')}></ProductCard>
                        
                    </View>

                    <Text style={styles.tituloCategorias}>Busca en nuestras categorias</Text>
                    
                    <CategoryContainer titulo='Nombre Categoria' descripcion='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper ac diam quis cursus. Vestibulum mauris enim, scelerisque ac.' imageSource={require('../assets/images.jpg')}/>
                    <CategoryContainer titulo='Nombre Categoria' descripcion='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper ac diam quis cursus. Vestibulum mauris enim, scelerisque ac.' imageSource={require('../assets/images.jpg')}/>
                    <CategoryContainer titulo='Nombre Categoria' descripcion='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper ac diam quis cursus. Vestibulum mauris enim, scelerisque ac.' imageSource={require('../assets/images.jpg')}/>
                
                </View>
            </ScrollView>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    contenedorTitulo:{
        flexDirection: 'row',
        marginBottom: 20
    },
    tituloBold: {
        fontSize: 30,
        fontFamily: 'MadeTommyBold',
        marginLeft: 20,
        marginTop: 20,
        color: '#1A1A1A'
    },
    tituloRegular: {
        fontSize: 30,
        fontFamily: 'MadeTommy',
        marginTop: 20,
        color: '#1A1A1A'
    },
    contenedorPrincipal:{
        paddingBottom: 140
    },
    contenedorProductos:{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        
    },
    tituloCategorias: {
        fontSize: 20,
        fontFamily: 'MadeTommyBold',
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 20,
        color: '#1A1A1A'
    },
    
})



