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

const startServer = async () => {
  try {
    connectDB();
    initAdmin();
    console.log("Initialization completed successfully.");
  } catch (error) {
    console.error("Error during initialization:", error);
    process.exit(1); // Kritik hata sonrası durdurma
  }
};

startServer();

// Sunucu Başlatma
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  .on("error", (err) => {
    console.error("Server failed to start:", err);
    process.exit(1);
  });
