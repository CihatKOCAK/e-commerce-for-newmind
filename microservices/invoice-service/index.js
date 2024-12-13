const { connectKafka } = require("./config/kafka");
const connectDB = require("./config/db");

const startService = async () => {
  try {
    await connectDB(); // MongoDB bağlantısı
    console.log("Connected to MongoDB for Payment-Service");

    // Kafka bağlantısını başlat
    await connectKafka();

    console.log("Payment-Service is running and ready");
  } catch (error) {
    console.error("Error starting Payment-Service:", error);
  }
};

startService();
