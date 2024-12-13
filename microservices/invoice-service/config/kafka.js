const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'invoice-service',
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({ groupId: 'invoice-group' });

const connectInvoiceKafka = async () => {
  try {
    // Kafka consumer'ı başlat
    await consumer.connect();
    console.log("Kafka consumer connected for invoice service");

    // Consumer'ı invoice-request topic'ine abone et
    await consumer.subscribe({ topic: "invoice-request", fromBeginning: true });

    // Consumer'ın mesajları almasını sağla
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const paymentEvent = JSON.parse(message.value.toString());
        console.log(`Received invoice request for payment: ${JSON.stringify(paymentEvent)}`);

        // Burada fatura işlemi yapılabilir
        await processInvoice(paymentEvent);
      },
    });
  } catch (err) {
    console.error("Error connecting to Kafka for invoice service:", err);
  }
};

// Fatura işlemi
const processInvoice = async (paymentEvent) => {
  try {
    // Burada fatura oluşturma işlemi yapılabilir
    console.log("Processing invoice for payment:", paymentEvent);
    // Örnek olarak fatura oluşturma işlemi yapılabilir
    // await invoiceModel.create(paymentEvent);
  } catch (error) {
    console.error("Error processing invoice:", error);
  }
};

module.exports = { connectInvoiceKafka };
