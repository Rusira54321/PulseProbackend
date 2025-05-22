const bcrypt = require("bcrypt")
const trainer = require("../model/Trainer")
const addtrainer = async(req,res) =>{
        const profileimage = req.file.filename
        const {name,username,password,email,phone,gender,dob} = req.body
        if(!name ||!username || !password || !email || !phone || !gender || !dob || !profileimage)
        {
            return res.status(400).json({message:"missing fields"})
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
            name,username,password:hashedpassword,email,phone,gender,dob,profileimage
        })
        await newtrainer.save().then(()=>{
                return res.status(201).json({message:"Trainer created successfully"})
        }).catch((error)=>{
                return res.status(400).json({message:error})
        })

        
}
module.exports = {addtrainer}