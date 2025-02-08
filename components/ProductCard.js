import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useFonts } from 'expo-font';

import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ProductCard = ({nombre, precio, imageSource}) => {

    //Fuentes Personalizadas
    const [fontsLoaded] = useFonts({
        MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
        MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
        MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
    });

    return (
        <TouchableOpacity style={styles.cardbody}>
            
            {imageSource && (<Image source={imageSource} style={styles.image}/>)}

            <Text style={styles.nombre}>{nombre}</Text>

            <View style={styles.contenedor}>
                <Text style={styles.precio}>${precio}</Text>
                <TouchableOpacity style={styles.boton}>
                    <FontAwesome6 name="add" size={10} color="#FFFFF3" />
                    <AntDesign name="shoppingcart" size={20} color="#fffff3" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    cardbody:{
        height: 180,
        width: '40%',
        backgroundColor: '#FFF9F9',
        margin: 10,
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: { height: 2},
        shadowOpacity: 0.3,
    },
    image:{
        width: '80%',
        height: 80,
        marginHorizontal:15,
        marginTop: 15,
        marginBottom:10,
        borderRadius:10
    },
    nombre:{
        fontFamily: 'MadeTommyBold',
        fontSize: 15,
        alignSelf: 'center',
        color: '#1A1A1A',
        marginBottom:5,
    },
    contenedor:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15
    },
    precio:{
        fontFamily: 'MadeTommyBold',
        fontSize: 25,
        color: '#44634E'
    },
    boton:{
        flexDirection:'row',
        width: '35%',
        height: 35,
        backgroundColor: '#E3289F',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})