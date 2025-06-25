const workout = require("../model/WorkOutPlan")
const addworkoutPlan = async(req,res) =>{
    const {goal,memberUsername,planname,workouts,trainerusername,duration} = req.body
    if(!goal || !memberUsername || !planname || !workouts || !trainerusername || !duration)
    {
        return res.status(400).json({message:"Missing fields"})
    }
    else{
        const newworkout = new workout({
            trainerUsername:trainerusername,
            memberUsername:memberUsername,
            planName:planname,
            goal:goal,
            duration:duration,
            workouts:workouts
        })
        await newworkout.save().then(()=>{
            return res.status(201).json({message:"Workout created successfully"})
        }).catch((error)=>{
            return res.status(400).json({message:error.message})
        })
    }
}
module.exports = {addworkoutPlan}