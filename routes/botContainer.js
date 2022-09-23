const express = require("express");
const router = express.Router();
const { createBotContainer, getBotContainer, getBotContainerByID, updateBotContainer, deleteBotContainer, updateBotContainerByIP, getBotContainerByIDCompany, updateBotContainerArrayComp, getRegisterCompanyBotContainer, getBotContainerByIP } = require("../controllers/botContainer");
const { validateCreateBotContainer } = require("../validators/botContainer");

router.post("/", validateCreateBotContainer, createBotContainer)
router.get("/", getBotContainer)
router.get("/:id", getBotContainerByID)
router.get("/ByIp/:ip", getBotContainerByIP)
router.get("/byIdCompany/:id", getBotContainerByIDCompany)
router.get("/getRegisterCompanyBotContainer/:id", getRegisterCompanyBotContainer)
router.put("/updateByIp/:ip", updateBotContainerByIP)
router.put("/updateAccts/:id", updateBotContainerArrayComp)
router.put("/:id", updateBotContainer)
router.delete("/:id", deleteBotContainer)

module.exports = router