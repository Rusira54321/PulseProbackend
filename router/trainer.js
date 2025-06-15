const express = require("express")
const router = express.Router()
const {authtrainer,gettrainers,deleteTrainer,gettrainername} = require("../controller/trainer")
router.post("/login",authtrainer)
router.post("/gettrainer",gettrainers)
router.post("/deletetrainer",deleteTrainer)
router.post("/gettrainername",gettrainername)
module.exports = router