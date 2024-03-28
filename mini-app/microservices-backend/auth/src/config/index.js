require("dotenv").config();

module.exports = {
  mongoUri: process.env.MONGO_AUTH_URI,
  jwtSecret: process.env.JWT_SECRET,
};
