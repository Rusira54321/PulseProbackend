const express = require("express")
const {addworkoutPlan} = require("../controller/Workoutplan")
const router = express.Router()
router.post("/addWorkoutPlan",addworkoutPlan)
module.exports = router