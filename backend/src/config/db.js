// In backend/src/config/db.js
require('dotenv').config({ path: './.env' });
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
  logging: console.log, // Enable logging temporarily
});

// Test the connection immediately
sequelize.authenticate()
  .then(() => {
    console.log('✓ PostgreSQL connection established');
  })
  .catch(err => {
    console.error('✕ PostgreSQL connection error:', err);
  });

module.exports = sequelize;