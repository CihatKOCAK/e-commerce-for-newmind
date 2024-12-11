require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const campaignRoutes = require("./routes/campaignRoutes");
const productRoutes = require("./routes/productRoutes");
const basketRoutes = require("./routes/basketRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/products", productRoutes);
app.use("/api/basket", basketRoutes);

// MongoDB Bağlantısı
connectDB();

// Sunucu
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
