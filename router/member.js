const express = require("express")
const {getmemberdetails, deleteMember,} = require("../controller/addmember")
const router=  express.Router()
router.post("/getmembers",getmemberdetails)
router.post("/deletemember",deleteMember)
module.exports = router