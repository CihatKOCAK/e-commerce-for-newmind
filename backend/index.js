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
app.use("/users", userRoutes);
app.use("/campaigns", campaignRoutes);
app.use("/products", productRoutes);
app.use("/basket", basketRoutes);

// MongoDB Bağlantısı
connectDB();

// Sunucu
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
