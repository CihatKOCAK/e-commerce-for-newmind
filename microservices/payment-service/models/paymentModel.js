const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  productSnapshots: { type: Array, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Payment", paymentSchema);
