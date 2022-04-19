const express = require("express");
const router = express.Router();
const { signIn, signUp } = require("../controllers/user");
const { validateCreateSignIn, validateCreateSignUp } = require("../validators/user");

router.post("/signin", validateCreateSignIn, signIn)
router.post("/signup", validateCreateSignUp, signUp)

module.exports = router