// src/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('✓ PostgreSQL connection established');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Log CORS origin
app.use((req, res, next) => {
  console.log('CORS enabled for:', 'http://localhost:5173');
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trainer', trainerRoutes);  
app.use('/api/workouts', workoutRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;