const kafka = require("../config/kafka");
const invoiceService = require("../services/invoiceService");

const consumer = kafka.consumer({ groupId: "invoice-group" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "payment-success", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const paymentEvent = JSON.parse(message.value.toString());
      console.log("Payment event received:", paymentEvent);

      // Fatura oluşturma işlemini tetikle
      await invoiceService.createInvoice(paymentEvent);
    },
  });
};

module.exports = runConsumer;
