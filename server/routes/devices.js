
const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const { addNotification } = require('../utils/notifications');

// Get all devices
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get device by ID
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update device
router.put('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );
    
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    await addNotification('info', `${device.name} updated`);
    res.json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Toggle device status
router.post('/:id/toggle', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    device.status = !device.status;
    device.lastUpdated = new Date();
    await device.save();
    
    await addNotification('info', `${device.name} ${device.status ? 'turned on' : 'turned off'}`);
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new device
router.post('/', async (req, res) => {
  try {
    const device = new Device(req.body);
    await device.save();
    await addNotification('success', `Device "${device.name}" added successfully`);
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete device
router.delete('/:id', async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    await addNotification('warning', `Device "${device.name}" removed`);
    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
