const router = require("express").Router();
const {
  getWorkouts,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workouts");

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.patch("/:workoutId", updateWorkout);
router.delete("/:workoutId", deleteWorkout);

module.exports = router;
