const express = require("express")
const {addSuppliment,getSuppliments,deleteSupplement,getsupplimentbyId} = require("../controller/Suppliment")
const {upload}= require("../middleware/multer")
const router = express.Router()
router.post("/addsuppliment",upload.single("image"),addSuppliment)
router.post("/getsuppliment",getSuppliments)
router.delete("/deleteSuppliment/:id",deleteSupplement)
router.post("/getSuppliment",getsupplimentbyId)
module.exports = router