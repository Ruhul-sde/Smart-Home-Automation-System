
const mongoose = require('mongoose');

const automationSchema = new mongoose.Schema({
  name: String,
  time: String,
  trigger: String,
  active: Boolean,
  actions: [String],
  lastTriggered: String
});

module.exports = mongoose.model('Automation', automationSchema);
