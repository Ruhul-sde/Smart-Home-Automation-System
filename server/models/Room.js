
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  _id: String,
  name: String,
  temperature: Number,
  humidity: Number,
  devices: Number,
  occupied: Boolean
});

module.exports = mongoose.model('Room', roomSchema);
