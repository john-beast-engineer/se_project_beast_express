const Workout = require("../models/workout");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/UnauthorizedError");

const getWorkouts = (req, res, next) => {
  Workout.find({ owner: req.user._id })
    .then((workouts) => res.send(workouts))
    .catch(next);
};

const createWorkout = (req, res, next) => {
  const { name, exercises } = req.body;

  Workout.create({ name, exercises, owner: req.user._id })
    .then((workout) => res.status(201).send(workout))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid workout data"));
      }
      return next(err);
    });
};

const updateWorkout = (req, res, next) => {
  const { workoutId } = req.params;
  const { completed } = req.body;

  Workout.findOneAndUpdate(
    { _id: workoutId, owner: req.user._id },
    { completed },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError("Workout not found"))
    .then((workout) => res.send(workout))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid workout id"));
      }
      return next(err);
    });
};

const deleteWorkout = (req, res, next) => {
  const { workoutId } = req.params;

  Workout.findOneAndDelete({ _id: workoutId, owner: req.user._id })
    .orFail(() => new NotFoundError("Workout not found"))
    .then(() => res.send({ message: "Workout deleted" }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid workout id"));
      }
      return next(err);
    });
};

module.exports = { getWorkouts, createWorkout, updateWorkout, deleteWorkout };
