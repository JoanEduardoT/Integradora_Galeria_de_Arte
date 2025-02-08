import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useFonts } from 'expo-font'

const CategoryContainer = ({titulo, descripcion, imageSource}) => {

    //Fuentes Personalizadas
        const [fontsLoaded] = useFonts({
            MadeTommy: require('../assets/fonts/MADE TOMMY Regular_PERSONAL USE.otf'),
            MadeTommyBold: require('../assets/fonts/MADE TOMMY Bold_PERSONAL USE.otf'),
            MalgunGothic: require('../assets/fonts/malgun-gothic.ttf'),
        });

    return (
        <TouchableOpacity style={styles.container}>

            {imageSource && (<Image source={imageSource} style={styles.image}/>)}
            


            <View>
                <Text style={styles.titulo}>{titulo}</Text>
                <View style={styles.descripcionContainer}>
                    <Text style={styles.descripcion}>{descripcion}</Text>
                </View>
                
            </View>
        </TouchableOpacity>
    )
}

export default CategoryContainer

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 180,
        padding: 20,
        backgroundColor: '#FFF9F9',
        borderRadius: 20,
        shadowColor: "black",
        shadowOffset: { height: 2},
        shadowOpacity: 0.3,
        alignSelf: 'center',
        margin: 10,
        
    },
    image:{
        width: 80,
        height: 80,
        borderRadius: 100
    },
    titulo:{
        fontSize: 20,
        fontFamily: 'MadeTommyBold',
        marginLeft: 20,
        marginBottom:5,
        color: '#1A1A1A'
        
    },
    descripcionContainer:{
        width: '80%',
        marginLeft: 10
    },
    descripcion:{
        fontSize: 12,
        fontFamily: 'MalgunGothic',
        marginLeft: 10,
        textAlign: 'justify',
        color: '#634455'
    },

})