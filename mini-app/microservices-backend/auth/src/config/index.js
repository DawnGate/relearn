const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

module.exports = {
  mongoUri: process.env.MONGO_AUTH_URI,
  jwtSecret: process.env.JWT_SECRET,
  bcryptSalt: process.env.SALT,
  port: 3000,
};
