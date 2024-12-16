const kafka = require("../config/kafka");  // Kafka yapılandırmasını import et
const { logError, logInfo } = require("../utils/loggerUtil");

const paymentController = {
  // Ödeme işlemi oluşturma
/**
 * @bodyParam 
 * {string} userId - Kullanıcı ID'si
 * {number} amount - Ödeme tutarı
 * {array} productSnapshots - Ürünlerin anlık durumu
 * {object} card - Kredi kartı bilgileri (name, number, expiry, cvc)
 **/ 
  async createPayment(req, res) {
    const { userId, amount, productSnapshots, card } = req.body;    
    try {
      // Kafka'ya ödeme isteğini gönder
      const paymentEvent = { userId, amount, card, productSnapshots };
      
      // Kafka producer'ını kullanarak ödeme isteğini gönder
      await kafka.producer.send({
        topic: "payment-request",  // Kafka'ya gönderilecek topic adı
        messages: [
          {
            value: JSON.stringify(paymentEvent),  // Ödeme olayını JSON formatında Kafka'ya gönder
          },
        ],
      });

      res.status(200).json({ success: true, message: "Payment request sent" });
      logInfo("paymentController.createPayment", `Payment request sent for user: ${userId}, amount: ${amount}`);
    } catch (error) {
      logError("paymentController.createPayment", `Payment request failed for user: ${userId}, amount: ${amount} - Error: ${error.message}`);
      res.status(500).json({ success: false, message: "Payment request failed" });
    }
  },
};

module.exports = paymentController;
