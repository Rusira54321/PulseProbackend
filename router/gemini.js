const express = require("express")
const router = express.Router()
const {getSchedule,getDietplan} = require("../controller/gemini")
router.post("/createSchedult",getSchedule)
router.post("/creatediet",getDietplan)
module.exports = router