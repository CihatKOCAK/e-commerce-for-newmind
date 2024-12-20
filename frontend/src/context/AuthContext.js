import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorageUtils'; // storage'ı import edin
import { AuthService } from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // localStorage'dan kullanıcı bilgilerini okuma
  const storedUser = storage.getItem('user');

  // Eğer localStorage'da kullanıcı bilgisi varsa, başlangıçta bunu kullan
  const [user, setUser] = useState(storedUser);

  // Kullanıcı verisini güncelleme
  const login = (userData) => {
    setUser(userData);
  };

  const updateUserData = (userData) => {
    setUser(userData);
  };

  // Kullanıcıyı çıkış yaptığında temizleme
  const logout = () => {
    setUser(null); // Kullanıcıyı state'ten sil
  };

  useEffect(() => {
    // Eğer kullanıcı verisi değişirse, localStorage'ı güncelle
    if (user) {
      storage.setItem('user', user);
    } else {
      AuthService.clearToken();
      storage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
