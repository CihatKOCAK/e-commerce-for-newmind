const { consumer } = require('./consumer');
const topics = require('./topics');
const handlePaymentCompleted = require('./events/paymentCompletedHandler');

const connectKafka = async (io) => {
  try {
    await consumer.subscribe({ topic: topics.PAYMENT_COMPLETED, fromBeginning: true });

    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (topic === topics.PAYMENT_COMPLETED) {
          await handlePaymentCompleted(message, io);
        }
      },
    });

    console.log("Kafka consumer is running");
  } catch (err) {
    console.error("Error connecting to Kafka:", err);
  }
};

module.exports = connectKafka;
