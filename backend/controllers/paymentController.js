const kafka = require("../config/kafka");  // Kafka yapılandırmasını import et

const paymentController = {
  // Ödeme işlemi oluşturma
  async createPayment(req, res) {
    const { userId, amount, productSnapshots } = req.body;    
    try {
      // Kafka'ya ödeme isteğini gönder
      const paymentEvent = { userId, amount, date: new Date(), productSnapshots };
      
      // Kafka producer'ını kullanarak ödeme isteğini gönder
      await kafka.producer.send({
        topic: "payment-request",  // Kafka'ya gönderilecek topic adı
        messages: [
          {
            value: JSON.stringify(paymentEvent),  // Ödeme olayını JSON formatında Kafka'ya gönder
          },
        ],
      });

      // Başarılı bir şekilde ödeme isteği gönderildiyse
      res.status(200).json({ success: true, message: "Payment request sent" });
    } catch (error) {
      console.error("Payment request failed:", error);
      res.status(500).json({ success: false, message: "Payment request failed" });
    }
  },
};

module.exports = paymentController;
