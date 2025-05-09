const express = require("express")
const {creategym,authgym,authemail,authotp,resetPassword} =require("../controller/addgym")
const router = express.Router()
router.post("/addgym",creategym)
router.post("/authgym",authgym)
router.post("/email",authemail)
router.post("/otp",authotp)
router.post("/reset",resetPassword)
module.exports = router