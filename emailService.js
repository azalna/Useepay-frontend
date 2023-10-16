const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a Nodemailer transporter with your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Example: Gmail
  auth: {
    user: process.env.EMAIL_USER, // Use the environment variable
    pass: process.env.EMAIL_PASSWORD,// Your email password
  },
});

// Function to send a password reset email
const sendPasswordResetEmail = (recipientEmail, resetToken) => {
  const mailOptions = {
    from: 'useepayusep@gmail.com', // Sender's email address
    to: recipientEmail, // Recipient's email address
    subject: 'Password Reset', // Email subject
    text: `You have requested a password reset. Use this token: ${resetToken}`, // Plain text body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Password reset email sent:', info.response);
    }
  });
};

module.exports = { sendPasswordResetEmail };
