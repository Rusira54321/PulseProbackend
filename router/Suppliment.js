const express = require("express")
const {addSuppliment,getSuppliments} = require("../controller/Suppliment")
const {upload}= require("../middleware/multer")
const router = express.Router()
router.post("/addsuppliment",upload.single("image"),addSuppliment)
router.post("/getsuppliment",getSuppliments)
module.exports = router