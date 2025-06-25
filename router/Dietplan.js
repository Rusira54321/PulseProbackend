const express = require("express")
const router = express.Router()
const {addDietPlan} = require("../controller/DietPlan")
router.post("/addDietPlan",addDietPlan)
module.exports = router