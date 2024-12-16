// src/models/TrainerClients.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TrainerClients = sequelize.define('TrainerClients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  trainer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  client_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'trainer_clients',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['trainer_id', 'client_id']
    }
  ]
});

module.exports = TrainerClients;