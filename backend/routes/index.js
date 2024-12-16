const express = require('express');
const userRoutes = require("./userRoutes");
const campaignRoutes = require("./campaignRoutes");
const productRoutes = require("./productRoutes");
const basketRoutes = require("./basketRoutes");
const adminRoutes = require("./adminRoutes");
const categoryRoutes = require("./categoryRoutes");
const paymentRoutes = require("./paymentRoutes");

const router = express.Router();
router.use("/users", userRoutes);
router.use("/campaigns", campaignRoutes);
router.use("/products", productRoutes);
router.use("/basket", basketRoutes);
router.use("/admins", adminRoutes);
router.use("/categories", categoryRoutes);
router.use("/payment", paymentRoutes);
module.exports = router;