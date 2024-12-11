const Basket = require("../models/Basket");

const addItemToBasket = async (userId, productId, quantity) => {
  let basket = await Basket.findOne({ userId });

  if (!basket) {
    // Sepet yoksa, yeni bir sepet oluştur
    basket = new Basket({ userId, items: [{ productId, quantity }] });
  } else {
    // Sepette mevcut ürün var mı kontrol et
    const existingItem = basket.items.find((item) => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity; // Mevcut ürünü güncelle
    } else {
      basket.items.push({ productId, quantity }); // Yeni ürün ekle
    }
  }

  await basket.save();
  return basket;
};

const updateQuantity = async (userId, productId, quantity) => {
  const basket = await Basket.findOne({ userId });
  if (!basket) {
    throw new Error("Basket not found");
  }

  const product = basket.items.find((item) => item.productId.toString() === productId);
  if (!product) {
    throw new Error("Product not found in basket");
  }

  if (quantity <= 0) {
    // Ürün miktarı 0 veya daha düşükse, sepetten çıkar
    basket.items = basket.items.filter(item => item.product.toString() !== productId);
  } else {
    // Ürün miktarını güncelle
    product.quantity = quantity;
  }

  await basket.save();
  return basket;
};

const getBasket = async (userId) => {
  const basket = await Basket.findOne({ userId }).populate("items.productId");
  return basket;
};

const clearBasket = async (userId) => {
  await Basket.deleteOne({ userId });
};

module.exports = {
  addItemToBasket,
  getBasket,
  clearBasket,
  updateQuantity
};
