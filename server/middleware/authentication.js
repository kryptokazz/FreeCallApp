// middleware/authentication.js
const jwt = require('jsonwebtoken');
const { generateAuthToken } = require('../path/to/auth');

function authenticateToken(req, res, next) {
 const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });

    req.user = user; // Attach the user information to the request

    // Check permissions based on the endpoint
    if (checkPermissions(req)) {
      next(); // User has the necessary permissions
    } else {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
  });
}

function checkPermissions(req) {
  const { user } = req;

  // Implement your logic to check permissions based on the endpoint
  // For example, check if the user has the 'admin' role for admin-only endpoints
  // You might also check if the user has a 'user' role for general access
  return user && user.roles && user.roles.includes('admin');
}

module.exports = { authenticateToken, generateAuthToken };

