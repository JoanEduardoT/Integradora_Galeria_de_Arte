import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Timer from '../components/Timer'

const AuctionDetail = ({ route, navigation }) => {
  const { auctionId } = route.params || {};

  const [auction, setAuction] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [endTime,setEndTime] = useState()
  const [timeLeft,setTimeLeft] = useState()

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.195:4000/api/auction/${auctionId}`);
        const data = await response.json();
        console.log("📌 Datos recibidos:", data);

        setAuction(data); // Guarda detalles de la subasta
        setArtwork(data || {}); // Guarda detalles de la obra de arte
        setEndTime(data.endTime || null); // Guarda la fecha de finalización
        setTimeLeft(data.endTime ? calculateTimeLeft(data.endTime) : null); 
        console.log("id de la subasta", auctionId)// Calcula el tiempo restante
      } catch (error) {
        console.error('❌ Error obteniendo la subasta:', error);
      }
    };

    fetchAuctionDetails();
  }, [auctionId]);


  const placeBid = (bid) => {
    if (!auction || !auction.currentBid) return;

    if (bid <= auction.currentBid) {
      Alert.alert('Puja no válida', 'Tu puja debe ser mayor que la oferta actual.');
      return;
    }

    setAuction(prevAuction => ({
      ...prevAuction,
      currentBid: bid,
      bidHistory: prevAuction.bidHistory ? [...prevAuction.bidHistory, bid] : [bid],
    }));

    Alert.alert('¡Puja realizada!', 'Tu puja ha sido registrada.');
  };

  if (!auction) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles de la subasta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{auction.title}</Text>
      <Text style={styles.description}>{auction.description}</Text>
      <Text style={styles.description}>Precio inicial: {auction.firstprice}</Text>
      <Text style={styles.currentBid}>Oferta Actual: ${auction.currentBid}</Text>

      {artwork && (
        <>
          <Text style={styles.subTitle}>Detalles de la Obra de Arte:</Text>
          <Text>Nombre: {artwork.title || 'No disponible'}</Text>
          <Text>Autor: {artwork.name || 'No disponible'}</Text>
          <Text>Descripción: {artwork.descripcion || 'No disponible'}</Text>
          {auctionId ? <Timer auctionId={auctionId}/> :  <Text>No hay Informacion del tiempo restante</Text>}
        </>
      )}


      <TextInput
        style={styles.input}
        placeholder="Ingresa tu puja"
        value={bidAmount}
        onChangeText={setBidAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (bidAmount) {
            placeBid(parseFloat(bidAmount));
          } else {
            Alert.alert('Puja no válida', 'Por favor, ingresa una cantidad válida.');
          }
        }}
      >
        <Text style={styles.buttonText}>Realizar Puja</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver a Subastas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
    color: '#555',
  },
  currentBid: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
    width: '100%',
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

export default AuctionDetail;
