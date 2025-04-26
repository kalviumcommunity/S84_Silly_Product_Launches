const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  const token = req.cookies.token; // Retrieve the token from the cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = validateUser;