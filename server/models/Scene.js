
const mongoose = require('mongoose');

const sceneSchema = new mongoose.Schema({
  name: String,
  description: String,
  devices: [{
    deviceId: mongoose.Schema.Types.ObjectId,
    settings: mongoose.Schema.Types.Mixed
  }],
  active: Boolean,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scene', sceneSchema);
