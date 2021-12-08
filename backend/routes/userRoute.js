const express = require('express');
const router = express.Router();
const { registerUser , loginUser, logout , forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateRole, deleteUser } = require('../Controllers/userController');
const{ isAuthenticatedUser,authorizeRoles } = require('../middleware/auth');

//For Creating User Route
router.route("/register").post(registerUser);

//for login
router.route("/login").post(loginUser);

//Forgot password
router.route("/password/forgot").post(forgotPassword);

//ResetPassword
router.route("/password/reset/:token").put(resetPassword);

//Get user Details
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//for Update password
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

//For Update Profile
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

//for Logout
router.route("/logout").post(logout);

// Get all users -- admin
router.route("/admin/users").get(isAuthenticatedUser,authorizeRoles("admin"),getAllUsers);

// Get a single user details -- admin
router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser);

//For updating user role -- admin
router.route("/admin/user/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateRole);

//For deleting user -- admin
router.route("/admin/user/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);


module.exports = router;