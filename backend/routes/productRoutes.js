const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// public routes
router.get("/", productController.list); // Tüm ürünleri listeleme
router.get("/:id", productController.get); // Belirli ürün detayları

// protected routes
router.use(authMiddleware);
router.use(roleMiddleware("admin")); 

router.post("/", productController.create);
router.put("/:id", productController.update); 
router.delete("/:id", productController.delete); 

module.exports = router;
