const { Kafka, Partitioners } = require('kafkajs');

// Kafka client'ını ve producer'ı yapılandırma
const kafka = new Kafka({
  clientId: "backend-service", // Servisinizi burada tanımlayın
  brokers: ["kafka:9092"], // Kafka broker'ının adresi. Docker compose'da Kafka'nın konteyner adı "kafka" olarak belirlenmişti.
});

// Kafka producer ve consumer oluşturma
const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner }); //üreticiyi oluştur
const consumer = kafka.consumer({ groupId: "backend-group" }); //tüketiciyi oluştur

// Kafka'ya bağlanmak için bir fonksiyon
const connectKafka = async () => {
  try {
    // Kafka producer'ı başlat
    await producer.connect();
    console.log("Kafka producer connected");

    // Kafka consumer'ı başlat
    await consumer.connect();
    console.log("Kafka consumer connected");

    // Consumer'ı belirli bir konuya abone et
    await consumer.subscribe({ topic: "payment-completed", fromBeginning: true });

    // Consumer'ın mesajları almasını sağla
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const paymentEvent = JSON.parse(message.value.toString());
        console.log(`Received payment event: ${JSON.stringify(paymentEvent)}`);
        // Burada consumer'ın alacağı mesajı işleyebilirsiniz

        await producer.send({
          topic: "invoice-request",
          messages: [
            {
              value: JSON.stringify({
                paymentId: paymentEvent.paymentId,
                status: "success",
                
              }),
            },
          ],
        });
      },
    });
  } catch (err) {
    console.error("Error connecting to Kafka:", err);
  }
};

// Kafka bağlantı ve işlem için kullanılan nesneleri dışa aktar
module.exports = {
  producer,
  consumer,
  connectKafka,
};
