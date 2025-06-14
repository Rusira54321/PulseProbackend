const bcrypt = require("bcrypt")
const member = require("../model/member")
const addmember = async(req,res) =>{
    const profileimage = req.file.filename
    const {name,username,password,height,weight,key,trainer} = req.body
    if (!name || !username || !password || !height || !weight || !trainer || key=="null" || !profileimage)
    {
         return res.status(400).json({message:"missing fields"})
    }
    const existusername = await member.findOne({username:username})
    if(existusername)
    {
        return res.status(400).json({message:"The username is already exist"})
    }
    const hashedpassword = await bcrypt.hash(password,10)
    const newmember = new member({
        name,username,password:hashedpassword,heightincm:height,weightinkg:weight,gym:key,trainer,profileimage
    })
    await newmember.save().then(()=>{
            return res.status(201).json({message:"member created successfully"})
    }).catch((error)=>{
            return res.status(400).json({message:error})
    })
}
module.exports = {addmember}