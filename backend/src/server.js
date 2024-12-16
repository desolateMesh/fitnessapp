const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
require('dotenv').config();

const app = express();

// Use consistent port in both CORS config and logging
app.use(cors({
  origin: 'http://localhost:5173', // matches your frontend port
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', trainerRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ PostgreSQL connection established');
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('CORS enabled for:', 'http://localhost:5173'); // Updated to match CORS config
    });

    process.on('SIGTERM', () => {
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();