const { consumer } = require('./consumer');
const topics = require('./topics');
const handlePaymentCompleted = require('./events/paymentCompletedHandler');
const { logInfo, logError } = require('../../utils/loggerUtil');

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

    logInfo('Kafka', 'Kafka connected');
  } catch (err) {
    logError('Kafka', `Kafka connection failed: ${err.message}`);
  }
};

module.exports = connectKafka;
