const express = require("express")
const {addworkoutPlan,getworkoutplan,deleteworkoutplan,getworkoutplanbyid,updateworkoutplan} = require("../controller/Workoutplan")
const router = express.Router()
router.post("/addWorkoutPlan",addworkoutPlan)
router.post("/getworkoutplan",getworkoutplan)
router.delete("/delete/:id",deleteworkoutplan)
router.post("/getworkoutplanbyid",getworkoutplanbyid)
router.post("/updateworkoutplan/:id",updateworkoutplan)
module.exports = router