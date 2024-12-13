const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  products: { type: Array, required: true }, //snapshot of products
});

module.exports = mongoose.model("Invoice", invoiceSchema);
