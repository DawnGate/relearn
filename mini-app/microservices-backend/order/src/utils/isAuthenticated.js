const jwt = require("jsonwebtoken");
const config = require("../config");

function isAuthenticated(req, res, next) {
  const token = req.header("Authorization");

  if (!token || !token?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header wrong format" });
  }

  token = token.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
}
