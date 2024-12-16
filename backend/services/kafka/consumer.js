const { logInfo, logError } = require('../../utils/loggerUtil');
const kafka = require('./client');

const consumer = kafka.consumer({ groupId: 'backend-group' });

const connectConsumer = async () => {
  try {
    await consumer.connect();
    logInfo('Kafka', 'Kafka consumer connected');
  } catch (err) {
    logError('Kafka', `Kafka consumer connection failed: ${err.message}`);
  }
};

module.exports = {
  consumer,
  connectConsumer,
};
