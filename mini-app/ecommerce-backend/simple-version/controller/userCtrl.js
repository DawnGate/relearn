const jwt = require("jsonwebtoken");
const uniqid = require("uniqid");

const crypto = require("crypto");

const asyncHandler = require("express-async-handler");

const { generateRefreshToken, generateToken } = require("../config/jwtToken");

const User = require("../model/userModel");
const Cart = require("../model/cartModel");
const Order = require("../model/orderModel");
const Product = require("../model/productModel");
const Coupon = require("../model/couponModel");

const { validateMongDbbId } = require("../utils/validateMongodbId");
const { sendEmail } = require("./emailCtrl");

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

const refreshNewToken = asyncHandler(async function (req, res) {
  try {
    const cookies = req.cookies;
    const { refreshToken } = cookies;
    const { id, refreshToken: userRefreshToken } = req.user;

    if (refreshToken !== userRefreshToken) {
      throw new Error("Refresh token different");
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err || decoded.id !== id) {
        throw new Error("Refresh token error");
      }

      const newAccessToken = generateToken(id);

      res.json({
        token: newAccessToken,
      });
    });
  } catch (err) {
    throw new Error("Can't generate new token");
  }
});

const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  const { refreshToken: userRefreshToken, id } = req.user;
  if (!refreshToken) {
    throw new Error("No refresh token in cookies");
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  if (refreshToken !== userRefreshToken) {
    res.status(403);
    throw new Error("Forbidden");
  }

  await User.findByIdAndUpdate(id, {
    refreshToken: null,
  });

  res.sendStatus(200);
});

const updatePassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password } = req.body;

  validateMongDbbId(id);

  if (!password) {
    throw new Error("Password is required");
  }

  const user = await User.findById(id);
  try {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    throw new Error(err);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const token = await user.createPasswordResetToken();
    await user.save();

    const resetUrl = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:${process.env.PORT}/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey user",
      subject: "Forgot password link",
      html: resetUrl,
    };

    sendEmail(data);
    res.json(token);
  } catch (err) {
    throw new Error(err);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token Expired, please try again later");

  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  await user.save();

  res.json(user);
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

const getWishList = asyncHandler(async (req, res) => {
  const { id } = req.user;
  validateMongDbbId(id);

  try {
    const foundUser = await User.findById(id).populate("wishlist");
    res.json(foundUser);
  } catch (err) {
    throw new Error(err);
  }
});

const saveAddress = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { address } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        address,
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

const userCart = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { cart } = req.body;

  validateMongDbbId(id);

  try {
    const alreadyExistCart = await Cart.findOne({
      orderBy: id,
    });

    if (alreadyExistCart) {
      await Cart.findByIdAndDelete(alreadyExistCart._id);
    }

    let products = [];
    for (let i = 0; i < cart.length; i++) {
      const product = await Product.findById(cart[i].prodId)
        .select("price")
        .exec();
      let object = {
        product: cart[i].prodId,
        count: cart[i].count,
        color: cart[i].color,
        price: product.price,
      };
      products.push(object);
    }

    const cartTotal = products.reduce(
      (cur, product) => cur + product.count * product.price,
      0
    );

    const newCart = await Cart.create({
      products,
      orderBy: id,
      cartTotal,
    });

    res.json(newCart);
  } catch (err) {
    throw new Error(err);
  }
});

const getUserCart = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  try {
    const foundCart = await Cart.findOne({
      orderBy: userId,
    }).populate("products.product");
    res.json(foundCart);
  } catch (err) {
    throw new Error(err);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;

  try {
    const foundCart = await Cart.findOneAndDelete({
      orderBy: userId,
    });

    res.json({
      message: "clear cart success",
    });
  } catch (err) {
    throw new Error(err);
  }
});

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body;

  const { id: userId } = req.user;

  try {
    const foundCoupon = await Coupon.findOne({
      title: coupon,
    });

    if (
      !foundCoupon ||
      !foundCoupon.expires ||
      foundCoupon.expires < Date.now()
    ) {
      throw new Error("Not valid coupon");
    }

    const foundCart = await Cart.findOne({
      orderBy: userId,
    });

    if (!foundCart || !foundCart.products.length) {
      throw new Error("Cart is empty");
    }

    let afterApplyCoupon =
      foundCart.cartTotal - (foundCart.cartTotal * foundCoupon.discount) / 100;
    afterApplyCoupon = afterApplyCoupon.toFixed(2);

    await Cart.findByIdAndUpdate(foundCart.findById, {
      totalAfterDiscount: afterApplyCoupon,
    });

    res.json(afterApplyCoupon);
  } catch (err) {
    throw new Error(err);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { id: userId } = req.user;
  validateMongDbbId(userId);

  try {
    if (!COD) {
      throw new Error("Create cart order fail");
    }
    const userFound = await User.findById(userId);

    const userCart = await Cart.findOne({
      orderBy: userId,
    });

    let finalAmount = userCart.cartTotal;

    if (couponApplied) {
      finalAmount = userCart.afterApplyCoupon;
    }

    const newOrder = await Order.create({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: "COD",
        amount: finalAmount,
        created: Date.now(),
        currency: "USD",
        status: "Cash on Delivery",
      },
      orderBy: userId,
      orderStatus: "Cash on Delivery",
    });

    // sometime you need create a transaction for better maintain the action

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: {
            $inc: {
              quantity: -item.count,
              sold: +item.count,
            },
          },
        },
      };
    });
    const updated = await Product.bulkWrite(update, {});
    res.json({
      message: "success",
    });
  } catch (err) {
    throw new Error(err);
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const { id: userId } = req.user;
  try {
    const order = await Order.findOne({
      orderBy: userId,
    })
      .populate("products.product")
      .populate("orderBy");

    res.json(order);
  } catch (err) {
    throw new Error();
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .populate("orderBy");
    res.json(orders);
  } catch (err) {
    throw new Error();
  }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  validateMongDbbId(userId);
  try {
    const order = await Order.findOne({
      orderBy: userId,
    })
      .populate("products.product")
      .populate("orderBy");

    res.json(order);
  } catch (err) {
    throw new Error();
  }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { orderId } = req.params;
  validateMongDbbId(orderId);
  try {
    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        "paymentIntent.status": status,
        orderStatus: status,
      },
      {
        new: true,
      }
    );

    res.json(updateOrder);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createUser,
  loginUser,
  refreshNewToken,
  getAllUser,
  getAUser,
  deleteAUser,
  updateUser,
  blockUser,
  unBlockUser,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrder,
  getAllOrders,
  getOrderByUserId,
  updateOrderStatus,
};
