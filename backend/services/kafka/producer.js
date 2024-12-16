const kafka = require('./client');
const { Partitioners } = require('kafkajs');

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Kafka producer connected");
  } catch (err) {
    console.error("Error connecting Kafka producer:", err);
  }
};

module.exports = {
  producer,
  connectProducer,
};
