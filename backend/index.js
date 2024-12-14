require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const { initAdmin } = require("./services/initService");
const userRoutes = require("./routes/userRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const productRoutes = require("./routes/productRoutes");
const basketRoutes = require("./routes/basketRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const { connectKafka } = require("./config/kafka");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/products", productRoutes);
app.use("/api/basket", basketRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/payment", paymentRoutes);

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
    await connectKafka(io); // Kafka bağlantısı ve Socket.IO entegrasyonu
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
