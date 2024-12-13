const kafka = require("../config/kafka");

const sendPaymentSuccess = async (paymentEvent) => {
  try {
    await kafka.producer.send({
      topic: "payment-success",
      messages: [
        { 
          value: JSON.stringify(paymentEvent) 
        },
      ],
    });
    console.log("Payment success event sent:", paymentEvent);
  } catch (error) {
    console.error("Error sending payment success event:", error);
  }
};

module.exports = { sendPaymentSuccess };
