const Invoice = require("../models/invoiceModel");

const processInvoice = async (invoiceEvent) => {
  try {
    const invoiceData = {
      userId: invoiceEvent.userId,
      amount: invoiceEvent.amount,
      date: new Date(),
      products: invoiceEvent.productSnapshots,
      paymentId: invoiceEvent.paymentId,
    };

    const invoice = new Invoice(invoiceData);
    await invoice.save();

    console.log(
      `Invoice created for user ${invoiceEvent.userId} with amount ${invoiceEvent.amount}`
    );

    return {
      success: true,
      message: "Invoice created successfully",
      invoiceId: invoice._id,
    };
  } catch (error) {
    console.error("Error creating invoice:", error);
    return {
      success: false,
      message: "Invoice creation failed",
      error: error,
    }
  }
};

module.exports = { processInvoice };
