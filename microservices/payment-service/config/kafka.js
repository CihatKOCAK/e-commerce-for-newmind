const { Kafka, Partitioners } = require("kafkajs");
const { processPayment } = require("../services/paymentService");

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["kafka:9092"]
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

const consumer = kafka.consumer({ groupId: "payment-group" });

const connectKafka = async () => {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected");

    await producer.connect();
    console.log("Kafka producer connected");

    await consumer.subscribe({ topic: "payment-request", fromBeginning: true });

    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const paymentEvent = JSON.parse(message.value.toString());
        console.log(`Received payment event: ${JSON.stringify(paymentEvent)}`);

        await processPayment(paymentEvent);
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
