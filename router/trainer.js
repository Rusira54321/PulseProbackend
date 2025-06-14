const express = require("express")
const router = express.Router()
const {authtrainer,gettrainers} = require("../controller/trainer")
router.post("/login",authtrainer)
router.get("/gettrainer",gettrainers)
module.exports = router