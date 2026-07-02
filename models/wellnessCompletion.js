const mongoose = require("mongoose");

const wellnessCompletionSchema = new mongoose.Schema({
  activityId: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  completedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("wellnessCompletion", wellnessCompletionSchema);
