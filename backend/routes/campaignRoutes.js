const express = require("express");
const campaignController = require("../controllers/campaignController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// public routes
router.get("/", campaignController.list);
router.get("/:id", campaignController.get);

router.use(authMiddleware);
router.use(roleMiddleware("admin"));
// protected routes
router.post("/", campaignController.create);
router.put("/:id", campaignController.update);
router.delete("/:id", campaignController.delete);

module.exports = router;
