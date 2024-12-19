const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  viewCount: { type: Number, default: 0 }, // Ürün görüntülenme sayısı
  rate: { type: Number, default: 0 }, // Ürün değerlendirme puanı
  rateCount: { type: Number, default: 0 },
  image: { type: String }, // Ürün görsel URL'si
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
