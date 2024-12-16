// src/routes/trainerRoutes.js
const express = require('express');
const router = express.Router();
const { User, TrainerClients } = require('../models');
const { Op } = require('sequelize');

// Get all clients for a specific trainer
router.get('/trainer-clients/:trainerId', async (req, res) => {
  try {
    const trainerClients = await TrainerClients.findAll({
      where: { trainer_id: req.params.trainerId },
      include: [{
        model: User,
        as: 'client',
        attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'phone'],
      }],
    });
    res.json(trainerClients);
  } catch (err) {
    console.error('Error fetching trainer clients:', err);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// Add a new client to trainer
router.post('/trainer-clients', async (req, res) => {
  try {
    const { trainerId, email } = req.body;
    
    // First find or validate the client user
    const clientUser = await User.findOne({
      where: { 
        email,
        role: 'client'
      }
    });

    if (!clientUser) {
      return res.status(404).json({ error: 'Client not found' });
    }

    // Check if relationship already exists
    const existingRelation = await TrainerClients.findOne({
      where: {
        trainer_id: trainerId,
        client_id: clientUser.id
      }
    });

    if (existingRelation) {
      return res.status(400).json({ error: 'Client already assigned to trainer' });
    }

    // Create new trainer-client relationship
    const newTrainerClient = await TrainerClients.create({
      trainer_id: trainerId,
      client_id: clientUser.id,
      status: 'active'
    });

    res.json(newTrainerClient);
  } catch (err) {
    console.error('Error adding trainer client:', err);
    res.status(500).json({ error: 'Failed to add client' });
  }
});

// Remove client from trainer
router.delete('/trainer-clients/:trainerId/:clientId', async (req, res) => {
  try {
    const { trainerId, clientId } = req.params;
    await TrainerClients.destroy({
      where: {
        trainer_id: trainerId,
        client_id: clientId
      }
    });
    res.json({ message: 'Client removed successfully' });
  } catch (err) {
    console.error('Error removing trainer client:', err);
    res.status(500).json({ error: 'Failed to remove client' });
  }
});

module.exports = router;