// models/DietPlan.js
const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
  type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  items: [String]
})

const dietPlanSchema = new mongoose.Schema({
  memberUsername: { type: String, required: true },
  trainerUsername: { type: String, required: true },
  goal: { type: String, required: true },
  duration: { type: Number, required: true }, // in weeks
  meals: [mealSchema],
  createdAt: { type: Date, default: Date.now }
})

module.exports =  mongoose.model('DietPlan', dietPlanSchema)
