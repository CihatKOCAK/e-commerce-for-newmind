const { Kafka, Partitioners } = require('kafkajs');

// Kafka client'ını ve producer'ı yapılandırma
const kafka = new Kafka({
  clientId: "backend-service", // Servisinizi burada tanımlayın
  brokers: ["kafka:9092"], // Kafka broker'ının adresi. Docker compose'da Kafka'nın konteyner adı "kafka" olarak belirlenmişti.
});

// Kafka producer ve consumer oluşturma
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner }); // Üreticiyi oluştur
const consumer = kafka.consumer({ groupId: 'backend-group' }); // Tüketiciyi oluştur

// Kafka'ya bağlanmak için bir fonksiyon
const connectKafka = async (io) => {
  try {
    // Kafka producer'ı başlat
    await producer.connect();
    console.log("Kafka producer connected");

    // Kafka consumer'ı başlat
    await consumer.connect();
    console.log("Kafka consumer connected");

    // Consumer'ı belirli bir konuya abone et
    await consumer.subscribe({ topic: "payment-completed", fromBeginning: true });

    // Consumer'ın mesajları almasını sağla
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const paymentEvent = JSON.parse(message.value.toString());
        console.log(`Received payment event id ${paymentEvent.paymentId} with status ${paymentEvent.status}`);

        // Ödeme başarılıysa
        if (paymentEvent.status === "success") {
          console.info("Payment successful");

          // Socket.io ile kullanıcıya ödeme başarılı mesajı gönder
          io.emit("paymentStatus", {
            userId: paymentEvent.userId,
            status: "success",
            message: "Payment was successful!",
          });

          // Kafka'ya yeni bir mesaj gönder
          await producer.send({
            topic: "invoice-start", // Fatura oluşturulduğunda gönderilecek topic
            messages: [
              {
                value: JSON.stringify({
                  userId: paymentEvent.userId,
                  amount: paymentEvent.amount,
                  paymentId: paymentEvent.paymentId,
                  productSnapshots: paymentEvent.productSnapshots,
                }),
              },
            ],
          });
        } else {
          console.error("Payment failed");

          // Socket.io ile kullanıcıya ödeme başarısız mesajı gönder
          io.emit("paymentStatus", {
            userId: paymentEvent.userId,
            status: "failed",
            message: "Payment failed. Please try again.",
          });
        }
      },
    });
  } catch (err) {
    console.error("Error connecting to Kafka:", err);
  }
};

// Kafka bağlantı ve işlem için kullanılan nesneleri dışa aktar
module.exports = {
  producer,
  consumer,
  connectKafka,
};
