const express = require("express");
const { createRegisterLicense, getRegisterLicenses, getRegisterLicensesByIDLicense, getRegisterLicensesByIDCompany, getRegisterLicenseByID, updateRegisterLicense, deleteRegisterLicense, getRegisterLicensesByIDCompanyAndPlat, getLicencesCompanyPlatform, desactiveRegisterLicence } = require("../controllers/registerLicenses");
const router = express.Router();
const { validateCreateRegisterLicense, validateGetLicencesPlatform } = require("../validators/licenses");

router.post("/", validateCreateRegisterLicense, createRegisterLicense)
router.get("/", getRegisterLicenses)
router.get("/:id", getRegisterLicenseByID)
router.get("/compnay/:id", getRegisterLicensesByIDCompany)
router.post("/compnayAndPlat/:id", getRegisterLicensesByIDCompanyAndPlat)
router.post("/getLicencesCompanyPlatform", validateGetLicencesPlatform, getLicencesCompanyPlatform)
router.get("/disableRegisterLicenceByID/:id", desactiveRegisterLicence)
router.get("/license/:id", getRegisterLicensesByIDLicense)
router.delete("/:id", deleteRegisterLicense)

module.exports = router