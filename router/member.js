const express = require("express")
const {getmemberdetails, deleteMember,getmemberbyID,updatemember} = require("../controller/addmember")
const router=  express.Router()
router.post("/getmembers",getmemberdetails)
router.post("/deletemember",deleteMember)
router.post("/getmemberbyid",getmemberbyID)
router.post("/updatemember",updatemember)
module.exports = router