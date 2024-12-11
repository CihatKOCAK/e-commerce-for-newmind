const express = require("express");
const basketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/add", basketController.addItem); 
router.get("/", basketController.getBasket); 
router.delete("/clear", basketController.clearBasket); 
router.put("/:productId", basketController.updateQuantity);

module.exports = router;
