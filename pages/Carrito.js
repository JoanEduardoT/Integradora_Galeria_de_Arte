// src/screens/Carrito.js

import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext'; // 🔥 Importa el hook
import PayPalPayment from '../components/PayPalPayment'; // Asegúrate de importar el componente

const Carrito = ({ navigation }) => {
    const { cartItems, removeFromCart } = useCart(); // 🔥 Obtener productos y función para eliminar

    // Calcular total
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.precio || 0), 0);

    const handlePayment = () => {
        // Aquí normalmente debes hacer una petición a tu backend para generar un token de PayPal
        const paymentToken = 'generatedPaymentToken'; // Sustituir con token generado en tu servidor

        // Redirigir a la pantalla de pago
        navigation.navigate('PayPalPayment', { paymentToken });
    };

    return (
        <View style={{backgroundColor: '#FFFFF3'}}>
            <ScrollView>
                <View style={styles.containerPadding}>
                    <Text style={styles.titulo}>Carrito</Text>

                    {cartItems.length === 0 ? (
                        <Text style={styles.emptyText}>Tu carrito está vacío</Text>
                    ) : (
                        cartItems.map((item, index) => (
                            <View key={index}>
                                <Text>{item.nombre} - ${item.precio}</Text>
                                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                    <Text>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}

                    <View style={styles.totalContainer}>
                        <View style={styles.totalTextoContainer}>
                            <Text style={styles.totalTexto}>Total: </Text>
                            <Text style={styles.precioTexto}> ${totalPrice.toFixed(2)} MXN</Text>
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handlePayment}>
                            <Text style={styles.textoBtn}>Pagar con PayPal</Text>
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
});

export default Carrito;
