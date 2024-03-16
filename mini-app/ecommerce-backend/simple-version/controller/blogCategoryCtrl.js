const BlogCategory = require("../model/blogCategoryModel");

const asyncHandler = require("express-async-handler");

const { validateMongDbbId } = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;

  try {
    const newCategory = await BlogCategory.create({
      title,
    });
    res.json(newCategory);
  } catch (err) {
    throw new Error(err);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const updateCategory = await BlogCategory.findByIdAndUpdate(
      id,
      {
        title,
      },
      {
        new: true,
      }
    );
    res.json(updateCategory);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const deletedCategory = await BlogCategory.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (err) {
    throw new Error(err);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongDbbId(id);

  try {
    const foundCategory = await BlogCategory.findById(id);
    res.json(foundCategory);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const foundCategories = await BlogCategory.find();
    res.json(foundCategories);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
