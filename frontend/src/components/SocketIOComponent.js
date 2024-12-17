import React, { useState, useEffect } from 'react';
import socket from '../services/SocketService';

const SocketIOComponent = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Ödeme durumu mesajını dinle
  useEffect(() => {
    socket.on('paymentStatus', (data) => {
      setPaymentStatus(data);
    });

    // Cleanup: Component unmount olduğunda socket dinleyicisini kaldır
    return () => {
      socket.off('paymentStatus');
    };
  }, []);

  useEffect(() => {
    paymentStatus && socket.off('paymentStatus');
  }, [paymentStatus]);

  return (
    <div>
      <h1>Socket.IO Demo</h1>
      <div>
        <h2>Payment Status</h2>
        {paymentStatus ? (
          <div>
            <p>Status: {paymentStatus.status}</p>
            <p>Message: {paymentStatus.message}</p>
          </div>
        ) : (
          <p>No payment status received yet.</p>
        )}
      </div>
    </div>
  );
};

export default SocketIOComponent;
