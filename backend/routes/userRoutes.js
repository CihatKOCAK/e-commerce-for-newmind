const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authMiddleware);
router.get("/profile", userController.getUserProfile);
router.put("/:userId/profile", userController.updateUserProfile);

module.exports = router;
