const DietPlan = require("../model/Dietplan")
const addDietPlan = async(req,res) =>{
    const {memberUsername,trainerUsername,goal,duration,meals} = req.body
    if(!memberUsername || !trainerUsername || !goal || !duration || !meals)
    {
        return res.status(400).json({message:"Missing fields"})
    }
    else{
        const newdietplan = new DietPlan({
                memberUsername:memberUsername,
                trainerUsername:trainerUsername,
                goal:goal,
                duration:duration,
                meals:meals
        })
        await newdietplan.save().then(()=>{
            return res.status(201).json({message:"Diet plan is created successfully"})
        }).catch((error)=>{
            return res.status(400).json({message:error.message})
        })
    }
}
module.exports = {addDietPlan}