
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: String,
  type: String,
  room: String,
  status: Boolean,
  brightness: Number,
  temperature: Number,
  targetTemp: Number,
  volume: Number,
  recording: Boolean,
  schedule: String,
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);
