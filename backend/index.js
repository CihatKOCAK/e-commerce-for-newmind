require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const { initAdmin } = require("./services/initService");
const routes = require('./routes/index');
const { Server } = require("socket.io");
const http = require("http");
const { connectProducer } = require("./services/kafka/producer");
const connectKafka = require("./services/kafka/connectKafka");
const { logInfo, logError } = require("./utils/loggerUtil");
const cors = require('cors');
const ensureUploadDirs = require("./utils/ensureUploadDirs");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3003'], // İzin verilen origin'ler
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // İzin verilen HTTP metodlar
  allowedHeaders: ['Content-Type', 'Authorization'], // İzin verilen header'lar
};


// CORS'u kullan
app.use(cors(corsOptions));

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


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Socket.IO bağlantılarını dinle
io.on("connection", (socket) => {
  logInfo("socketConnection", `User connected: ${socket.id}`);
  socket.on("disconnect", () => {
    logInfo("socketConnection", `User disconnected: ${socket.id}`);
  });
});

// Başlatma fonksiyonu
const startServer = async () => {
  try {
    await connectDB(); // Veritabanı bağlantısı
    await initAdmin(); // Admin kullanıcıları oluşturma
    await connectProducer(); // Kafka producer bağlantısı
    await connectKafka(io); // Kafka consumer bağlantısı
    ensureUploadDirs(); // Yükleme dizinlerini oluştur
    logInfo("serverStatus", 'Server started successfully all services');
  } catch (error) {
    logError("serverStatus", `Server failed to start: ${error.message}`);
    process.exit(1); // Kritik hata sonrası durdurma
  }
};

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logInfo("serverStatus", `Server started on port ${PORT}`);
  startServer(); // Sunucu başladıktan sonra başlatma işlemleri
}).on("error", (err) => {
  logError("serverStatus", `Server failed to start: ${err.message}`);
  process.exit(1);
});
