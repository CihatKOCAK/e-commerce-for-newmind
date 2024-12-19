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

// her get işlemi yapıldığında viewCount'u 1 arttır
productSchema.methods.incrementViewCount = async function () {
  this.viewCount += 1;
  await this.save();
};

module.exports = mongoose.model("Product", productSchema);
