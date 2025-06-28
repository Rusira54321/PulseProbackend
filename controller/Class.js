const classes = require("../model/Class")
const addClass = async (req, res) => {
  const { memberUsername, trainerusername, classname, date, newstartTime, newendTime, Description } = req.body;
  if (!memberUsername || !trainerusername || !classname || !date || !newstartTime || !newendTime || !Description) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // Normalize input date
  const dateStr = new Date(date).toISOString().split('T')[0];
  const newStart = new Date(`1970-01-01T${newstartTime}:00Z`);
  const newEnd = new Date(`1970-01-01T${newendTime}:00Z`);

  for (const member of memberUsername) {
    const matchmembers = await classes.find({ memberUsername: member });

    for (const m of matchmembers) {
      const existingDateStr = new Date(m.date).toISOString().split('T')[0];

      if (dateStr === existingDateStr) {
        const starttime = new Date(`1970-01-01T${m.startTime}:00Z`);
        const endtime = new Date(`1970-01-01T${m.endTime}:00Z`);

        if (newStart < endtime && newEnd > starttime) {
          return res.status(400).json({ message: "Cannot create class because the members have another class in this time" });
        }
      }
    }
  }

  const newclass = new classes({
    memberUsername,
    trainerusername,
    classname,
    date,
    startTime: newstartTime,
    endTime: newendTime,
    Description
  });

  try {
    await newclass.save();
    return res.status(201).json({ message: "Class added successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Class adding unsuccessful", error: error.message });
  }
};
module.exports = {addClass}