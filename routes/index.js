const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const userRouter = require("./users");
const workoutRouter = require("./workouts");
const NotFoundError = require("../errors/NotFoundError");

router.post("/signup", createUser);
router.post("/signin", login);

router.use(auth);
router.use("/users", userRouter);
router.use("/workouts", workoutRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
