const kafka = require("../config/kafka");  // Kafka yapılandırmasını import et

const paymentController = {
  // Ödeme işlemi oluşturma
  async createPayment(req, res) {
    const { userId, amount, productSnapshots } = req.body;
    console.log("Payment request received:", req.body);
    
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

  // Ödeme işlemi için Callback (Kafka Consumer tarafında işlem sonrası yapılacak aksiyonlar)
  async processPaymentCallback(req, res) {
    const { paymentId, status, transactionId } = req.body;
    console.log("Payment status received:", req.body);
    
    try {
      // Burada Kafka'dan gelen ödeme durumu işlenebilir
      // Örneğin, ödeme başarılıysa bir işlem yapabilirsiniz
      if (status === "success") {
        console.log(`Payment ${paymentId} successfully completed with transaction ID: ${transactionId}`);
        // Ödeme başarılı olduğunda yapılacak işlemler
      } else {
        console.log(`Payment ${paymentId} failed with status: ${status}`);
        // Ödeme başarısız olduğunda yapılacak işlemler
      }

      res.status(200).json({ success: true, message: "Payment status processed" });
    } catch (error) {
      console.error("Error processing payment status:", error);
      res.status(500).json({ success: false, message: "Payment status processing failed" });
    }
  },
};

module.exports = paymentController;
