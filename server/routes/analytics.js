
const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const Room = require('../models/Room');

// Get device analytics
router.get('/devices', async (req, res) => {
  try {
    const deviceStats = await Device.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          active: { $sum: { $cond: ['$status', 1, 0] } }
        }
      }
    ]);
    res.json(deviceStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get room analytics
router.get('/rooms', async (req, res) => {
  try {
    const roomStats = await Room.aggregate([
      {
        $group: {
          _id: null,
          avgTemperature: { $avg: '$temperature' },
          avgHumidity: { $avg: '$humidity' },
          totalDevices: { $sum: '$devices' },
          occupiedRooms: { $sum: { $cond: ['$occupied', 1, 0] } }
        }
      }
    ]);
    res.json(roomStats[0] || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
