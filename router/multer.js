const express = require("express")
const {upload} = require("../middleware/multer")
const {addtrainer} = require("../controller/trainer")
const router = express.Router()
router.post("/upload",upload.single("profile"),addtrainer)
module.exports = router