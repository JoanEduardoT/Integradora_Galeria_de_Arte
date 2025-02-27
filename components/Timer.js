import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Timer from './Timer'; // Asegúrate de que Timer está importado correctamente

const AuctionScreen = ({ auctionId }) => {
  console.log("Auction ID recibido en frontend:", auctionId); // Verificar si auctionId es correcto

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!auctionId) {
      console.error("❌ auctionId es undefined",auctionId);
      return;
    }

    fetch(`http://localhost:4000/auction/${auctionId}`)
      .then(response => response.json())
      .then(data => {
        console.log("✅ Respuesta del servidor en frontend:", data);
        if (data.timeLeft !== undefined) {
          setTimeLeft(data.timeLeft);
        }
      })
      .catch(error => console.error("❌ Error al obtener la subasta:", error));
  }, [auctionId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prevTime => Math.max(prevTime - 1, 0)); // Evita valores negativos
      }, 1000);

      return () => clearInterval(interval); // Limpiar intervalo al desmontar
    }
  }, [timeLeft]);

  return (
    <View>
      <Text>Subasta en curso</Text>
      {timeLeft !== null ? (
        <Timer timeLeft={timeLeft} /> // Asegúrate de que el componente Timer esté funcionando correctamente
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

export default AuctionScreen;
