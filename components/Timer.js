import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const Timer = ({ auctionId, onTimeEnd }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [hasEnded, setHasEnded] = useState(false); 

  useEffect(() => {
    if (!auctionId) return;

    fetch(`http://192.168.1.79:4000/auction/${auctionId}`)
      .then(response => response.json())
      .then(data => {
        if (data.timeLeft !== undefined) {
          setTimeLeft(Math.max(data.timeLeft, 0));
        }
      })
      .catch(error => console.error("❌ Error al obtener la subasta:", error));
  }, [auctionId]);

  useEffect(() => {
    if (timeLeft === 0 && onTimeEnd) {
      onTimeEnd(); // ✅ Solo se llama cuando llega a 0
    }
  
    if (timeLeft === null || timeLeft <= 0) return;
  
    const interval = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [timeLeft]); 
  
  

  const formatTime = (seconds) => {
    if (seconds === null) return "Cargando...";
    if (seconds <= 0) return "Tiempo Terminado";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <View>
      <Text>Tiempo restante:</Text>
      <Text>{formatTime(timeLeft)}</Text>
    </View>
  );
};

export default Timer;
