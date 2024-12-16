// src/models/index.js
const User = require('./User');
const TrainerClients = require('./TrainerClients');

// Set up associations
User.belongsToMany(User, {
  through: TrainerClients,
  as: 'clients',
  foreignKey: 'trainer_id',
  otherKey: 'client_id'
});

User.belongsToMany(User, {
  through: TrainerClients,
  as: 'trainers',
  foreignKey: 'client_id',
  otherKey: 'trainer_id'
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