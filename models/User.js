const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email uniqueness
        // Add custom email validation if needed
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    referralLink: {
        type: String,

    },
    referredBy: {
        type: [mongoose.Schema.Types.ObjectId], // Store the user who referred this user
        ref: 'User' // Reference to the User model
    },
    referralPoints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', Userschema);

module.exports = User;
