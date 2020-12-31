const router = require('express').Router();
const passport = require('passport');
const { register, getAllUsers } = require('../controllers/userController');

const auth = passport.authenticate("jwt-auth", { session: false });

router.post("/register", register);
router.get("/", getAllUsers);

module.exports = router;