const workout = require("../model/WorkOutPlan")
const addworkoutPlan = async(req,res) =>{
    const {goal,memberUsername,planname,workouts,trainerusername,duration} = req.body
    if(!goal || !memberUsername || !planname || !workouts || !trainerusername || !duration)
    {
        return res.status(400).json({message:"Missing fields"})
    }
    else{
        const existuser = await workout.findOne({memberUsername:memberUsername})
        if(existuser)
        {
            return res.status(400).json({message:"This member have a workout plan"})
        }
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
const getworkoutplan = async(req,res) =>{
    const {trainerusername} = req.body
    const workouts = await workout.find({trainerUsername:trainerusername})
    if(workouts.length==0)
    {
        return res.status(400).json({message:"Empty workouts"})
    }else{
        return res.status(200).json({workouts:workouts})
    }
}
const deleteworkoutplan = async(req,res) =>{
        const {id} = req.params
        try{
            await workout.findByIdAndDelete(id)
            return res.status(200).json({message:"Workout plan deleted successfully."})
        }catch(error)
        {
            return res.status(400).json({message:"Failed to delete plan."})
        }
}
const getworkoutplanbyid = async(req,res)=>{
        const {id} = req.body
        const workouts = await workout.findById(id)
        if(workouts)
        {
            return res.status(200).json({workout:workouts})
        }
}
module.exports = {addworkoutPlan,getworkoutplan,deleteworkoutplan,getworkoutplanbyid}