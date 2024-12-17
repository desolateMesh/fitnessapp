// src/models/index.js
const User = require('./User');
const TrainerClients = require('./TrainerClients');

// Set up associations
User.hasMany(TrainerClients, {
  as: 'trainedClients',
  foreignKey: 'trainer_id'
});

User.hasMany(TrainerClients, {
  as: 'trainerAssignments',
  foreignKey: 'client_id'
});

TrainerClients.belongsTo(User, {
  as: 'trainer',
  foreignKey: 'trainer_id'
});

TrainerClients.belongsTo(User, {
  as: 'client',
  foreignKey: 'client_id'
});

module.exports = {
  User,
  TrainerClients
};