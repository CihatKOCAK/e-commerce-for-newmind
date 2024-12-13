const Payment = require("../models/paymentModel");
const { sendPaymentSuccess } = require("../producers/paymentProducer");

const processPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  await payment.save();

  console.log("Payment processed successfully:", payment);

  // Kafka mesajı gönder
  await sendPaymentSuccess(paymentData);

  return payment;
};

module.exports = { processPayment };
