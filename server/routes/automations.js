
const express = require('express');
const router = express.Router();
const Automation = require('../models/Automation');
const { addNotification } = require('../utils/notifications');

// Get all automations
router.get('/', async (req, res) => {
  try {
    const automations = await Automation.find();
    res.json(automations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new automation
router.post('/', async (req, res) => {
  try {
    const automation = new Automation({ ...req.body, lastTriggered: 'Never' });
    await automation.save();
    await addNotification('success', `Automation "${automation.name}" created successfully`);
    res.status(201).json(automation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update automation
router.put('/:id', async (req, res) => {
  try {
    const automation = await Automation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!automation) {
      return res.status(404).json({ error: 'Automation not found' });
    }
    res.json(automation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete automation
router.delete('/:id', async (req, res) => {
  try {
    const automation = await Automation.findByIdAndDelete(req.params.id);
    if (!automation) {
      return res.status(404).json({ error: 'Automation not found' });
    }
    res.json({ message: 'Automation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
