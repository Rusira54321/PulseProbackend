const express = require("express")
const router = express.Router()
const {authtrainer} = require("../controller/trainer")
router.post("/login",authtrainer)
module.exports = router