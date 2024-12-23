# Payment Process Flow

[For Turkish](README.md)

This document explains the steps that occur during the payment process and how the system works.

## Flow Diagram Steps

### Frontend:
1. The user initiates the payment request.
2. The frontend sends the payment request to the backend and starts listening for the payment status via socket.

### Backend:
1. The backend receives the payment request.
2. The backend sends a message with the topic `"payment-request"` to Kafka.

### Payment Service:
1. The payment service listens for the `"payment-request"` message from Kafka.
2. It processes the payment.
3. Once the payment is complete, it sends a `"payment-completed"` message back to the backend via Kafka.

### Backend:
1. The backend listens for the `"payment-completed"` message from Kafka.
2. The backend informs the user of the success status and sends a payment completion message to the frontend via socket.
3. The backend sends a message with the topic `"invoice-start"` to Kafka.

### Invoice Service:
1. The invoice service listens for the `"invoice-start"` message from Kafka.
2. It processes the invoice creation.
3. Once the invoice is successfully created, it sends an `"invoice-completed"` message to Kafka.

### Backend:
1. The backend listens for the `"invoice-completed"` message from Kafka. _(Error handling or notifications can be implemented for a "Not OK" status.)_

---

## System Flow

- The payment request initiated by the **Frontend** is forwarded to the **Payment Service** and **Invoice Service** microservices via the **Backend**.
- Kafka facilitates messaging between these microservices.
- Once the payment and invoice processes are completed, the user is notified via **Socket**.

[Back to Main README](../README.md)