import { io } from 'socket.io-client';
import { API_MAIN_URL } from '../config/apiConfig';

// WebSocket sunucusuna bağlantı
const socket = io(API_MAIN_URL,
  {
    transports: ['websocket'],
    upgrade: false,
  });

// Bağlantı durumunu takip etmek için event listener'lar
socket.on('connect', () => {
  console.info('WebSocket', 'Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.info('WebSocket', 'Disconnected from WebSocket server');
});

// Ödeme durumu mesajını dinlemek
socket.on('paymentStatus', (data) => {
  console.info('WebSocket', `Payment status received: ${data}`);
});

// Socket bağlantısını dışa aktar
export default socket;
