// src/components/PayPalButton.js

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PayPal from 'react-native-paypal';

// Asegúrate de inicializar PayPal antes de usarlo
const CLIENT_ID = 'AbQ7Gt6RWPRr2Omsyrgz9r6pIqVHspwttfHxgX3_abU1tN31Q_Xmt2YLlBhzc8UTQFO_wRcPCZF_ht-a';
PayPal.initialize(PayPal.PAYPAL_ENVIRONMENT_SANDBOX, CLIENT_ID);

const PayPalButton = ({ price, currency, description, onPaymentSuccess, onPaymentError }) => {
  const handlePayment = () => {
    const paymentDetails = {
      price: price.toFixed(2),
      currency: currency || 'MXN', // Si no se pasa moneda, se usa 'MXN'
      description: description || 'Compra en tu tienda',
    };

    // Inicia el proceso de pago
    PayPal.requestOneTimePayment(paymentDetails)
      .then((confirmation) => {
        console.log('Pago exitoso', confirmation);
        onPaymentSuccess(confirmation);
      })
      .catch((error) => {
        console.error('Error de pago', error);
        onPaymentError(error);
      });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePayment}>
      <Text style={styles.text}>Pagar con PayPal</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#44634E',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#FFFFF3',
    fontSize: 18,
    fontFamily: 'MalgunGothic',
  },
});

export default PayPalButton;
