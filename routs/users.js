const express = require("express");
const router = express.Router();
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const User = require('../User');
const flash = require('express-flash');
const axios = require('axios'); 
const nodemailer = require('nodemailer');


router.use(flash());

router.use(cors({
  origin: 'http://localhost:19006', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.use(session({
  secret: 'your-secret-key', // Replace with a secret key for session management
  resave: false,
  saveUninitialized: true
}));



const crypto = require('crypto');

const generateResetToken = () => {
  // Generate a random token, e.g., using a library like crypto
  return crypto.randomBytes(20).toString('hex');
};



// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: 'smtp.elasticemail.com',
  port: 2525,
  auth: {
    user: 'useepay0@gmail.com',
    pass: '26CBD11DF213F1A4B89A0E387AC7A48722AD',
  },
});

// Function to send a password reset email
const sendPasswordResetEmail = (recipientEmail, resetToken) => {
  const mailOptions = {
    from: 'useepay0@gmail.com',
    to: recipientEmail,
    subject: 'Password Reset',
    text: `To reset your password, click the following link: http://localhost:19006/reset-password?token=${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });
};

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Generate a reset token
      const resetToken = generateResetToken();

      // Save the reset token to the user document along with an expiration time
      user.resetToken = resetToken;
      user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();

      // Send a password reset email with a link containing the reset token
      sendPasswordResetEmail(user.email, resetToken);

      return res.json({ message: 'Password reset email sent' });
  } catch (error) {
      console.error('Password reset request error:', error);
      return res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/reset-password', async (req, res) => {
  const { resetToken, password } = req.body;

  try {
    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    return res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting the password:', error); // Log the error
    return res.status(500).json({ message: 'Failed to reset the password' });
  }
});







router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Received registration data:', name, email, password);

  if (!name || !email || !password) {
    req.flash('error', 'Please enter all fields'); 
    return res.status(400).json({ error: 'Please enter all fields' });
  }

  // Include the verifyEmail function here
  const verifyEmail = async (email) => {
    const apiKey = process.env.EMAIL_API_KEY;
    try {
      const response = await axios.get(`https://api.zerobounce.net/v2/validate?apikey=${apiKey}&email=${email}`);
      
      // Check the response from ZeroBounce for verification results
      const data = response.data;
      console.log('ZeroBounce API Response:', data); // Add this line for debugging
    
      if (data.status === 'valid') {
        console.log(`Email ${email} is valid.`);
        return true;
      } else if (data.status === 'invalid') {
        console.log(`Email ${email} is invalid.`);
        return false;
      } else {
        console.log(`Email verification for ${email} returned an unknown status.`);
        return false;
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error('Error verifying email: Access to the API is forbidden. Check your API key and permissions.');
        return false;
      } else {
        console.error('Error verifying email:', error.message);
        return false;
      }
    }
  };

  try {
    const user = await User.findOne({ email });

    if (user) {
      req.flash('error', 'Email already exists'); 
      return res.status(400).json({ error: 'Email already exists' });
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
