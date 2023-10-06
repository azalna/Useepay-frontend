const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Set up CORS middleware to allow requests from your React Native app
app.use(cors({
  origin: 'http://localhost:19006', // Replace with your React Native app's URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

app.use(express.json());

// Connect to your MongoDB database (Make sure you've configured db.js)
const dbConnection = require('./db');

app.use('/', require("./routs/users"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});