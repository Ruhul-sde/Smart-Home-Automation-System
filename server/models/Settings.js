
const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  theme: String,
  notifications: Boolean,
  autoSave: Boolean,
  language: String,
  currency: String,
  temperatureUnit: String
});

module.exports = mongoose.model('Settings', settingsSchema);
