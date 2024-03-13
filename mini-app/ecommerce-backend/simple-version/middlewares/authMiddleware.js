const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");

const authMiddleware = asyncHandler(async function (req, res, next) {
  try {
    const token =
      req.headers.authorization.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded?.id);

    req.user = user;

    next();
  } catch (err) {
    res.status(401);
    throw new Error("Authorized error");
  }
});

const isAdminMiddleware = asyncHandler(async function (req, res, next) {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      throw new Error("You is not admin");
    }
    next();
  } catch (err) {
    res.status(403);
    throw new Error("You not allowed to this action");
  }
});

module.exports = {
  authMiddleware,
  isAdminMiddleware,
};
