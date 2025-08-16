
const Notification = require('../models/Notification');

async function addNotification(type, message) {
  try {
    const notification = new Notification({
      type,
      message,
      time: 'Just now'
    });
    await notification.save();
  } catch (error) {
    console.error('Error adding notification:', error);
  }
}

module.exports = { addNotification };
