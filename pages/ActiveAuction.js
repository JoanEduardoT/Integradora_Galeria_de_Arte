import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ActiveAuctions = ({ navigation }) => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetch('http://192.168.1.77:4000/api/auctions')
      .then(response => response.json())
      .then(data => {
        console.log("Subastas activas:", data);
        setAuctions(data);  // Actualizar el estado con las subastas activas
      })
      .catch(error => console.error("Error al obtener las subastas:", error));
  }, []);

  const renderAuctionItem = ({ item }) => (
    <View style={styles.auctionItem}>
      <Text style={styles.auctionName}>{item.artworkid}</Text>
      <Text style={styles.currentBid}>Oferta Actual: ${item.currentBid}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AuctionDetail', { auctionId: item.artworkid })}
      >
        <Text style={styles.buttonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={auctions}
        renderItem={renderAuctionItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  auctionItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  auctionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentBid: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ActiveAuctions;
