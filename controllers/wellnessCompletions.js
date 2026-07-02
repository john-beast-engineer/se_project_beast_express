const WellnessCompletion = require("../models/wellnessCompletion");
const BadRequestError = require("../errors/BadRequestError");

const createCompletion = (req, res, next) => {
  const { activityId } = req.body;

  WellnessCompletion.create({ activityId, owner: req.user._id })
    .then((completion) => res.status(201).send(completion))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid completion data"));
      }
      return next(err);
    });
};

const getCompletions = (req, res, next) => {
  WellnessCompletion.find({ owner: req.user._id })
    .sort({ completedAt: -1 })
    .then((completions) => res.send(completions))
    .catch(next);
};

module.exports = { createCompletion, getCompletions };