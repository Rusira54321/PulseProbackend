const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const member = require("./router/member")
const trainerroute = require("./router/trainer")
app.use(express.static("./public"))
const multerroute = require("./router/multer")
require("dotenv").config()
app.use(express.json())
app.use(cors())
const authrouter = require("./router/addgym")
const port = process.env.PORT
const createConnection = async()=>{
await mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("MongoDb connection is successfully")
        app.listen(port,()=>{
            console.log("server is running on "+port)
        })
}).catch((error)=>{
        console.log(error)
})
}
createConnection()
app.use("/get",member)
app.use("/auth",authrouter)
app.use("/multer",multerroute)
app.use("/trainer",trainerroute)