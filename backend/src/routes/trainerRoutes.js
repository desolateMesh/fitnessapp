// routes/trainerRoutes.js
const express = require('express');
const router = express.Router();
const { TrainerClients, User } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/trainer/clients/:trainerId - Get all clients for a trainer
router.get('/clients/:trainerId', async (req, res) => {
  try {
    console.log('Fetching clients for trainer:', req.params.trainerId);
    const clients = await TrainerClients.findAll({
      where: { trainer_id: req.params.trainerId },
      include: [{
        model: User,
        as: 'client',
        attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'phone']
      }]
    });
    console.log('Found clients:', clients.length);
    res.json(clients);
  } catch (err) {
    console.error('Error fetching trainer clients:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/trainer/clients - Create trainer-client relationship
router.post('/clients', async (req, res) => {
  try {
    const { trainer_id, client_id } = req.body;
    console.log('Creating trainer-client relationship:', { trainer_id, client_id });

    // Verify both trainer and client exist
    const [trainer, client] = await Promise.all([
      User.findOne({ where: { id: trainer_id, role: 'trainer' } }),
      User.findOne({ where: { id: client_id, role: 'client' } })
    ]);

    if (!trainer || !client) {
      return res.status(404).json({ error: 'Trainer or client not found' });
    }

    // Check if relationship already exists
    const existing = await TrainerClients.findOne({
      where: { trainer_id, client_id }
    });

    if (existing) {
      return res.status(400).json({ error: 'This client is already assigned to this trainer' });
    }

    // Create the relationship
    const trainerClient = await TrainerClients.create({
      trainer_id,
      client_id,
      status: 'active',
      assigned_at: new Date()
    });

    res.status(201).json(trainerClient);
  } catch (err) {
    console.error('Error creating trainer-client relationship:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

