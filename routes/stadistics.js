const express = require("express");
const { getAllActs, getAllComp, getAllLicences, getAllModels, getAllplatforms, getAllusers, getAllusersAdmin, getAllStatsAdmin } = require("../controllers/stadistics");
const router = express.Router();

router.get("/", getAllActs)
router.get("/getAllComp", getAllComp)
router.get("/getAllStatsAdmin/:id", getAllStatsAdmin)
router.get("/getAllLicences", getAllLicences)
router.get("/getAllModels", getAllModels)
router.get("/getAllplatforms", getAllplatforms)
router.get("/getAllusers", getAllusers)
router.get("/getAllusersAdmin", getAllusersAdmin)

module.exports = router