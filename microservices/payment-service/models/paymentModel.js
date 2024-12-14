const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  card: {
    name: { type: String, required: true },
    number: { type: String, required: true },
    expiry: { type: String, required: true },
    cvc: { type: String, required: true },
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
