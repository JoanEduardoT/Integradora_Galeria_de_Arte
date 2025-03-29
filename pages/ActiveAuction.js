import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ActiveAuctions = ({ navigation }) => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('http://dog0s0gwksgs8osw04csg0cs.31.170.165.191.sslip.io/api/auctions');
        let data = await response.json();
        const uniqueData = Array.from(new Map(data.map(item => [item.id, item])).values());
        setAuctions(uniqueData);
      } catch (error) {
        console.error("Error al obtener las subastas:", error);
      }
    };
    fetchAuctions();
    const intervalId = setInterval(fetchAuctions, 5000);
    return () => clearInterval(intervalId);
  }, []);
  

  const renderAuctionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.auctionItem}
      onPress={() => navigation.navigate('AuctionDetail', { auctionId: item.id })}
    >
      <Image 
        source={item.image ? { uri: item.image } : require('../assets/icon.png')} 
        style={styles.image} 
        resizeMode='center' 
      />
      <View style={{ width: '95%', alignSelf: 'center' }}>
        <Text style={styles.auctionName}>{item.title || "Cargando . . ."}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={styles.precio1}>Oferta Actual: </Text>
          <Text style={styles.precio2}>${item.currentBid} MXN</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.titulo}>Subastas</Text>
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
    backgroundColor: '#FFFFF3'
  },
  titulo: {
    fontSize: 30,
    fontFamily: 'MadeTommyBold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
    color: '#1A1A1A'
  },
  auctionItem: {
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    marginBottom: 20,
    height: 150,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: "black",
    shadowOffset: { height: 2 },
    shadowOpacity: 0.3,
  },
  auctionName: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  precio1: {
    color: '#1a1a1a',
    fontSize: 20,
    fontFamily: 'MadeTommyBold'
  },
  precio2: {
    color: '#44634E',
    fontSize: 20,
    fontFamily: 'MadeTommy'
  },
});

export default ActiveAuctions;
