// src/components/PayPalPayment.js

import React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text } from 'react-native';

const PayPalPayment = ({ paymentToken }) => {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: `https://www.paypal.com/webapps/hermes?token=${paymentToken}&useraction=commit` }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default PayPalPayment;
