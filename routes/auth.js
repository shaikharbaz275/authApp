const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Adjust path as needed
const authController = require('../controllers/authController'); // Adjust path as needed



// Route for login page
router.get('/login', (req, res) => {
  res.render('login'); // Render the login.ejs file
});

// Route for registration page
router.get('/register', (req, res) => {
    res.render('register'); // Render the login.ejs file
});

// Route for registration page
router.get('/', authMiddleware,authController.home);
// Register
router.post('/register',authController.register);
// Login
router.post('/login', authController.login);
// Logout
router.post('/logout', authController.logout);

module.exports = router;
