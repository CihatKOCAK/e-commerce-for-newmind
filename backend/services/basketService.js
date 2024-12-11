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
};
