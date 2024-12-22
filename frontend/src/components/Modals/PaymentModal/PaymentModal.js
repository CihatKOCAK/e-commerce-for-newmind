import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import "./PaymentModal.css";
import FormComponent from "../../Form/FormComponent";
import socket from "../../../services/SocketService";
import APIService_Payment from "../../../services/Api/PaymentService";

const PaymentModal = ({ isOpen, onClose, basket, onPaymentSuccess }) => {

  const productsSnapshots = basket.map((item) => (item.productId));
  const totalPayment = basket.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  ).toFixed(2);

  const [paymentData, setPaymentData] = useState({
    amount: totalPayment,
    productSnapshots: productsSnapshots,
    card: {
      name: "Cihat KOÇAK",
      number: "2544 4578 4452 1124",
      expiry: "12/53",
      cvc: 123,
    },
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Soket bağlantısını dinle
    const handlePaymentStatus = (data) => {
      setPaymentStatus(data);
      data.status === "success" && onPaymentSuccess();
    };

    socket.on("paymentStatus", handlePaymentStatus);

    return () => {
      socket.off("paymentStatus", handlePaymentStatus);
    };
    // eslint-disable-next-line
  }, [onClose]);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Ödeme işlemi başlatılır
      const response = await APIService_Payment.makePayment(paymentData);

      if (response.status === 200) {
        console.log("Payment initiated successfully");
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      setPaymentStatus({
        status: "failed",
        message: "Payment initiation failed. Please try again.",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Payment">
      {!isProcessing ? (
        <FormComponent
          fields={[
            {
              type: "text",
              name: "cardNumber",
              placeholder: "Card Number",
              value: paymentData.card.number,
              onChange: (e) =>
                setPaymentData({
                  ...paymentData,
                  card: { ...paymentData.card, number: e.target.value },
                }),
              required: true,
            },
            {
              type: "text",
              name: "expiryDate",
              placeholder: "Expiry Date",
              value: paymentData.card.expiry,
              onChange: (e) =>
                setPaymentData({
                  ...paymentData,
                  card: { ...paymentData.card, expiry: e.target.value },
                }),
              required: true,
            },
            {
              type: "text",
              name: "cvv",
              placeholder: "CVV",
              value: paymentData.card.cvc,
              onChange: (e) =>
                setPaymentData({
                  ...paymentData,
                  card: { ...paymentData.card, cvc: e.target.value },
                }),
              required: true,
            },
            {
              type: "text",
              name: "nameOnCard",
              placeholder: "Name on Card",
              value: paymentData.card.name,
              onChange: (e) =>
                setPaymentData({
                  ...paymentData,
                  card: { ...paymentData.card, name: e.target.value },
                }),
              required: true,
            },
          ]}
          buttonText="Pay"
          onSubmit={handlePayment}
        />
      ) : (
        <div className="processing-container">
          <p className="processing-text">Processing payment...</p>
          {paymentStatus && (
            <div className={`payment-status ${paymentStatus.status}`}>
              <p className="status-text">Status: {paymentStatus.status}</p>
              <p className="message-text">Message: {paymentStatus.message}</p>
              <button className="close-button" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default PaymentModal;
