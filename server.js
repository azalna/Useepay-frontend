const express = require('express');
const mongoose = require('mongoose');
mongoose.set('debug', true);
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios'); 

require('dotenv').config();

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
axios.interceptors.request.use(config => {
  // Log the request or make modifications
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor
axios.interceptors.response.use(response => {
  // Log the response or make modifications
  return response;
}, error => {
  return Promise.reject(error);
});
// Connect to your MongoDB database (Make sure you've configured db.js)
const dbConnection = require('./db');

// const userRout=require('./routs/users')
// app.use('/api/users' ,userRout);

app.use('/', require("./routes/users"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});