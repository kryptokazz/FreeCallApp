// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const secretKey = 'testkey';

const loginUser = async (req, res) => {
  // Implementation for login route
  // ...
};

const registerUser = async (req, res) => {
  // Implementation for register route
  // ...
};

module.exports = {
  loginUser,
  registerUser,
};

