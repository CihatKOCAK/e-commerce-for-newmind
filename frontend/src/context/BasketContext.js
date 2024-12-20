import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/localStorageUtils";
import APIService_Basket from "../services/Api/BasketService";
import { useAuth } from "./AuthContext";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const { user } = useAuth();
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    if (user) {
      APIService_Basket.getBasket()
        .then((res) => {
          const basketItems = res.data.basket?.items || [];
          setBasket(basketItems);
        })
        .catch((err) => console.error("Error loading basket:", err));
    } else {
      const storedBasket = storage.getItem("basket") || [];
      setBasket(storedBasket);
    }
  }, [user]);

  const saveBasket = (updatedBasket) => {
    setBasket(updatedBasket);
    if (!user) {
      storage.setItem("basket", updatedBasket);
    }
  };

  const addToBasket = async (product) => {
    const existingItem = basket.find(
      (basketItem) => basketItem.productId._id === product._id
    );
    if (existingItem) {
      await updateBasketItem({
        ...existingItem,
        quantity: existingItem.quantity + 1,
      });
    } else {
      const newItem = { productId: product, quantity: 1 };
      const updatedBasket = [...basket, newItem];
      saveBasket(updatedBasket);
      if (user) {
        APIService_Basket.addItemToBasket(product._id, 1);
      }
    }
  };

  const updateBasketItem = async (updatedItem) => {
    const updatedBasket = basket.map((basketItem) =>
      basketItem.productId._id === updatedItem.productId._id
        ? { ...basketItem, quantity: updatedItem.quantity }
        : basketItem
    );
    saveBasket(updatedBasket);

    if (user) {
      APIService_Basket.updateQuantity(
        updatedItem.productId._id,
        updatedItem.quantity
      );
    }
  };

  const removeFromBasket = async (productId) => {
    const updatedBasket = basket.filter(
      (item) => item.productId._id !== productId
    );
    saveBasket(updatedBasket);

    if (user) {
      APIService_Basket.removeFromBasket(productId);
    }
  };

  const clearBasket = async () => {
    saveBasket([]);
    if (user) {
      APIService_Basket.clearBasket();
    }
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        updateBasketItem,
        removeFromBasket,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
