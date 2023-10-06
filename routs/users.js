const express = require("express");
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const flash = require('express-flash'); 

const User = require('../User'); 


router.use(flash());

router.use(cors({
  origin: 'http://localhost:19006', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('Received registration data:', name, email, password);

    const user = await User.findOne({ email });

    if (user) {
      req.flash('error', 'Email already exists'); 
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (!name || !email || !password) {
      req.flash('error', 'Please enter all fields'); 
      return res.status(400).json({ error: 'Please enter all fields' });
    }

    if (password.length < 6) {
      req.flash('error', 'Password must be at least 6 characters'); 
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    req.flash('success', 'User registered successfully'); 
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Received data for login:', email, password);

    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error', 'User not found'); 
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      req.flash('error', 'Invalid password'); 
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create and send a JWT token upon successful login
    const token = jwt.sign({ userId: user._id }, 'your-secret-key'); // Replace with your actual secret key
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
