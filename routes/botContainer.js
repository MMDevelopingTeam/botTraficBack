const express = require("express");
const router = express.Router();
const { createBotConatiner, getBotConatiner, getBotConatinerByID, updateBotConatiner, deleteBotConatiner, updateBotConatinerByIP, getBotConatinerByIDCompnay, updateBotConatinerArrayComp } = require("../controllers/botContainer");
const { validateCreateBotContainer } = require("../validators/botContainer");

router.post("/", validateCreateBotContainer, createBotConatiner)
router.get("/", getBotConatiner)
router.get("/:id", getBotConatinerByID)
router.get("/byIdCompany/:id", getBotConatinerByIDCompnay)
router.put("/updateByIp/:ip", updateBotConatinerByIP)
router.put("/updateAccts/:id", updateBotConatinerArrayComp)
router.put("/:id", updateBotConatiner)
router.delete("/:id", deleteBotConatiner)

module.exports = router