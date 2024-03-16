const Coupon = require("../model/couponModel");

const asyncHandler = require("express-async-handler");

const { validateMongDbbId } = require("../utils/validateMongodbId");

const createCoupon = asyncHandler(async (req, res) => {
  const { title, expires, discount } = req.body;

  try {
    const newCoupon = await Coupon.create({
      title,
      discount,
      expires,
    });
    res.json(newCoupon);
  } catch (err) {
    throw new Error(err);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  const { title, discount, expires } = req.body;
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(discount && { discount }),
        ...(expires && { expires }),
      },
      {
        new: true,
      }
    );
    res.json(updateCoupon);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletedCoupon);
  } catch (err) {
    throw new Error(err);
  }
});

const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const foundCoupon = await Coupon.findById(id);
    res.json(foundCoupon);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const foundCategories = await Coupon.find();
    res.json(foundCategories);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCoupon,
  getAllCoupon,
};
