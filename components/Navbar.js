import React from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//Iconos
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';



const Navbar = () => {

    const Navigation = useNavigation()

    return (
        <View style={styles.navbar}>
            <TextInput style={styles.input}>
                <FontAwesome name="search" size={20} color="#634455" />
            </TextInput>

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
        height:120,
        width: '100%',
        backgroundColor: '#E3298F',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    input:{
        width: "80%",
        height: 40,
        padding: 20,
        paddingHorizontal: 20,
        borderRadius: 40,
        backgroundColor: '#fffff3'}
})

