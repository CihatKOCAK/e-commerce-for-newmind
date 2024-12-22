const Basket = require("../models/Basket");

const addItemToBasket = async (userId, productId, quantity) => {
  let basket = await Basket.findOne({ userId });

  if (!basket) {
    basket = new Basket({ userId, items: [{ productId, quantity }] });
  } else {
    const existingItem = basket.items.find((item) => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      basket.items.push({ productId, quantity });
    }
  }

  await basket.save();
  return Basket.findOne({ userId }).populate("items.productId");
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
    basket.items = basket.items.filter((item) => item.productId.toString() !== productId);
  } else {
    product.quantity = quantity;
  }

  await basket.save();
  return Basket.findOne({ userId }).populate("items.productId");
};

const getBasket = async (userId) => {
  const basket = await Basket.findOne({ userId }).populate("items.productId");

  if (!basket) return null;

  // Null olan ürünleri filtrele --> nullsa item kaldırılmış demektir
  basket.items = basket.items.filter((item) => item.productId !== null);

  // Sepeti güncelle
  await basket.save();

  return basket;
};


const clearBasket = async (userId) => {
  await Basket.deleteOne({ userId });
};

const removeItemFromBasket = async (userId, productId) => {
  const basket = await Basket.findOne({ userId });
  if (!basket) {
    throw new Error("Basket not found");
  }

  basket.items = basket.items.filter((item) => item.productId.toString() !== productId);
  await basket.save();
  return Basket.findOne({ userId }).populate("items.productId");
};

module.exports = {
  addItemToBasket,
  getBasket,
  clearBasket,
  updateQuantity,
  removeItemFromBasket
};
