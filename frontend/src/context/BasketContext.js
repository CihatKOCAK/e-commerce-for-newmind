import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/localStorageUtils';
import APIService_Basket from '../services/Api/BasketService';
import { useAuth } from './AuthContext';

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const { user } = useAuth(); // Kullanıcı bilgisi
  const [basket, setBasket] = useState([]);

  // Sepeti yükleme
  useEffect(() => {
    if (user) {
      // Kullanıcı varsa backend'den sepeti al
      APIService_Basket.getBasket()
        .then((data) => setBasket(data))
        .catch((err) => console.error('Error loading basket:', err));
    } else {
      // Kullanıcı yoksa localStorage'dan sepeti al
      const storedBasket = storage.getItem('basket') || [];
      setBasket(storedBasket);
    }
  }, [user]);

  // Sepeti güncelleme (localStorage veya backend'e kaydetme)
  const saveBasket = (updatedBasket) => {
    setBasket(updatedBasket);

    if (user) {
      // Kullanıcı varsa backend'e kaydet
      APIService_Basket.updateBasket(updatedBasket).catch((err) =>
        console.error('Error saving basket:', err)
      );
    } else {
      // Kullanıcı yoksa localStorage'a kaydet
      storage.setItem('basket', updatedBasket);
    }
  };

  // Sepete ürün ekleme
  const addToBasket = (item) => {
    const updatedBasket = [...basket, item];
    saveBasket(updatedBasket);
  };

  // Sepetteki ürünü güncelleme
  const updateBasketItem = (item) => {
    const updatedBasket = basket.map((basketItem) =>
      basketItem.id === item.id ? { ...basketItem, ...item } : basketItem
    );
    saveBasket(updatedBasket);
  };

  // Sepetten ürün çıkarma
  const removeFromBasket = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    saveBasket(updatedBasket);
  };

  // Sepeti temizleme
  const clearBasket = () => {
    saveBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{ basket, addToBasket, updateBasketItem, removeFromBasket, clearBasket }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
