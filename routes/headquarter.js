const express = require("express");
const router = express.Router();
const {createHeadquarter, getheadquarters, getheadquarterByID, updateHeadquarter, deleteHeadquarter} = require("../controllers/headquarter");
const { validateCreateHeadquarter } = require("../validators/headquarter");

router.post("/", validateCreateHeadquarter, createHeadquarter)
router.get("/", getheadquarters)
router.get("/:id", getheadquarterByID)
router.put("/:id", updateHeadquarter)
router.delete("/:id", deleteHeadquarter)

module.exports = router