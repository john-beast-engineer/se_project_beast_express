const CustomExercise = require("../models/customExercise");
const User = require("../models/user");
const { ADMIN_EMAIL } = require("../utils/config");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");

const createExercise = (req, res, next) => {
  const { name, category, description, imageUrl, videoUrl } = req.body;

  User.findById(req.user._id)
    .orFail(() => new NotFoundError("User not found"))
    .then((user) => {
      const isGlobal = user.email === ADMIN_EMAIL;

      return CustomExercise.create({
        name,
        category,
        description,
        imageUrl,
        videoUrl,
        owner: user._id,
        isGlobal,
      });
    })
    .then((exercise) => res.status(201).send(exercise))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid exercise data"));
      }
      return next(err);
    });
};

const getExercises = (req, res, next) => {
  CustomExercise.find({
    $or: [{ isGlobal: true }, { owner: req.user._id }],
  })
    .then((exercises) => res.send(exercises))
    .catch(next);
};

const deleteExercise = (req, res, next) => {
  const { exerciseId } = req.params;

  CustomExercise.findOneAndDelete({ _id: exerciseId, owner: req.user._id })
    .orFail(() => new NotFoundError("Exercise not found"))
    .then(() => res.send({ message: "Exercise deleted" }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid exercise id"));
      }
      return next(err);
    });
};

module.exports = { createExercise, getExercises, deleteExercise };
