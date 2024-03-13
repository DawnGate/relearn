const { generateRefreshToken, generateToken } = require("../config/jwtToken");
const User = require("../model/userModel");

const asyncHandler = require("express-async-handler");
const { validateMongDbbId } = require("../utils/validateMongodbId");

const createUser = asyncHandler(async (req, res) => {
  const body = req.body;

  // TODO: Check required field and response for user

  const foundUser = await User.findOne({ email: body.email });

  if (!foundUser) {
    try {
      const newUser = await User.create({
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        mobile: body.mobile,
        password: body.password,
      });

      res.status(201);
      res.json({
        msg: "Created successful!",
      });
    } catch (err) {
      throw new Error("Something wrong");
    }
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

  try {
    const refreshToken = generateRefreshToken(findUser._id);
    const accessToken = generateToken(findUser._id);

    const updateUser = await User.findByIdAndUpdate(findUser._id, {
      refreshToken,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.json({
      id: updateUser._id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      role: updateUser.role,
      mobile: updateUser.mobile,
      email: updateUser.email,
      accessToken,
    });
  } catch (err) {
    throw new Error("Something wrong");
  }
});

const getAllUser = asyncHandler(async function (req, res) {
  try {
    const getUsers = await User.find();

    // TODO: 1. only fields need, 2. pagination
    res.json(getUsers);
  } catch (err) {
    throw new Error("Something wrong");
  }
});

const getAUser = asyncHandler(async function (req, res) {
  const { id } = req.params;

  validateMongDbbId(id);

  try {
    const foundUser = await User.findById(id);
    res.json({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      mobile: foundUser.mobile,
      email: foundUser.email,
      id: foundUser._id,
    });
  } catch (err) {
    throw new Error(err);
  }
});

const deleteAUser = asyncHandler(async function (req, res) {
  const { id } = req.params;

  validateMongDbbId(id);

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (err) {
    throw new Error(err);
  }
});

const updateUser = asyncHandler(async function (req, res) {
  const { id } = req.params;

  validateMongDbbId(id);

  const { id: userId, role } = req.user;

  if (id !== userId && role !== "admin") {
    throw new Error("You are not allowed to update this user");
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (err) {
    throw new Error(err);
  }
});

const blockUser = asyncHandler(async function (req, res) {
  const { id } = req.params;

  validateMongDbbId(id);

  try {
    const blockedUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockedUser);
  } catch (err) {
    throw new Error(err);
  }
});

const unBlockUser = asyncHandler(async function (req, res) {
  const { id } = req.params;

  validateMongDbbId(id);

  try {
    const unBlockedUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json(unBlockedUser);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createUser,
  loginUser,
  getAllUser,
  getAUser,
  deleteAUser,
  updateUser,
  blockUser,
  unBlockUser,
};
