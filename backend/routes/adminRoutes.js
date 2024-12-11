const express = require("express");
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


router.use(authMiddleware);
router.use(roleMiddleware("admin"));


router.post("/", adminController.addAdmin);


router.delete("/:userId", adminController.removeAdmin);
router.get("/", adminController.listAdmins);

module.exports = router;
