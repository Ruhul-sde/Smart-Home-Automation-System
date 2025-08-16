
const express = require('express');
const router = express.Router();
const Energy = require('../models/Energy');

// Get energy data
router.get('/', async (req, res) => {
  try {
    const energy = await Energy.findOne().sort({ date: -1 });
    res.json(energy || {
      currentUsage: 0,
      dailyUsage: 0,
      monthlyUsage: 0,
      cost: 0,
      peakHours: '',
      efficiency: 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create energy data
router.post('/', async (req, res) => {
  try {
    const energy = new Energy(req.body);
    await energy.save();
    res.status(201).json(energy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
