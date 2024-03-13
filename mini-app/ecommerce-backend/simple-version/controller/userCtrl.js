const { generateRefreshToken } = require("../config/jwtToken");
const User = require("../model/userModel");

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

const loginUser = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  const findUser = await User.findOne({
    email,
  });

  if (!findUser) {
    throw new Error("User not existed");
  }

  const isPasswordCorrect = await findUser.isPasswordMatched(password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }

  const refreshToken = generateRefreshToken(findUser._id);

  res.json({
    hey: "Ho",
  });
});

module.exports = {
  createUser,
  loginUser,
};
