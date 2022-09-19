const express = require("express");
const router = express.Router();
const { createRegister, getRegisters, getRegisterByID, getRegisterByIDUser, updateRegister, deleteRegister, resetRegisters } = require("../controllers/tableLogLaunch");
const { validateCreate } = require("../validators/tableLogLaunch");

router.post("/", validateCreate, createRegister)
router.get("/", getRegisters)
router.get("/reset", resetRegisters)
router.get("/:id", getRegisterByID)
router.get("/user/:id", getRegisterByIDUser)
router.put("/:id", updateRegister)
router.delete("/:id", deleteRegister)

module.exports = router