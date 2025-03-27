import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import NavbarBack from '../components/NavbarBack';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const PerfilCreador = () => {
    const route = useRoute();
    const { id } = route.params || {};
    
    console.log("🟢 PerfilCreador recibió ID:", id);

    const [creador, setCreador] = useState(null);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            console.error("❌ Error: ID del creador no recibido");
            return;
        }

        const fetchCreador = async () => {
            try {
                const response = await axios.get(`http://192.168.1.32:4000/user/${id}`);
                //console.log("✅ Datos del creador:", response.data);
                setCreador(response.data[0]);
            } catch (error) {
                console.error("❌ Error al obtener creador:", error);
            }
        };

        const fetchProductos = async () => {
            try {
                const response = await axios.get(`http://192.168.1.32:4000/creatorartworks/${id}`);
                //console.log(" Productos del creador:", response.data);
                setProductos(response.data);
            } catch (error) {
                console.error("❌ Error al obtener productos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCreador();
        fetchProductos();
    }, [id]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (!creador) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>No se encontró el creador</Text>
            </View>
        );
    }

    return (
        <View style={{ backgroundColor: '#FFFFF3', flex: 1 }}>
            <NavbarBack />
            <FlatList
                ListHeaderComponent={
                    <View style={styles.centerContainer}>
                        <Image source={{ uri: creador.image }} style={styles.image} />
                        <Text style={styles.nombre}>{creador.name} {creador.lastname}</Text>
                        <Text style={styles.informacionTitulo}>Información</Text>
                        <Text style={styles.informacion}>{creador.email}</Text>
                        <Text style={styles.informacion}>{creador.city} {creador.state}</Text>
                        <Text style={styles.tituloProductos}>Productos de {creador.name}</Text>
                    </View>
                }
                data={productos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductCard 
                        key={item.id.toString()}
                        nombre={item.title} 
                        precio={item.firstprice} 
                        imageSource={item.image ? { uri: item.image } : require('../assets/producto.jpg')} 
                        productId={item.id}  
                        descripcion={item.descripcion}
                        categoria={item.categoriaid}
                    />
                )}
                contentContainerStyle={styles.containerPrincipal}
            />
        </View>
    );
};

export default PerfilCreador;

const styles = StyleSheet.create({
    containerPrincipal: {
        paddingTop: 20,
        paddingBottom: 140,
    },
    centerContainer: {
        alignItems: 'center',
        marginTop: 30,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#44634E',
    },
    nombre: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#1A1A1A',
    },
    informacionTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#634455',
        margin: 10,
    },
    informacion: {
        fontSize: 15,
        color: '#634455',
        margin: 2,
    },
    tituloProductos: {
        fontSize: 20,
        marginLeft: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginTop: 60,
        marginBottom: 10,
        color: '#1A1A1A',
    },
    noProducts: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

