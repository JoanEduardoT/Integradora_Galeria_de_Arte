import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CartProduct from '../components/CartProduct'
import Navbar from '../components/Navbar'
import { useFonts } from 'expo-font'

const Carrito = () => {

    const Navigation = useNavigation()
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
                    <Text style={styles.titulo}>Carrito</Text>
                    <CartProduct nombre="Nombre Creador" precio={1000} imageSource={require('../assets/images.jpg')}/>
                    <CartProduct nombre="Nombre Creador" precio={1000} imageSource={require('../assets/images.jpg')}/>
                    <CartProduct nombre="Nombre Creador" precio={10} imageSource={require('../assets/images.jpg')}/>
                    <CartProduct nombre="Nombre Creador" precio={120} imageSource={require('../assets/images.jpg')}/>
                    <CartProduct nombre="Nombre Creador" precio={1000} imageSource={require('../assets/images.jpg')}/>
                    <CartProduct nombre="Nombre Creador" precio={500} imageSource={require('../assets/images.jpg')}/>
                    <CartProduct nombre="Nombre Creador" precio={1000} imageSource={require('../assets/images.jpg')}/>
                    <CartProduct nombre="Nombre Creador" precio={1200} imageSource={require('../assets/images.jpg')}/>
                    <CartProduct nombre="Nombre Creador" precio={1000} imageSource={require('../assets/images.jpg')}/>

                    <View style={styles.totalContainer}>

                        <View style={styles.totalTextoContainer}>
                                <Text style={styles.totalTexto}>Total: </Text>
                                <Text style={styles.precioTexto}> $10000 MXN</Text>
                        </View>

                        <TouchableOpacity style={styles.boton}>
                            <Text style={styles.textoBtn}>Pagar</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                
            </ScrollView>
            
            
        </View>
    )
}

export default Carrito

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
        paddingBottom:140,
    },
    totalContainer:{
        marginTop: 20,
        paddingVertical: 20,
        width: '80%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: 'rgba(26, 26, 26, 0.5)',
        borderTopStyle: 'solid'
    },
    totalTextoContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    totalTexto:{
        fontFamily: 'MadeTommyBold',
        fontSize: 20
    },
    precioTexto:{
        fontFamily: 'MalgunGothic',
        fontSize: 20
    },
    boton:{
        marginTop: 10,
        width: '35%',
        height: 35,
        backgroundColor: '#44634E',
        borderRadius: 10,
        shadowColor: "black",
        shadowOffset: { height: 0, width: 0},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBtn:{
        fontFamily: 'MalgunGothic',
        fontSize: 15,
        color: '#FFFFF3'
    },

})
