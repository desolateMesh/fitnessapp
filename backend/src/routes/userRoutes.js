const express = require('express');
const router = express.Router();
const { User } = require('../models/User'); // Import the User model

// GET /api/users - Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
