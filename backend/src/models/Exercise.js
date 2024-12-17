// src/models/Exercise.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Exercise = sequelize.define('Exercise', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'exercises',
  timestamps: true,
  underscored: true
});

module.exports = Exercise;