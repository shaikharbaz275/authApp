// authController.js

const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust path as needed

// Registration logic
exports.register = async (req, res) => {
     const { first_name, last_name, mobile_no, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in MySQL
    await User.create({ first_name, last_name, mobile_no, email, password: hashedPassword });
     req.session.user = email;
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login logic
exports.login = async (req, res) => {
   const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create session
    req.session.user = email;
    res.json({ msg: 'Logged in' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


// index logic
exports.home = async (req, res) => {
   const users = await User.findAll();
    res.render('index',{ users });
  };

// logout logic
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
       res.redirect('/');
    } else {
     res.redirect('/login');
    }
  });
};
