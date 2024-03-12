const User = require("../model/userModal");

const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  // TODO: Check required field and response for user

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already existed!");
  }
});

module.exports = {
  createUser,
};
