const express = require("express")
const {creategym,authgym} =require("../controller/addgym")
const router = express.Router()
router.post("/addgym",creategym)
router.post("/authgym",authgym)
module.exports = router