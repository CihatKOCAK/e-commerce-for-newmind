const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }, // Ürün görsel URL'si
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
