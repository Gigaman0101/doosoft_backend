const router = require('express').Router();
const passport = require('passport');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');

const auth = passport.authenticate("jwt-auth", { session: false });

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

module.exports = router;