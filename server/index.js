
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const initializeDefaultData = require('./utils/initData');

// Import routes
const devicesRoutes = require('./routes/devices');
const roomsRoutes = require('./routes/rooms');
const automationsRoutes = require('./routes/automations');
const notificationsRoutes = require('./routes/notifications');
const scenesRoutes = require('./routes/scenes');
const usersRoutes = require('./routes/users');
const energyRoutes = require('./routes/energy');
const settingsRoutes = require('./routes/settings');
const analyticsRoutes = require('./routes/analytics');
const quickActionsRoutes = require('./routes/quickActions');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Initialize default data on startup
initializeDefaultData();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Smart Home API is running with MongoDB' });
});

// API Routes
app.use('/api/devices', devicesRoutes);
app.use('/api/rooms', roomsRoutes);
app.use('/api/automations', automationsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/scenes', scenesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/energy', energyRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/quick-actions', quickActionsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Smart Home API server running on http://0.0.0.0:${PORT}`);
  console.log('Connected to MongoDB');
});
