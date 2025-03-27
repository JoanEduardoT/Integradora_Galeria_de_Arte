// src/screens/Carrito.js

import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext'; // 🔥 Importa el hook
import PayPalPayment from '../components/PayPalPayment'; // Asegúrate de importar el componente
import NavbarBack from '../components/NavbarBack';
import CartProduct from '../components/CartProduct';

const Carrito = ({ navigation }) => {
    const { cartItems, removeFromCart } = useCart(); // 🔥 Obtener productos y función para eliminar

    // Calcular total
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.precio || 0), 0);

    const handlePayment = () => {
        // Aquí normalmente debes hacer una petición a tu backend para generar un token
        const paymentToken = 'generatedPaymentToken'; // Sustituir con token generado en tu servidor

        // Redirigir a la pantalla de pago
        navigation.navigate('PayPalPayment', { paymentToken });
    };

    return (
        <View style={{flex: 1, backgroundColor: '#FFFFF3'}}>
            <NavbarBack/>
            <ScrollView>
                <View style={styles.containerPadding}>
                    <Text style={styles.titulo}>Carrito</Text>

                    {cartItems.length === 0 ? (
                        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
                    ) : (
                        cartItems.map((item, index) => (
                            
                          <CartProduct key={index}
                          nombre={item.nombre}
                          precio={item.precio} 
                          />

                        ))
                    )}

                    <View style={styles.totalContainer}>
                        <View style={styles.totalTextoContainer}>
                            <Text style={styles.totalTexto}>Total: </Text>
                            <Text style={styles.precioTexto}>${totalPrice.toFixed(2)} MXN</Text>
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handlePayment}>
                            <Text style={styles.buttonText}>Pagar con PayPal</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
  titulo: {
    fontSize: 30,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    color: '#1A1A1A',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
  containerPadding: {
    paddingBottom: 140,
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 20,
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'rgba(26, 26, 26, 0.5)',
    borderTopStyle: 'solid',
  },
  totalTexto: {
    fontFamily: 'MadeTommyBold',
    fontSize: 20,
  },
  precioTexto: {
    fontFamily: 'MalgunGothic',
    fontSize: 20,
  },
  boton:{
    marginTop: 10,
    width: '45%',
    height: 35,
    backgroundColor: '#0070ba',
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default Carrito;
