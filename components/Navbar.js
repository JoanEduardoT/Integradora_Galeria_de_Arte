import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';


//Iconos
import AntDesign from '@expo/vector-icons/AntDesign';


const Navbar = () => {


    const Navigation = useNavigation()

    return (
        <View style={styles.navbar}>
            <Text style={styles.logo}>
                EncontrArte
            </Text>

            <TouchableOpacity onPress={() => Navigation.navigate('Carrito')}>
                <AntDesign name="shoppingcart" size={30} color="#fffff3" />
            </TouchableOpacity>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        height: 120,
        width: '100%',
        backgroundColor: '#E3298F',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
        shadowColor: "black",
        shadowOffset: { height: 2},
        shadowOpacity: 0.3,
    },
    logo:{
        fontFamily: 'MadeTommyBold',
        fontSize: 28,
        color: '#FFFFF3'
    }
})

