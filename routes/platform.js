
const express = require("express");
const router = express.Router();
const { createPlatform, getPlatform, getPlatformByID, updatePlatform, deletePlatform } = require("../controllers/platform");
const { validateCreatePlatform } = require("../validators/platform");

router.post("/", validateCreatePlatform, createPlatform)
router.get("/", getPlatform)
router.get("/:id", getPlatformByID)
router.put("/:id", updatePlatform)
router.delete("/:id", deletePlatform)

module.exports = router