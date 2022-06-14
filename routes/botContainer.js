const express = require("express");
const router = express.Router();
const { createBotConatiner, getBotConatiner, getBotConatinerByID, updateBotConatiner, deleteBotConatiner, updateBotConatinerByIP } = require("../controllers/botContainer");
const { validateCreateBotContainer } = require("../validators/botContainer");

router.post("/", validateCreateBotContainer, createBotConatiner)
router.get("/", getBotConatiner)
router.get("/:id", getBotConatinerByID)
router.put("/updateByIp/:ip", updateBotConatinerByIP)
router.put("/:id", updateBotConatiner)
router.delete("/:id", deleteBotConatiner)

module.exports = router