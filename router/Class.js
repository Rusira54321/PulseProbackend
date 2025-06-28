const express = require("express")
const router = express.Router()
const {addClass} = require("../controller/Class")
router.post("/addclasses",addClass)
module.exports = router