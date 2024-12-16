require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const { initAdmin } = require("./services/initService");
const routes = require('./routes/index');
const { Server } = require("socket.io");
const http = require("http");
const { connectProducer } = require("./services/kafka/producer");
const connectKafka = require("./services/kafka/connectKafka");

const app = express();

// Middleware
app.use(express.json());

// Routers
app.use('/api', routes);

// Sunucu oluşturma
const server = http.createServer(app);

// Socket.IO entegrasyonu
const io = new Server(server, {
  cors: {
    origin: "*", // Frontend URL'sini buraya ekleyin
    methods: ["GET", "POST"],
  },
});

// Socket.IO bağlantılarını dinle
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Başlatma fonksiyonu
const startServer = async () => {
  try {
    await connectDB(); // Veritabanı bağlantısı
    await initAdmin(); // Admin kullanıcıları oluşturma
    await connectProducer(); // Kafka producer bağlantısı
    await connectKafka(io); // Kafka consumer bağlantısı
    console.log("Initialization completed successfully.");
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1); // Kritik hata sonrası durdurma
  }
};

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startServer(); // Sunucu başladıktan sonra başlatma işlemleri
}).on("error", (err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});
