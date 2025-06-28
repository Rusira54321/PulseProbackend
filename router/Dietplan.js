const express = require("express")
const router = express.Router()
const {addDietPlan,getDietPlan,deleteDietPlan,getDietplanbyid,updateDietplan} = require("../controller/DietPlan")
router.post("/addDietPlan",addDietPlan)
router.post("/getdietplan",getDietPlan)
router.delete("/deletedietplan/:id",deleteDietPlan)
router.get("/getdietplanbyid/:id",getDietplanbyid)
router.post("/updatedietplan",updateDietplan)
module.exports = router