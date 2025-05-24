const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const authenticateJwt = passport.authenticate('jwt', { session: false });

// Generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role || 'user'
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '1d' }  
  );
};
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ 
    success: false,
    message: 'Access denied: Admin privilege required' 
  });
};

module.exports = {
  authenticateJwt,
  generateToken,
  isAdmin
};
