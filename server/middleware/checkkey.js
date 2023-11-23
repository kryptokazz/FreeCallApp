const jwt = require('jsonwebtoken');

// Your secret key for signing the token
const secretKey = 'testkey';

// Replace this with the actual token you want to check
const tokenToCheck = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyOCwidXNlcm5hbWUiOiJqb2huX3NtaXRoIiwiaWF0IjoxNzAwNjIzODQxLCJleHAiOjE3MDA2Mjc0NDF9.KFROp-zMqPhxMECTJK83w5ZPnyAG74MjHE2_FrS2woI';

// Verify the token
jwt.verify(tokenToCheck, secretKey, (err, decoded) => {
  if (err) {
    console.error('Token is invalid:', err.message);
  } else {
    console.log('Token is valid:', decoded);
  }
});

