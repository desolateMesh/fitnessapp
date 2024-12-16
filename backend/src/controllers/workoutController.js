const Exercise = require('../models/Exercise');

exports.getExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    res.json(exercises);
  } catch (err) {
    next(err);
  }
};

exports.createExercise = async (req, res, next) => {
  try {
    const { name, videoUrl, description } = req.body;
    const exercise = await Exercise.create({ name, videoUrl, description });
    res.status(201).json(exercise);
  } catch (err) {
    next(err);
  }
};
