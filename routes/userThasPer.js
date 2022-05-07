const express = require("express");
const router = express.Router();
const { createUserTypeHasP, getUserTypeHasP, getUserTypeHasPByID, updateUserTypeHasP, deleteUserTypeHasP } = require("../controllers/userThasPer");
const { validateCreateUserTypeHasP } = require("../validators/userType");

router.post("/", validateCreateUserTypeHasP, createUserTypeHasP)
router.get("/", getUserTypeHasP)
router.get("/:id", getUserTypeHasPByID)
router.put("/:id", updateUserTypeHasP)
router.delete("/:id", deleteUserTypeHasP)

module.exports = router