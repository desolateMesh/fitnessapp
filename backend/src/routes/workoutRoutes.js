const router = require('express').Router();
const { getExercises, createExercise } = require('../controllers/workoutController');
const auth = require('../middleware/authMiddleware');

router.get('/exercises', auth, getExercises);
router.post('/exercises', auth, createExercise);

module.exports = router;
