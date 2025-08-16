
const Device = require('../models/Device');
const Room = require('../models/Room');
const Automation = require('../models/Automation');
const Settings = require('../models/Settings');
const Energy = require('../models/Energy');

async function initializeDefaultData() {
  try {
    const deviceCount = await Device.countDocuments();
    if (deviceCount === 0) {
      await Device.insertMany([
        { name: 'Living Room Lights', type: 'light', room: 'living', status: true, brightness: 75 },
        { name: 'Bedroom AC', type: 'ac', room: 'bedroom', status: false, temperature: 22 },
        { name: 'Kitchen Smart Lock', type: 'lock', room: 'kitchen', status: true },
        { name: 'Garden Sprinkler', type: 'sprinkler', room: 'garden', status: false, schedule: '06:00' },
        { name: 'Home Theater', type: 'entertainment', room: 'living', status: false, volume: 30 },
        { name: 'Security Camera', type: 'camera', room: 'entrance', status: true, recording: true },
        { name: 'Smart Thermostat', type: 'thermostat', room: 'living', status: true, temperature: 24, targetTemp: 24 },
        { name: 'Garage Door', type: 'garage', room: 'garage', status: false }
      ]);
    }

    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
      await Room.insertMany([
        { _id: 'living', name: 'Living Room', temperature: 24, humidity: 45, devices: 3, occupied: true },
        { _id: 'bedroom', name: 'Bedroom', temperature: 22, humidity: 50, devices: 2, occupied: false },
        { _id: 'kitchen', name: 'Kitchen', temperature: 26, humidity: 40, devices: 2, occupied: false },
        { _id: 'garden', name: 'Garden', temperature: 28, humidity: 35, devices: 1, occupied: false },
        { _id: 'garage', name: 'Garage', temperature: 20, humidity: 30, devices: 1, occupied: false }
      ]);
    }

    const automationCount = await Automation.countDocuments();
    if (automationCount === 0) {
      await Automation.insertMany([
        { name: 'Good Morning', time: '07:00', active: true, actions: ['Turn on lights', 'Start coffee maker', 'Open blinds'], lastTriggered: 'Yesterday' },
        { name: 'Away Mode', trigger: 'location', active: true, actions: ['Lock doors', 'Turn off lights', 'Arm security'], lastTriggered: '2 hours ago' },
        { name: 'Sleep Mode', time: '23:00', active: false, actions: ['Turn off all lights', 'Lower AC temperature', 'Lock doors'], lastTriggered: 'Never' },
        { name: 'Movie Night', trigger: 'manual', active: true, actions: ['Dim lights', 'Turn on TV', 'Close blinds'], lastTriggered: 'Last week' }
      ]);
    }

    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
      await new Settings({
        theme: 'dark',
        notifications: true,
        autoSave: true,
        language: 'en',
        currency: 'USD',
        temperatureUnit: 'C'
      }).save();
    }

    const energyCount = await Energy.countDocuments();
    if (energyCount === 0) {
      await new Energy({
        currentUsage: 2.4,
        dailyUsage: 48.6,
        monthlyUsage: 1230,
        cost: 156.78,
        peakHours: '6:00 PM - 9:00 PM',
        efficiency: 87
      }).save();
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
}

module.exports = initializeDefaultData;
