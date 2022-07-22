const express = require("express");
const router = express.Router();
const { createModel, getModel, getModelByID, updateModel, deleteModel, getModelByIDheadQ, getModelByIDPlatform, getKillbotsByModel, getModelFull } = require("../controllers/model");
const { validateCreateModel, validateGetPlatform, validateGetModelFull } = require("../validators/model");

router.post("/", validateCreateModel, createModel)
router.get("/", getModel)
router.get("/:id", getModelByID)
router.get("/byHeadquarter/:id", getModelByIDheadQ)
router.post("/getKillBotsByModel", getKillbotsByModel)
router.post("/platform/:id", validateGetPlatform, getModelByIDPlatform)
router.post("/getModelFull", validateGetModelFull, getModelFull)
router.put("/:id", updateModel)
router.delete("/:id", deleteModel)

module.exports = router