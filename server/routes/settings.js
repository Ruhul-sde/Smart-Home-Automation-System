
const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const { addNotification } = require('../utils/notifications');

// Get settings
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings || {
      theme: 'dark',
      notifications: true,
      autoSave: true,
      language: 'en',
      currency: 'USD',
      temperatureUnit: 'C'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update settings
router.put('/', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { 
      new: true, 
      upsert: true 
    });
    await addNotification('info', 'Settings updated successfully');
    res.json(settings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
