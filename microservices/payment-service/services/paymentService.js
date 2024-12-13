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
      productSnapshots: paymentEvent.productSnapshots,
    });
    await payment.save();
    console.log(`Processing payment for user ${paymentEvent.userId} with amount ${paymentEvent.amount}`);

    // İşlem başarılıysa true döndür
    // Burada ödeme başarılıysa veya hatalıysa işlemi simüle edebilirsiniz
    return true; // Ödeme başarılı
  } catch (error) {

    console.error("Error processing payment:", error);
    // İşlem başarısızsa false döndür
    const payment = new Payment({
      userId: paymentEvent.userId,
      amount: paymentEvent.amount,
      status: "failed",
      date: new Date(),
      productSnapshots: paymentEvent.productSnapshots,
    });
    await payment.save();

    return false; // Ödeme başarısız
  }
};

module.exports = {
  processPayment,
};
