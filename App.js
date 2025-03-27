import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CartProvider } from './context/CartContext';
import Navigation from './Navigation';
import { useState } from 'react';

export default function App() {

  return (
    <CartProvider>
    <Navigation/>
    </CartProvider>
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
