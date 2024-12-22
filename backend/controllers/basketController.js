const basketService = require("../services/basketService");

module.exports = {
  async addItem(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // JWT ile alınan kullanıcı ID

    try {
      const basket = await basketService.addItemToBasket(userId, productId, quantity);
      res.status(200).json({ success: true, basket });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getBasket(req, res) {
    const userId = req.user.id;

    try {
      const basket = await basketService.getBasket(userId);
      if (!basket) {
        return res.status(200).json({ success: true, basket: [] });
      }
      res.status(200).json({ success: true, basket });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateQuantity(req, res) {
    const { quantity } = req.body;
    const userId = req.user.id;
    const productId = req.params.productId
  
    try {
      const basket = await basketService.updateQuantity(userId, productId, quantity);
      res.status(200).json({ success: true, basket });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async removeItem(req, res) {
    const userId = req.user.id;
    const productId = req.params.productId;

    try {
      const basket = await basketService.removeItemFromBasket(userId, productId);
      res.status(200).json({ success: true, basket });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  async clearBasket(req, res) {
    const userId = req.user.id;

    try {
      await basketService.clearBasket(userId);
      res.status(200).json({ success: true, message: "Sepet temizlendi" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
