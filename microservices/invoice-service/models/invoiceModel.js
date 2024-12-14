const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  productSnapshots: { type: Array, required: true }, //snapshot of products
  paymentId: { type: String, required: true },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
