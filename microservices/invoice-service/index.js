const runProducers = require("./producers/paymentProducer");
const connectDB = require("./config/db");
const { connectInvoiceKafka } = require("./config/invoiceKafka");

const startService = async () => {
  try {
    await connectDB(); //payment-service
    console.log("Connected to MongoDB for Payment-Service");

    // Payment-Service çalışan bir mikroservis olarak aktif durumda
    await runProducers();

    // Invoice-Service için Kafka consumer'ını başlat
    await connectInvoiceKafka();

    console.log("Payment-Service and Invoice-Service are running and ready");
  } catch (error) {
    console.error("Error starting Payment-Service:", error);
  }
};

startService();
