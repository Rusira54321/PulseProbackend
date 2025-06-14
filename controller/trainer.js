const bcrypt = require("bcrypt")
const trainer = require("../model/Trainer")
const {generateToken} =require("../util/jwtUtil")
const addtrainer = async(req,res) =>{
        const profileimage = req.file.filename
        const {name,username,password,email,phone,gender,dob,key} = req.body
        if(!name ||!username || !password || !email || !phone || !gender || !dob || !profileimage || key=="null")
        {
            return res.status(400).json({message:"missing fields"})
        }
        if(gender!=="Male" && gender!=="Female" && gender!=="Other")
        {
            return res.status(400).json({message:"incorrect gender"})
        }
        const existusername = await trainer.findOne({username})
        if(existusername)
        {
            return res.status(400).json({message:"Try another username"})
        }
        const existemail =  await trainer.findOne({email})
        if(existemail)
            {
                return res.status(400).json({message:"Try another email"})
            }
        const hashedpassword = await bcrypt.hash(password,10)
        const  newtrainer = new trainer({
            name,username,password:hashedpassword,email,phone,gender,dob,profileimage,key
        })
        await newtrainer.save().then(()=>{
                return res.status(201).json({message:"Trainer created successfully"})
        }).catch((error)=>{
                return res.status(400).json({message:error})
        })

        
}
const authtrainer = async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password)
    {
        return res.status(400).json({message:"missing fields"})
    }
    const existusername = await trainer.findOne({username})
    if(!existusername)
    {
        return res.status(400).json({message:"You are not registered trainer please register by admin"})
    }
    if(existusername)
    {
        const matchpassword = await bcrypt.compare(password,existusername.password)
        if(!matchpassword)
        {
            return res.status(400).json({message:"Password is incorrect"})
        }
        if(matchpassword)
        {
            const token = generateToken(existusername)
            return res.status(200).json({message:"Verified successfully",token:token})
        }
    }
}
const gettrainers = async(req,res) =>{
    const trainers = await trainer.find()
    if(!trainers)
    {
        return res.status(400).json({message:"Trainers not found"})
    }else{
        return res.status(200).json({trainers:trainers})
    }
}

module.exports = {addtrainer,authtrainer,gettrainers}