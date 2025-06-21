const express = require("express")
const router = express.Router()
const {addAttendance} = require("../controller/Attendance")
router.post("/addAttendance",addAttendance)
module.exports = router