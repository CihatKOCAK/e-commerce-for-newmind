const Payment = require("../models/paymentModel");

const processPayment = async (paymentEvent) => {
  try {
    // Ödeme işlemini gerçekleştir
    // Ödeme işlemini veritabanına kaydet
    const payment = new Payment({
      userId: paymentEvent.userId,
      amount: paymentEvent.amount,
      status: "completed",
      date: new Date(),
    });
    await payment.save();
    console.log(`Processing payment for user ${paymentEvent.userId} with amount ${paymentEvent.amount}`);

    console.log("payment new --> ", payment);
    // İşlem başarılıysa true döndür
    // Burada ödeme başarılıysa veya hatalıysa işlemi simüle edebilirsiniz
    return {
      success: true,
      message: "Payment processed successfully",
      paymentId: payment._id,
    }
  } catch (error) {

    console.error("Error processing payment:", error);
    // İşlem başarısızsa false döndür
    const payment = new Payment({
      userId: paymentEvent.userId,
      amount: paymentEvent.amount,
      status: "failed",
      date: new Date(),
    });
    await payment.save();

    return false; // Ödeme başarısız
  }
};

module.exports = {
  processPayment,
};
