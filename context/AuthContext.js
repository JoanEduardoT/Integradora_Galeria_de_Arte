import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');
      
      if (token && userId) {
        setUser({ token, userId });
      }
    } catch (error) {
      console.log('Error al recuperar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (token, userId) => {
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userId', userId.toString());
    setUser({ token, userId });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
