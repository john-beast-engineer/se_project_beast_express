const mongoose = require("mongoose");

const customExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  isGlobal: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  videoUrl: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("customExercise", customExerciseSchema);
