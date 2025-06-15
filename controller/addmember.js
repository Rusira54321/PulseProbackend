const bcrypt = require("bcrypt")
const trainerss = require("../model/Trainer")
const member = require("../model/member")
const addmember = async(req,res) =>{
    const profileimage = req.file.filename
    const {name,username,password,height,weight,key,trainer,trainername} = req.body
    if (!name || !username || !password || !height || !weight || !trainer || key=="null" || !profileimage || !trainername)
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
        name,username,password:hashedpassword,heightincm:height,weightinkg:weight,gym:key,trainer:trainername,profileimage,trainerusername:trainer
    })
    await newmember.save().then(()=>{
        const updatetrainer = async() =>{
            const trainers = await trainerss.findOne({username:trainer})
            trainers.noOfstudents = trainers.noOfstudents+1
            await trainers.save()
        }
            updatetrainer()
            return res.status(201).json({message:"member created successfully"})
    }).catch((error)=>{
            return res.status(400).json({message:error})
    })
}
const getmemberdetails = async(req,res) =>{
        const {key} = req.body;
        const members  = await member.find()
        var i
        var newmember = []
        for (i=0;i<members.length;i++)
        {
            if(members[i].gym==key)
            {
                newmember.push(members[i])
            }
        }
        if(newmember.length==0)
        {
            return res.status(400).json({member:"empty members"})
        }
        return res.status(200).json({member:newmember})
}
const deleteMember = async(req,res) =>{
    const {id} = req.body
    const members = await member.findOne({_id:id})
    const traineruser = members.trainerusername
    const trainer = await trainerss.findOne({username:traineruser})
    trainer.noOfstudents= trainer.noOfstudents-1
    await trainer.save()
    const deletemember = await member.findByIdAndDelete(id)
    if(!deletemember)
    {
        return res.status(400).json({message:"Cannot delete the member"})
    }
    else{
        return res.status(200).json({message:"member is deleted"})
    }
}
module.exports = {addmember,getmemberdetails,deleteMember}