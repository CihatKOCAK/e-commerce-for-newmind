const { producer } = require('../producer');
const topics = require('../topics');

const handlePaymentCompleted = async (message, io) => {
  const paymentEvent = JSON.parse(message.value.toString());
  console.log(`Received payment event id ${paymentEvent.paymentId} with status ${paymentEvent.status}`);

  if (paymentEvent.status === "success") {
    io.emit("paymentStatus", {
      userId: paymentEvent.userId,
      status: "success",
      message: "Payment was successful!",
    });

    await producer.send({
      topic: topics.INVOICE_START,
      messages: [
        {
          value: JSON.stringify({
            userId: paymentEvent.userId,
            amount: paymentEvent.amount,
            paymentId: paymentEvent.paymentId,
            productSnapshots: paymentEvent.productSnapshots,
          }),
        },
      ],
    });
  } else {
    io.emit("paymentStatus", {
      userId: paymentEvent.userId,
      status: "failed",
      message: "Payment failed. Please try again.",
    });
  }
};

module.exports = handlePaymentCompleted;
