const { json } = require('body-parser');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];  
    console.log("Auth Header token:", authHeader);
    const token = authHeader?.split(' ')[1];
    console.log("Extracted Token:", token);
    if (!token) {
      return res.status(401).send({ message: 'Invalid Token' });
    };
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
      return res.status(401).send({ message: 'Invalid Token Or Not Valid' });
    };
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.error('Error While Verifying Token', error);
    res.status(401).send({ message: 'Error While Verifying Token' });
  }
};

module.exports = verifyToken;