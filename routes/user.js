const express = require("express");
const router = express.Router();
const { signIn, signUp, GetUserByID, deleteUser, updateUser, GetUserByEmail, getMe, GetUser, tokenBot, tokenKillBot } = require("../controllers/user");
const { validateCreateSignIn, validateCreateSignUp, validateCreateToken } = require("../validators/user");
const { verifyToken } = require("../validators/validateToken");

router.post("/signin", validateCreateSignIn, signIn)
router.post("/signup", validateCreateSignUp, signUp)
router.get("/byToken", verifyToken, getMe)
router.post("/getTokenBot", validateCreateToken, tokenBot)
router.post("/getTokenkillBot", validateCreateToken, tokenKillBot)
router.get("/:id", GetUserByID)
router.get("/headquarterId/:id", verifyToken, GetUser)
router.get("/email/:email", GetUserByEmail)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

module.exports = router