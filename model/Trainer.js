const mongoose = require("mongoose")
const trainerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    profileimage:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("trainer",trainerSchema)