const { Kafka } = require('kafkajs');
const config = require('../../config/kafka');

const kafka = new Kafka({
  clientId: config.clientId,
  brokers: config.brokers,
});

module.exports = kafka;
