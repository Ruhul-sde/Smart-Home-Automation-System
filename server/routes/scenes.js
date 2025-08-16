
const express = require('express');
const router = express.Router();
const Scene = require('../models/Scene');
const Device = require('../models/Device');
const { addNotification } = require('../utils/notifications');

// Get all scenes
router.get('/', async (req, res) => {
  try {
    const scenes = await Scene.find().populate('devices.deviceId');
    res.json(scenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new scene
router.post('/', async (req, res) => {
  try {
    const scene = new Scene(req.body);
    await scene.save();
    await addNotification('success', `Scene "${scene.name}" created successfully`);
    res.status(201).json(scene);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update scene
router.put('/:id', async (req, res) => {
  try {
    const scene = await Scene.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!scene) {
      return res.status(404).json({ error: 'Scene not found' });
    }
    res.json(scene);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete scene
router.delete('/:id', async (req, res) => {
  try {
    const scene = await Scene.findByIdAndDelete(req.params.id);
    if (!scene) {
      return res.status(404).json({ error: 'Scene not found' });
    }
    res.json({ message: 'Scene deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Activate scene
router.post('/:id/activate', async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.id);
    if (!scene) {
      return res.status(404).json({ error: 'Scene not found' });
    }
    
    // Apply scene settings to devices
    for (const deviceConfig of scene.devices) {
      await Device.findByIdAndUpdate(deviceConfig.deviceId, {
        ...deviceConfig.settings,
        lastUpdated: new Date()
      });
    }
    
    await addNotification('success', `Scene "${scene.name}" activated`);
    res.json({ message: 'Scene activated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
