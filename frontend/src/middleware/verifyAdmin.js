const verifyAdmin = (req, res, next) => {
  console.log("User Role:", req.role); 
  if (req.role !== 'admin') {
    return res.status(403).send({
      success: false,
      message: "You are not authorized to perform this action"
    });
  };
  next();
};

module.exports = verifyAdmin;