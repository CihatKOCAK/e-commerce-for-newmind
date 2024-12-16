import { io } from 'socket.io-client';
import { logInfo } from '../../../backend/utils/loggerUtil';

// WebSocket sunucusuna bağlantı
const socket = io(process.env.PORT || 5000); // Sunucu URL'si

// Bağlantı durumunu takip etmek için event listener'lar
socket.on('connect', () => {
  logInfo('WebSocket', 'Connected to WebSocket server');
});

socket.on('disconnect', () => {
  logInfo('WebSocket', 'Disconnected from WebSocket server');
});

// Ödeme durumu mesajını dinlemek
socket.on('paymentStatus', (data) => {
  logInfo('WebSocket', `Payment status received: ${data}`);
});

// Socket bağlantısını dışa aktar
export default socket;
