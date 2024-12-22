import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/localStorageUtils";
import APIService_Basket from "../services/Api/BasketService";
import { useAuth } from "./AuthContext";
import { showSuccessToast } from "../utils/toastify";

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
        .catch((err) => (
          console.log("Error while fetching basket data: ", err)
        ));
    } else {
      const storedBasket = storage.getItem("basket") || [];
      setBasket(storedBasket);
    }
  }, [user]);

  const saveBasket = (updatedBasket) => {
    setBasket(updatedBasket);
    storage.setItem("basket", updatedBasket);
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
    showSuccessToast("Product added to basket!");
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

    showSuccessToast("Product removed from basket!");
  };

  const clearBasket = async () => {
    saveBasket([]);
    if (user) {
      APIService_Basket.clearBasket();
    }

    showSuccessToast("Basket cleared!");
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
