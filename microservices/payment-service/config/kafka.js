const { Kafka, Partitioners } = require("kafkajs");
const { processPayment } = require("../services/paymentService");

const kafka = new Kafka({
  clientId: "payment-service", // Kafka client ID
  brokers: ["kafka:9092"], // Kafka broker adresi
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: "payment-group" });

const connectKafka = async () => {
  try {
    // Kafka consumer'ı başlat
    await consumer.connect();
    console.log("Kafka consumer connected");

    // Kafka producer'ı başlat
    await producer.connect();
    console.log("Kafka producer connected");

    // "payment-request" topic'ine abone ol
    await consumer.subscribe({ topic: "payment-request", fromBeginning: true });

    // Mesajları işle
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const paymentEvent = JSON.parse(message.value.toString());
        console.log(`Received payment event: ${JSON.stringify(paymentEvent)}`);

        // Ödeme işlemini gerçekleştir
        const paymentProcessed = await processPayment(paymentEvent);

        // Ödeme başarılıysa "payment-completed" mesajı gönder
        if (paymentProcessed.success && paymentProcessed.paymentId) {
          await producer.send({
            topic: "payment-completed", // Ödeme tamamlandığında gönderilecek topic
            messages: [
              {
                value: JSON.stringify({
                  paymentId: paymentProcessed.paymentId,
                  status: "success",
                  amount: paymentEvent.amount,
                  userId: paymentEvent.userId,
                  productSnapshots: paymentEvent.productSnapshots,
                }),
              },
            ],
          });
          console.log("Payment completed message sent to Kafka");
        }
      },
    });
  } catch (err) {
    console.error("Error connecting to Kafka:", err);
  }
};

module.exports = {
  producer,
  consumer,
  connectKafka,
};
