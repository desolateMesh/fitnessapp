const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Fixed import
const { Op } = require('sequelize');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Middleware to check if user is admin or trainer
const isAdminOrTrainer = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'trainer') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin or trainer role required.' });
  }
};

// POST /api/users - Create a new user (admin and trainers only)
router.post('/', isAdminOrTrainer, async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    const { username, email, password, role = 'client' } = req.body;
    
    // Trainers can only create clients
    if (req.user.role === 'trainer' && role !== 'client') {
      return res.status(403).json({ 
        error: 'Trainers can only create client accounts' 
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ 
        error: 'Username or email already exists' 
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role
    });

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (err) {
    console.error('Error creating user:', err); // Debug log
    res.status(500).json({ error: err.message });
  }
});

// GET /api/users - Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /api/users/trainer/:clientId - Get trainer info for a client
router.get('/trainer/:clientId', async (req, res) => {
  try {
    const trainerClient = await TrainerClients.findOne({
      where: { client_id: req.params.clientId },
      include: [{
        model: User,
        as: 'trainer',
        attributes: ['id', 'username', 'email', 'first_name', 'last_name']
      }]
    });

    if (!trainerClient) {
      return res.status(404).json({ error: 'No trainer assigned' });
    }

    res.json(trainerClient);
  } catch (err) {
    console.error('Error fetching trainer info:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;