const bcrypt = require("bcrypt")
const gymmodel = require("../model/gym")
const {generateToken} = require("../util/jwtUtil")
const creategym = async(req,res) =>{
        const {gymname,username,email,password}=req.body
        if(!gymname || !username || !email || !password)
        {
                return res.status(404).json({message:"you are not fullfill form correctly"}) 
        }
        else{
                const hashedpassword = await bcrypt.hash(password,10);
                const newgym = new gymmodel({
                        gymname,
                        username,
                        email,
                        password:hashedpassword
                })
                await newgym.save().then(()=>{
                        return res.status(201).json({message:"gym registered successfully"})
                }).catch((error)=>{
                        return res.status(500).json({message:error})
                })
        }
}
const authgym = async(req,res)=>{
        const {username,password} = req.body;
        if(!username || !password)
        {
                return res.status(400).json({message:"The username or password field is not fullfill completly"})
        }
        const existuser = await gymmodel.findOne({username:username})
        if(!existuser)
        {
                return res.status(400).json({message:"You are not a registered user first register"})
        }
        const matchpassword = await bcrypt.compare(password,existuser.password)
        if(matchpassword)
        {
                const token = generateToken(existuser)

                return res.status(200).json({message:"you are successfully logging",token:token})
        }
        else
        {
                return res.status(400).json({message:"Password is not matched"})
        }
}
const authemail = (req,res) =>{

}
module.exports = {creategym,authgym}