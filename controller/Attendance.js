const memberModel = require("../model/member")
const attendanceModel = require("../model/Attendance")
const addAttendance = async(req,res) =>{
    const {id,name,username,attendance} = req.body
    if(!id || !name ||  !username || !attendance)
    {
        return res.status(400).json({message:"Missing fields"})
    }
    const member = await memberModel.findById(id)
    const attendancedata = await attendanceModel.find({userID:id})
    var i 
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months start from 0
    const year = today.getFullYear();
    const customFormat = `${day}-${month}-${year}`;
    if(attendancedata)
    {
        for(i=0;i<attendancedata.length;i++)
        {
            if(attendancedata[i].date==customFormat)
            {
                return res.status(400).json({message:"Cannot add attendance"})
            }
        }
    }
    
    const newAttendance = new attendanceModel({
        userID:id,
        Membername:name,
        Username:username,
        Attendance_Status:attendance,
        date:customFormat
    })
    await newAttendance.save().then(async()=>{
        member.attendance = attendance
        member.attendancedate = customFormat
        await member.save()
        return res.status(201).json({message:"Attendance successfully added"})
    })
}
module.exports = {addAttendance}