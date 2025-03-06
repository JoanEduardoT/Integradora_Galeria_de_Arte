import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Timer = ({ auctionId }) => {
  console.log("Auction ID recibido en Timer:", auctionId);

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!auctionId) {
      console.error("❌ auctionId es undefined o null en Timer");
      return;
    }

    fetch(`http://192.168.38.3:4000/auction/${auctionId}`)
      .then(response => response.json())
      .then(data => {
        console.log("✅ Respuesta del servidor en Timer:", data);
        if (data.timeLeft !== undefined) {
          setTimeLeft(data.timeLeft);
        }
      })
      .catch(error => console.error("❌ Error al obtener la subasta:", error));
  }, [auctionId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prevTime => Math.max(prevTime - 1, 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft]);

  // Función para convertir segundos a HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View>
      <Text>Tiempo restante:</Text>
      {timeLeft !== null ? <Text>{formatTime(timeLeft)}</Text> : <Text>Cargando...</Text>}
    </View>
  );
};

export default Timer;
