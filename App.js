import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navigation from './Navigation';
import { useState } from 'react';

export default function App() {

  return (
    <AuthProvider>
    <CartProvider>
    <Navigation/>
    </CartProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
