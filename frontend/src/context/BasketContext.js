import React, { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/localStorageUtils";
import APIService_Basket from "../services/Api/BasketService";
import { useAuth } from "./AuthContext";
import { showSuccessToast, showErrorToast } from "../utils/toastify";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const { user } = useAuth();
  const [basket, setBasket] = useState([]);

  const syncBasketWithBackend = async () => {
    try {
      const basketItemsFromLocal = storage.getItem("basket") || [];
      let basketItemsFromDB = [];

      if (user) {
        const res = await APIService_Basket.getBasket();
        basketItemsFromDB = res.data.basket?.items || [];
      }

      // Local ve backend sepetlerini birleştir
      const mergedBasket = [...basketItemsFromLocal, ...basketItemsFromDB];

      // Benzersiz ürünleri ve miktarları birleştir
      const uniqueBasket = mergedBasket.reduce((acc, item) => {
        const existingItem = acc.find(
          (basketItem) => basketItem.productId._id === item.productId._id
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
          return acc;
        }
        return [...acc, item];
      }, []);

      const items = uniqueBasket.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      if (user) {
        await APIService_Basket.createBasket(items);
      }

      // LocalStorage'ı temizle ve state'i güncelle
      storage.removeItem("basket");
      setBasket(uniqueBasket);
    } catch (err) {
      console.error("Error while syncing basket:", err);
      showErrorToast("Failed to sync basket. Please try again.");
    }
  };

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        if (user) {
          if (storage.getItem("basket")) {
            await syncBasketWithBackend();
          } else {
            const res = await APIService_Basket.getBasket();
            setBasket(res.data.basket?.items || []);
          }
        } else {
          const storedBasket = storage.getItem("basket") || [];
          setBasket(storedBasket);
        }
      } catch (err) {
        console.error("Error while fetching basket data:", err);
        showErrorToast("Failed to load basket data.");
      }
    };

    fetchBasket();
    // eslint-disable-next-line
  }, [user]);

  const saveBasket = (updatedBasket) => {
    setBasket(updatedBasket);
    storage.setItem("basket", updatedBasket);
  };

  const addToBasket = async (product) => {
    try {
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
          await APIService_Basket.addItemToBasket(product._id, 1);
        }
      }

      showSuccessToast("Product added to basket!");
    } catch (err) {
      console.error("Error adding item to basket:", err);
      showErrorToast("Failed to add product to basket.");
    }
  };

  const updateBasketItem = async (updatedItem) => {
    try {
      const updatedBasket = basket.map((basketItem) =>
        basketItem.productId._id === updatedItem.productId._id
          ? { ...basketItem, quantity: updatedItem.quantity }
          : basketItem
      );

      saveBasket(updatedBasket);

      if (user) {
        await APIService_Basket.updateQuantity(
          updatedItem.productId._id,
          updatedItem.quantity
        );
      }
    } catch (err) {
      console.error("Error updating basket item:", err);
      showErrorToast("Failed to update basket item.");
    }
  };

  const removeFromBasket = async (productId) => {
    try {
      const updatedBasket = basket.filter(
        (item) => item.productId._id !== productId
      );
      saveBasket(updatedBasket);

      if (user) {
        await APIService_Basket.removeFromBasket(productId);
      }

      showSuccessToast("Product removed from basket!");
    } catch (err) {
      console.error("Error removing item from basket:", err);
      showErrorToast("Failed to remove product from basket.");
    }
  };

  const clearBasket = async () => {
    try {
      saveBasket([]);
      if (user) {
        await APIService_Basket.clearBasket();
      }

      showSuccessToast("Basket cleared!");
    } catch (err) {
      console.error("Error clearing basket:", err);
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
