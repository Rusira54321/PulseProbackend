const express = require("express")
const router = express.Router()
const {authtrainer,gettrainers,deleteTrainer} = require("../controller/trainer")
router.post("/login",authtrainer)
router.post("/gettrainer",gettrainers)
router.post("/deletetrainer",deleteTrainer)
module.exports = router