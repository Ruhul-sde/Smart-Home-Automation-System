
const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const { addNotification } = require('../utils/notifications');

// All off action
router.post('/all-off', async (req, res) => {
  try {
    await Device.updateMany({}, { status: false, lastUpdated: new Date() });
    const devices = await Device.find();
    await addNotification('info', 'All devices turned off');
    res.json({ message: 'All devices turned off', devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sleep mode action
router.post('/sleep-mode', async (req, res) => {
  try {
    await Device.updateMany(
      { type: 'light' },
      { status: false, lastUpdated: new Date() }
    );
    await Device.updateMany(
      { type: 'lock' },
      { status: true, lastUpdated: new Date() }
    );
    await Device.updateMany(
      { type: 'ac' },
      { temperature: 20, lastUpdated: new Date() }
    );
    
    const devices = await Device.find();
    await addNotification('success', 'Sleep mode activated');
    res.json({ message: 'Sleep mode activated', devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Away mode action
router.post('/away-mode', async (req, res) => {
  try {
    await Device.updateMany(
      { $or: [{ type: 'light' }, { type: 'entertainment' }] },
      { status: false, lastUpdated: new Date() }
    );
    await Device.updateMany(
      { type: 'lock' },
      { status: true, lastUpdated: new Date() }
    );
    await Device.updateMany(
      { type: 'camera' },
      { recording: true, lastUpdated: new Date() }
    );
    
    const devices = await Device.find();
    await addNotification('warning', 'Away mode activated - Security armed');
    res.json({ message: 'Away mode activated', devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Movie night action
router.post('/movie-night', async (req, res) => {
  try {
    await Device.updateMany(
      { type: 'light' },
      { status: true, brightness: 20, lastUpdated: new Date() }
    );
    await Device.updateMany(
      { type: 'entertainment' },
      { status: true, lastUpdated: new Date() }
    );
    
    const devices = await Device.find();
    await addNotification('info', 'Movie night mode activated');
    res.json({ message: 'Movie night mode activated', devices });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
