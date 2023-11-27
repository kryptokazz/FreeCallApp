const jwt = require('jsonwebtoken');

const adminUser = {
  user_id: 49,  // Replace with the actual user ID
  username: 'admin',
  roles: ['user', 'admin'],
};

const secretKey = 'yourSecretKey'; // Use your actual secret key
const token = jwt.sign(adminUser, secretKey, { expiresIn: '1h' });

console.log('JWT Token:', token);

