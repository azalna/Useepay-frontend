const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const axios = require('axios'); 
const User = require('./User'); 

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

const TWILIO_ACCOUNT_SID = 'YOUR_TWILIO_ACCOUNT_SID';
const TWILIO_AUTH_TOKEN = 'YOUR_TWILIO_AUTH_TOKEN';

const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Store OTPs in memory (in production, use a database)
const otpMap = new Map();

app.post('/send-otp', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const otp = generateOTP();

  // Store the OTP in memory (or a database) for verification
  otpMap.set(phoneNumber, otp);

  // Send the OTP via SMS using Twilio
  try {
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: 'YOUR_TWILIO_PHONE_NUMBER',
      to: phoneNumber,
    });

    res.status(200).send('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send('Error sending OTP');
  }
});

app.post('/verify-otp', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const userOTP = req.body.otp;

  // Retrieve the stored OTP from memory (or a database)
  const storedOTP = otpMap.get(phoneNumber);

  if (userOTP === storedOTP) {
    // OTP is valid, mark the phone number as authenticated
    otpMap.delete(phoneNumber);

    // Assuming you have a User model, update the user's phone number verification status
    try {
      const user = await User.findOne({ phoneNumber });
      if (user) {
        user.isPhoneVerified = true;
        await user.save();
      }

      res.status(200).send('Phone number authenticated');
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating user');
    }
  } else {
    res.status(400).send('Invalid OTP');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;