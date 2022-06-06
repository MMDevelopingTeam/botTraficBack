const express = require("express");
const router = express.Router();
const { createModel, getModel, getModelByID, updateModel, deleteModel, getModelByIDheadQ, getModelByIDPlatform } = require("../controllers/model");
const { validateCreateModel, validateGetPlatform } = require("../validators/model");

router.post("/", validateCreateModel, createModel)
router.get("/", getModel)
router.get("/:id", getModelByID)
router.get("/byHeadquarter/:id", getModelByIDheadQ)
router.post("/platform/:id", validateGetPlatform, getModelByIDPlatform)
router.put("/:id", updateModel)
router.delete("/:id", deleteModel)

module.exports = router