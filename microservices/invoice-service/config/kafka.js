const { Kafka, Partitioners } = require("kafkajs");
const { processInvoice } = require("../services/invoiceService");

const kafka = new Kafka({
  clientId: "invoice-service", // Kafka client ID
  brokers: ["kafka:9092"], // Kafka broker adresi
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: "invoice-group" });

const connectKafka = async () => {
  try {
    // Kafka consumer'ı başlat
    await consumer.connect();
    console.log("Kafka consumer connected");

    // Kafka producer'ı başlat
    await producer.connect();
    console.log("Kafka producer connected");

    // "payment-request" topic'ine abone ol
    await consumer.subscribe({ topic: "payment-completed", fromBeginning: true });

    // Mesajları işle
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const invoiceEvent = JSON.parse(message.value.toString());
        console.log(`Received invoice event: ${JSON.stringify(invoiceEvent)}`);

        // Fatura işlemini gerçekleştir
        const invoiceProcessed = await processInvoice(invoiceEvent);

        // Ödeme başarılıysa "payment-completed" mesajı gönder
        if (invoiceProcessed.success) {
          await producer.send({
            topic: "invoice-completed", // Fatura oluturulduğunda  gönderilecek topic
            messages: [
              {
                value: JSON.stringify({
                  invoiceId: invoiceEvent.invoiceId,
                  status: "success",
                }),
              },
            ],
          });
          console.log("Invoice completed message sent to Kafka");
          console.info("Invoice processed successfully mail sent to user");
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
