// microservices/payment-service/config/kafka.js
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
        console.log(`Received payment event id ${paymentEvent.paymentId} with status ${paymentEvent.status}`);

        // Ödeme işlemini gerçekleştir
        const paymentProcessed = await processPayment(paymentEvent);
        console.log(`Payment processed: ${JSON.stringify(paymentProcessed.success)}`);

        let value = "";

        //delay 2 seconds
        await new Promise((resolve) => setTimeout(resolve
        , 2000));

        // Ödeme başarılıysa "payment-completed" mesajı gönder
        if (paymentProcessed.success) {
          value = JSON.stringify({
            paymentId: paymentProcessed.paymentId,
            productSnapshots: paymentEvent.productSnapshots,
            amount: paymentEvent.amount,
            userId: paymentEvent.userId,
            status: "success",
          });
        }
        else {
          value = JSON.stringify({
            paymentId: paymentProcessed.paymentId,
            status: "failed",
          });
        }
        await producer.send({
          topic: "payment-completed", // Ödeme tamamlandığında gönderilecek topic
          messages: [
            {
              value: value,
            },
          ],
        });
           
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
