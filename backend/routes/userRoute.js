const express = require('express');
const router = express.Router();
const { registerUser , loginUser, logout , forgotPassword, resetPassword } = require('../Controllers/userController');

//For Creating User Route
router.route("/register").post(registerUser);

//for login
router.route("/login").post(loginUser);

//Forgot password
router.route("/password/forgot").post(forgotPassword);

//ResetPassword
router.route("/password/reset/:token").put(resetPassword);

//for Logout
router.route("/logout").post(logout);

module.exports = router;