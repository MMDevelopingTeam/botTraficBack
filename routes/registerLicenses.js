const express = require("express");
const { createRegisterLicense, getRegisterLicenses, getRegisterLicensesByIDLicense, getRegisterLicensesByIDCompany, getRegisterLicenseByID, updateRegisterLicense, deleteRegisterLicense } = require("../controllers/registerLicenses");
const router = express.Router();
const { validateCreateRegisterLicense } = require("../validators/licenses");

router.post("/", validateCreateRegisterLicense, createRegisterLicense)
router.get("/", getRegisterLicenses)
router.get("/:id", getRegisterLicenseByID)
router.get("/compnay/:id", getRegisterLicensesByIDCompany)
router.get("/license/:id", getRegisterLicensesByIDLicense)
// router.put("/:id", updateLicense)
router.delete("/:id", deleteRegisterLicense)

module.exports = router