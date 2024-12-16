const kafka = require('./client');

const consumer = kafka.consumer({ groupId: 'backend-group' });

const connectConsumer = async () => {
  try {
    await consumer.connect();
    console.log("Kafka consumer connected");
  } catch (err) {
    console.error("Error connecting Kafka consumer:", err);
  }
};

module.exports = {
  consumer,
  connectConsumer,
};
