// src/routes/trainerRoutes.js
const express = require('express');
const router = express.Router();
const { TrainerClients, User } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware to ensure user is a trainer
const isTrainer = (req, res, next) => {
  if (req.user.role !== 'trainer') {
    return res.status(403).json({ error: 'Access denied. Trainer role required.' });
  }
  next();
};

// Get all clients for a trainer
router.get('/clients', authMiddleware, isTrainer, async (req, res) => {
  try {
    const clients = await TrainerClients.findAll({
      where: { trainer_id: req.user.id },
      include: [{
        model: User,
        as: 'client',
        attributes: ['id', 'username', 'email']
      }]
    });
    res.json(clients);
  } catch (err) {
    console.error('Error fetching trainer clients:', err);
    res.status(500).json({ error: err.message });
  }
});

// Assign a client to a trainer
router.post('/clients', authMiddleware, isTrainer, async (req, res) => {
  try {
    const { client_id } = req.body;
    console.log('Request body:', req.body); // Debug log

    // Verify client exists and is a client
    const client = await User.findOne({
      where: {
        id: client_id,
        role: 'client'
      }
    });

    if (!client) {
      return res.status(404).json({ error: 'Client not found or invalid role' });
    }

    // Check if relationship already exists
    const existingRelationship = await TrainerClients.findOne({
      where: {
        trainer_id: req.user.id,
        client_id
      }
    });

    if (existingRelationship) {
      return res.status(400).json({ error: 'Client is already assigned to this trainer' });
    }

    // Create trainer-client relationship
    const trainerClient = await TrainerClients.create({
      trainer_id: req.user.id,
      client_id
    });

    res.status(201).json(trainerClient);
  } catch (err) {
    console.error('Error assigning client:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;