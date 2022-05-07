const express = require("express");
const router = express.Router();
const { signIn, signUp, GetUserByID, deleteUser, updateUser } = require("../controllers/user");
const { validateCreateSignIn, validateCreateSignUp } = require("../validators/user");

router.post("/signin", validateCreateSignIn, signIn)
router.post("/signup", validateCreateSignUp, signUp)
router.get("/:id", GetUserByID)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router