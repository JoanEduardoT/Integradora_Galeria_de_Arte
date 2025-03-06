import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import Timer from '../components/Timer';
import NavbarBack from '../components/NavbarBack';

const AuctionDetail = ({ route, navigation }) => {
  const { auctionId } = route.params || {};
  const [auction, setAuction] = useState(null);
  const [artwork, setArtwork] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  // 🔄 Hook para obtener la información de la subasta
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await fetch(`http://192.168.38.3:4000/api/auction/${auctionId}`);
        const data = await response.json();
        console.log("📌 Datos recibidos:", data);
        setAuction(data);
        setArtwork(data || {});
      } catch (error) {
        console.error('❌ Error obteniendo la subasta:', error);
      }
    };

    fetchAuctionDetails(); 

    // 🔄 Actualizar cada 5 segundos
    const interval = setInterval(fetchAuctionDetails, 5000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [auctionId]);


  const placeBid = (bid) => {
    console.log("🚀 Enviando puja:", { auctionId, bidAmount: bid }); // 👀 Verificar antes de enviar

    fetch(`http://192.168.38.3:4000/api/bid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auctionId, bidAmount: bid })
    })
    .then(response => response.json())
    .then(data => {
        console.log("📩 Respuesta del servidor:", data); // 👀 Revisar la respuesta del servidor
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

  return (
    <View style={styles.container}>
      <NavbarBack />
      <ScrollView>
        <View style={styles.scrollPadding}>
          <Image source={require('../assets/icon.png')} style={styles.image} resizeMode='center' />
          <View style={styles.containerPrincipal}>
            <Text style={styles.title}>{auction.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={styles.precio1}>Precio Inicial: </Text>
              <Text style={styles.precio2}> ${auction.firstprice} MXN</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={styles.precio1}>Oferta Actual: </Text>
              <Text style={styles.precio2}>${auction.currentBid} MXN</Text>
            </View>
            {artwork && (
              <>
                <Text style={styles.descripcionTitulo}>Descripcion</Text>
                <Text style={styles.descripcion}>{artwork.descripcion || 'No disponible'}</Text>
                {auctionId ? <Timer auctionId={auctionId} /> : <Text>No hay información del tiempo restante</Text>}
              </>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.bidButton} onPress={() => placeBid(auction.currentBid + 5)}>
                <Text style={styles.buttonText}>Pujar +5</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bidButton} onPress={() => placeBid(auction.currentBid + 25)}>
                <Text style={styles.buttonText}>Pujar +25</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bidButton} onPress={() => placeBid(auction.currentBid + 50)}>
                <Text style={styles.buttonText}>Pujar +50</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bidButton} onPress={() => placeBid(auction.currentBid + 100)}>
                <Text style={styles.buttonText}>Pujar +100</Text>
              </TouchableOpacity>
            </View>
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
  precio1: { color: '#1a1a1a', fontSize: 20, fontFamily: 'MadeTommyBold' },
  precio2: { color: '#44634E', fontSize: 20, fontFamily: 'MadeTommy' },
  descripcionTitulo: { fontSize: 20, fontFamily: 'MadeTommyBold', color: '#634455', marginVertical: 10 },
  descripcion: { fontFamily: 'MalgunGothic', color: '#634455', fontSize: 14 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  bidButton: { backgroundColor: '#44634E', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 },
  buttonText: { color: '#fffff3', fontSize: 18, fontWeight: 'bold' }
});

export default AuctionDetail;
