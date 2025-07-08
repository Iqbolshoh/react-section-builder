const jwt = require('jsonwebtoken');
const db = require('../db');

// Middleware to verify JWT token
exports.auth = async (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    const result = await db.query(
      'SELECT id, name, email, role FROM users WHERE id = $1',
      [decoded.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    
    req.user = result.rows[0];
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin role required.' });
  }
};

// Middleware to check if user is the owner of a website or an admin
exports.ownerOrAdmin = async (req, res, next) => {
  try {
    const websiteId = req.params.id;
    
    // If user is admin, allow access
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Check if user is the owner of the website
    const result = await db.query(
      'SELECT * FROM websites WHERE id = $1 AND owner_id = $2',
      [websiteId, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(403).json({ message: 'Access denied. You do not own this website.' });
    }
    
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};