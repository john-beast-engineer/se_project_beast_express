const router = require("express").Router();
const {
  createExercise,
  getExercises,
  deleteExercise,
} = require("../controllers/customExercises");

router.get("/", getExercises);
router.post("/", createExercise);
router.delete("/:exerciseId", deleteExercise);

module.exports = router;
