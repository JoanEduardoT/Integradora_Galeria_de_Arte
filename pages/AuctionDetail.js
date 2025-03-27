import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import Timer from '../components/Timer';
import NavbarBack from '../components/NavbarBack';

const AuctionDetail = ({ route }) => {
  const { auctionId } = route.params || {};
  const [auction, setAuction] = useState(null);
  const [auctionsOver, setAuctionsOver] = useState({});

  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.32:4000/api/auction/${auctionId}`);
        const data = await response.json();
        setAuction(data);
      } catch (error) {
        console.error('❌ Error obteniendo la subasta:', error);
      }
    };

    fetchAuctionDetails();
    const interval = setInterval(fetchAuctionDetails, 5000);
    return () => clearInterval(interval);
  }, [auctionId]);

  const placeBid = (bid) => {
    if (auctionsOver[auctionId]) return;

    fetch(`http://192.168.1.32:4000/api/bid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auctionId, bidAmount: bid })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setAuction(prevAuction => ({ ...prevAuction, currentBid: bid }));
        Alert.alert('¡Puja realizada!', 'Tu puja ha sido registrada.');
      } else {
        Alert.alert('Error', data.message);
      }
    })
    .catch(error => console.error("❌ Error al hacer una puja:", error));
  };

  if (!auction) {
    return (
      <View style={styles.container}>
        <Text>Cargando detalles de la subasta...</Text>
      </View>
    );
  }

  const handleAuctionEnd = (id) => {
    setAuctionsOver(prev => ({ ...prev, [id]: true }));
  };
  
  return (
    <View style={styles.container}>
      <NavbarBack />
      <ScrollView>
        <View style={styles.scrollPadding}>
          <Image 
            source={auction.image ? { uri: auction.image } : require('../assets/icon.png')} 
            style={styles.image} 
            resizeMode='center' 
          />
          <View style={styles.containerPrincipal}>
            <Text style={styles.title}>{auction.title}</Text>
            <Text style={styles.descripcionTitulo}>Descripción</Text>
            <Text style={styles.descripcion}>{auction.descripcion}</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={styles.precio1}>Oferta Actual: </Text>
              <Text style={styles.precio2}>${auction.currentBid} MXN</Text>
            </View>
  
            <Timer auctionId={auctionId} onTimeEnd={() => handleAuctionEnd(auctionId)} />
  
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.bidButton, auctionsOver[auctionId] && { backgroundColor: '#ccc' }]}
                onPress={() => placeBid(auction.currentBid + 5)}
                disabled={auctionsOver[auctionId]}
              >
                <Text style={styles.buttonText}>Pujar +5</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={[styles.bidButton, auctionsOver[auctionId] && { backgroundColor: '#ccc' }]}
                onPress={() => placeBid(auction.currentBid + 25)}
                disabled={auctionsOver[auctionId]}
              >
                <Text style={styles.buttonText}>Pujar +25</Text>
              </TouchableOpacity>
            </View>
  
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.bidButton, auctionsOver[auctionId] && { backgroundColor: '#ccc' }]}
                onPress={() => placeBid(auction.currentBid + 50)}
                disabled={auctionsOver[auctionId]}
              >
                <Text style={styles.buttonText}>Pujar +50</Text>
              </TouchableOpacity>
  
              <TouchableOpacity
                style={[styles.bidButton, auctionsOver[auctionId] && { backgroundColor: '#ccc' }]}
                onPress={() => placeBid(auction.currentBid + 100)}
                disabled={auctionsOver[auctionId]}
              >
                <Text style={styles.buttonText}>Pujar +100</Text>
              </TouchableOpacity>
            </View>
            {auctionsOver[auctionId] && <Text style={styles.tiempoTerminado}>La subasta ha finalizado</Text>}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffff3' },
  image: { marginTop: 30, marginBottom: 20, height: 350, width: '80%', alignSelf: 'center', borderRadius: 20 },
  scrollPadding: { paddingBottom: 140 },
  containerPrincipal: { width: '80%', alignSelf: 'center' },
  title: { fontSize: 30, fontFamily: 'MadeTommyBold', color: '#1a1a1a', marginBottom: 10 },
  precio2: { color: '#44634E', fontSize: 20, fontFamily: 'MadeTommy' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  bidButton: { backgroundColor: '#44634E', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, width: '48%', },
  buttonText: { color: '#fffff3', fontSize: 18, fontWeight: 'bold', alignSelf: 'center' },
  tiempoTerminado: { fontSize: 18, fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: 20 },
  descripcionTitulo: { fontSize: 20, fontFamily: 'MadeTommyBold', textAlign: 'justify', color: '#634455', marginVertical: 0 },
  descripcion: { fontSize: 14, fontFamily: 'MalgunGothic', textAlign: 'justify', color: '#634455', marginBottom:20 },
});

export default AuctionDetail;
