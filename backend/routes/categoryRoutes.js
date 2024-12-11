const express = require("express");
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", categoryController.list);
router.get("/:id", categoryController.get);

router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.post("/",categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);

module.exports = router;
