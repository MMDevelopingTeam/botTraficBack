const express = require("express");
const router = express.Router();
const { createModel, getModel, getModelByID, updateModel, deleteModel, getModelByIDheadQ } = require("../controllers/model");
const { validateCreateModel } = require("../validators/model");

router.post("/", validateCreateModel, createModel)
router.get("/", getModel)
router.get("/:id", getModelByID)
router.get("/byHeadquarter/:id", getModelByIDheadQ)
router.put("/:id", updateModel)
router.delete("/:id", deleteModel)

module.exports = router