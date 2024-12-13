const Invoice = require("../models/invoiceModel");

const createInvoice = async (paymentEvent) => {
  const invoiceData = {
    userId: paymentEvent.userId,
    amount: paymentEvent.amount,
    date: paymentEvent.date,
    products: paymentEvent.productSnapshots,
  };

  const invoice = new Invoice(invoiceData);
  await invoice.save();

  console.log("Invoice created successfully:", invoice);
  return invoice;
};

module.exports = { createInvoice };
