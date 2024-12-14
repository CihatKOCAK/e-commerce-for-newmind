import { io } from 'socket.io-client';

// WebSocket sunucusuna bağlantı
const socket = io('http://localhost:3000'); // Sunucu URL'si

// Bağlantı durumunu takip etmek için event listener'lar
socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});

// Ödeme durumu mesajını dinlemek
socket.on('paymentStatus', (data) => {
  console.log('Payment status received:', data);
});

// Socket bağlantısını dışa aktar
export default socket;
