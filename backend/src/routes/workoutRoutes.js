// src/routes/workoutRoutes.js
const router = require('express').Router();
const { getExercises, createExercise } = require('../controllers/workoutController');
const authMiddleware = require('../middleware/authMiddleware');

// Basic exercise management
router.get('/exercises', authMiddleware, getExercises);
router.post('/exercises', authMiddleware, createExercise);

// Client workout routes
router.get('/client/:clientId', authMiddleware, async (req, res) => {
  try {
    // For now, return mock data
    const mockWorkouts = [
      { date: '2023-06-01', type: 'Strength', exercise: 'Bench Press', reps: 10, sets: 3, weight: 150, time: 45, notes: 'Felt good, increased weight' },
      { date: '2023-06-03', type: 'Cardio', exercise: 'Running', reps: 0, sets: 0, weight: 0, time: 30, notes: 'Easy pace' },
      { date: '2023-06-05', type: 'Strength', exercise: 'Squats', reps: 12, sets: 4, weight: 200, time: 50, notes: 'New personal best' },
    ];
    res.json(mockWorkouts);
  } catch (err) {
    console.error('Error fetching client workouts:', err);
    res.status(500).json({ error: err.message });
  }
});

// Save body stats
router.post('/stats/:clientId', authMiddleware, async (req, res) => {
  try {
    const { bodyWeight, bodyFat, date } = req.body;
    // TODO: Save to database
    res.json({ message: 'Stats saved successfully' });
  } catch (err) {
    console.error('Error saving body stats:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;