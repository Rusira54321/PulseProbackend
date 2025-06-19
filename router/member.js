const express = require("express")
const {getmemberdetails, deleteMember,getmemberbyID} = require("../controller/addmember")
const router=  express.Router()
router.post("/getmembers",getmemberdetails)
router.post("/deletemember",deleteMember)
router.post("/getmemberbyid",getmemberbyID)
module.exports = router