const express = require('express');
const userRoutes = require("./userRoutes");
const campaignRoutes = require("./campaignRoutes");
const productRoutes = require("./productRoutes");
const basketRoutes = require("./basketRoutes");
const adminRoutes = require("./adminRoutes");
const categoryRoutes = require("./categoryRoutes");
const paymentRoutes = require("./paymentRoutes");
const uploadRoutes = require("./uploadRoutes");

const router = express.Router();
router.use("/auth", userRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/products", productRoutes);
router.use("/basket", basketRoutes);
router.use("/admins", adminRoutes);
router.use("/categories", categoryRoutes);
router.use("/payment", paymentRoutes);
router.use("/uploads", uploadRoutes);

router.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});

module.exports = router;