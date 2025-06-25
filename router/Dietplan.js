const express = require("express")
const router = express.Router()
const {addDietPlan,getDietPlan,deleteDietPlan} = require("../controller/DietPlan")
router.post("/addDietPlan",addDietPlan)
router.post("/getdietplan",getDietPlan)
router.delete("/deletedietplan/:id",deleteDietPlan)
module.exports = router