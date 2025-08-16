
const mongoose = require('mongoose');

const energySchema = new mongoose.Schema({
  currentUsage: Number,
  dailyUsage: Number,
  monthlyUsage: Number,
  cost: Number,
  peakHours: String,
  efficiency: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Energy', energySchema);
