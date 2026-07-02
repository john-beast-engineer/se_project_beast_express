const router = require("express").Router();
const {
  createCompletion,
  getCompletions,
} = require("../controllers/wellnessCompletions");

router.get("/", getCompletions);
router.post("/", createCompletion);

module.exports = router;
