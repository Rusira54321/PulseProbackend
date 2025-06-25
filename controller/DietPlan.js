const DietPlan = require("../model/Dietplan")
const addDietPlan = async(req,res) =>{
    const {memberUsername,trainerUsername,goal,duration,meals} = req.body
    if(!memberUsername || !trainerUsername || !goal || !duration || !meals)
    {
        return res.status(400).json({message:"Missing fields"})
    }
    else{
        const existuser = await DietPlan.findOne({memberUsername:memberUsername})
        if(existuser)
        {
            return res.status(400).json({message:"This member have a Diet plan"})
        }
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
const getDietPlan  = async(req,res) =>{
    const {trainerusername} = req.body
    const dietplans = await DietPlan.find({trainerUsername:trainerusername})
    if(dietplans.length==0)
    {
        return res.status(400).json({message:"Empty Diet plans"})
    }else{
        return res.status(200).json({plans:dietplans})
    }
}
const deleteDietPlan = async(req,res) =>{
    const {id} = req.params
     try{
            await DietPlan.findByIdAndDelete(id)
            return res.status(200).json({message:"Diet plan deleted successfully."})
        }
        catch(error)
        {
            return res.status(400).json({message:"Failed to delete plan."})
        }
}
module.exports = {addDietPlan,getDietPlan,deleteDietPlan}