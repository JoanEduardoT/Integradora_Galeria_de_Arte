import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import Navbar from '../components/Navbar'
import { useFonts } from 'expo-font'
import CategoryContainer from '../components/CategoryContainer'

const Categorias = () => {

    //Fuentes Personalizadas
        const [fontsLoaded] = useFonts({
            MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
            MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
            MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
        });

    return (
        <View style={{backgroundColor: '#FFFFF3'}}>
            <Navbar/>

            <ScrollView>

                <View style={styles.containerPadding}>
                    <Text style={styles.titulo}>Categorias</Text>
                    <CategoryContainer titulo='Nombre Categoria' descripcion='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper ac diam quis cursus. Vestibulum mauris enim, scelerisque ac.' imageSource={require('../assets/images.jpg')}/>
                    <CategoryContainer titulo='Nombre Categoria' descripcion='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper ac diam quis cursus. Vestibulum mauris enim, scelerisque ac.' imageSource={require('../assets/images.jpg')}/>
                    <CategoryContainer titulo='Nombre Categoria' descripcion='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper ac diam quis cursus. Vestibulum mauris enim, scelerisque ac.' imageSource={require('../assets/images.jpg')}/>
                    <CategoryContainer titulo='Nombre Categoria' descripcion='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper ac diam quis cursus. Vestibulum mauris enim, scelerisque ac.' imageSource={require('../assets/images.jpg')}/>
                    <CategoryContainer titulo='Nombre Categoria' descripcion='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper ac diam quis cursus. Vestibulum mauris enim, scelerisque ac.' imageSource={require('../assets/images.jpg')}/>
                </View>
                
            </ScrollView>
            
        </View>
    )
}

export default Categorias

const styles = StyleSheet.create({
    titulo: {
        fontSize: 30,
        fontFamily: 'MadeTommyBold',
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
        color: '#1A1A1A'
    },
    containerPadding:{
        paddingBottom:140
    },
    image:{
        width: 10,
        height: 10,
    }
})
