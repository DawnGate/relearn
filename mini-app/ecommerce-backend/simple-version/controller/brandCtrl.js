const Brand = require("../model/brandModel");

const asyncHandler = require("express-async-handler");

const { validateMongDbbId } = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async (req, res) => {
  const { title } = req.body;

  try {
    const newBrand = await Brand.create({
      title,
    });
    res.json(newBrand);
  } catch (err) {
    throw new Error(err);
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const updateBrand = await Brand.findByIdAndUpdate(
      id,
      {
        title,
      },
      {
        new: true,
      }
    );
    res.json(updateBrand);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    res.json(deletedBrand);
  } catch (err) {
    throw new Error(err);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const foundBrand = await Brand.findById(id);
    res.json(foundBrand);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const foundCategories = await Brand.find();
    res.json(foundCategories);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
};
