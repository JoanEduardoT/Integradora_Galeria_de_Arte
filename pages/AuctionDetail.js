import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Image, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import Timer from '../components/Timer';
import NavbarBack from '../components/NavbarBack'

//iconos
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
    setBidAmount('')
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

    <NavbarBack/>

    <ScrollView>
      <View style={styles.scrollPadding}>

        <Image source={require('../assets/icon.png')} style={styles.image} resizeMode='center'/>

        <View style={styles.containerPrincipal}>
          
          <Text style={styles.title}>{auction.title}</Text>

          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Text style={styles.precio1}>Precio Inicial: </Text>
            <Text style={styles.precio2}> ${auction.firstprice} MXN</Text>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
            <Text style={styles.precio1}>Oferta Actual: </Text>
            <Text style={styles.precio2}>${auction.currentBid} MXN</Text>
          </View>
          

          {artwork && (
            <>
              <Text style={styles.descripcionTitulo}>Descripcion</Text>
              {/* <Text>Nombre: {artwork.title || 'No disponible'}</Text> */}
              {/* <Text>Autor: {artwork.name || 'No disponible'}</Text> */}
              <Text style={styles.descripcion}>{artwork.descripcion || 'No disponible'}</Text>
              {auctionId ? <Timer auctionId={auctionId}/> :  <Text>No hay Informacion del tiempo restante</Text>}
            </>
          )}

          
          <View style ={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40,}}>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu puja"
              value={bidAmount}
              onChangeText={setBidAmount}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.boton}
              onPress={() => {
                if (bidAmount) {
                  placeBid(parseFloat(bidAmount));
                } else {
                  Alert.alert('Puja no válida', 'Por favor, ingresa una cantidad válida.');
                }
              }}
            >
              <FontAwesome5 name="arrow-right" size={20} color="#fffff3" />
            </TouchableOpacity>
          </View>
          

        </View>
        
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fffff3'
    },
    image:{
      marginTop: 30,
      marginBottom: 20,
      height: 350,
      width: '80%',
      alignSelf: 'center',
      borderRadius: 20,
      shadowColor: "black",
      shadowOffset: { height: 2},
      shadowOpacity: 0.3,
    },
    scrollPadding:{
      paddingBottom: 140
    },
    containerPrincipal:{
      width: '80%',
      alignSelf: 'center'
    },
    title: {
      fontSize: 30,
      fontFamily: 'MadeTommyBold',
      color: '#1a1a1a',
      marginBottom: 10
    },
    precio1:{
      color: '#1a1a1a', 
      fontSize: 20, 
      fontFamily: 'MadeTommyBold'
    },
    precio2:{
      color: '#44634E',
      fontSize: 20, 
      fontFamily: 'MadeTommy'
    },
    descripcionTitulo:{
      fontSize: 20,
      fontFamily: 'MadeTommyBold',
      textAlign: 'justify',
      color: '#634455',
      marginVertical: 10
    },
    descripcion:{
      fontFamily: 'MalgunGothic',
      color: '#634455',
      textAlign: 'justify',
      fontSize: 14
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
    input:{
      backgroundColor: '#FFF9F9',
      width: '68%',
      height: 50,
      paddingHorizontal: 20,
      borderRadius:10,
      shadowColor: "black",
      shadowOffset: { height: 0, width: 0},
      shadowOpacity: 0.3,
      shadowRadius: 2
    },
    boton:{
      width: '30%',
      height: 50,
      backgroundColor: '#44634E',
      borderRadius: 10,
      shadowColor: "black",
      shadowOffset: { height: 0, width: 0},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: '#fffff3',
      fontSize: 16,
    },
});

export default AuctionDetail;
